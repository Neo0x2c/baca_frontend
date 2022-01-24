import { AuthClient } from "@dfinity/auth-client";
import { Principal } from '@dfinity/principal';
import { clear } from "local-storage";
import { createActor as createRewardActor, canisterId as rewardCanisterId } from "./reward";
import { createActor as createDip20Actor, canisterId as dip20CanisterId } from "./dip20";
import { createActor as createBacaActor, canisterId as bacaCanisterId } from "./baca";

export function useAuthClient() {
  var state = {
    isAuthenticated: false,
    principal: "",
    authClient: null,
    rewardActor: null,
    dip20Actor: null,
    bacaActor: null,
    balance: 0
  };

  const days = BigInt(1);
  const hours = BigInt(24);
  const nanoseconds = BigInt(3600000000000);
  const public_II_url = "https://identity.ic0.app/#authorize";

  const login = (state_) => {
    state_.authClient?.login({
      identityProvider: process.env.VUE_APP_NETWORK === "ic"
        ? public_II_url
        : "http://" + process.env.VUE_APP_IDENTITY_CANISTER_ID + ".localhost:8000/#authorize",
      onSuccess: () => {
        state_.isAuthenticated = true;
        state_.principal = state_.authClient.getIdentity().getPrincipal().toText()
        getBalance(state_);
      },
      maxTimeToLive: days * hours * nanoseconds,
    });
  };

  const initDip20Actor = (state_) => {
    console.log(dip20CanisterId)
    const actor =
      process.env.VUE_APP_NETWORK === "ic"
        ? createDip20Actor(dip20CanisterId, {
          agentOptions: {
            identity: state_.authClient.getIdentity(),
            host: 'https://ic0.app'
          }
        })
        : createDip20Actor(dip20CanisterId, {
          agentOptions: {
            identity: state_.authClient.getIdentity(),
            host: 'http://localhost:8000'
          }
        })
    state_.dip20Actor = actor;
  };

  const initBacaActor = (state_) => {
    const actor =
      process.env.VUE_APP_NETWORK === "ic"
        ? createBacaActor(bacaCanisterId, {
          agentOptions: {
            identity: state_.authClient?.getIdentity(),
            host: 'https://ic0.app'
          }
        })
        : createBacaActor(bacaCanisterId, {
          agentOptions: {
            identity: state_.authClient?.getIdentity(),
            host: 'http://localhost:8000'
          }
        })
    state_.bacaActor = actor;
  }

  const initRewardActor = (state_) => {
    const actor =
      process.env.VUE_APP_NETWORK === "ic"
        ? createRewardActor(rewardCanisterId, {
          agentOptions: {
            identity: state_.authClient.getIdentity(),
            host: 'https://ic0.app'
          }
        })
        : createRewardActor(rewardCanisterId, {
          agentOptions: {
            identity: state_.authClient.getIdentity(),
            host: 'http://localhost:8000'
          }
        })
    state_.rewardActor = actor;
  }

  const getBalance = async (state_) => {
    if (state_.dip20Actor == null) {
      initDip20Actor(state_);
    }
    var result = await state_.dip20Actor.balanceOf(state_.authClient.getIdentity().getPrincipal());
    result = Number(result)
    state_.balance = result;
  }

  const addInviter = async (state_, pText) => {
    if (state_.bacaActor == null) {
      initBacaActor(state_);
    }
    await state_.bacaActor?.addInviter(Principal.fromText(pText));
    alert("Successfully add " + pText + " as your inviter");
  }

  const collectReward = async (state_) => {
    console.log('start collect reward')
    if (state_.rewardActor == null) {
      initRewardActor(state_);
    }
    var ret = await state_.rewardActor.collectReadReward()
    console.log('end collect reward', ret);
    alert("successful collect reward");
    return ret
    //TODO handle return value
  }

  const logout = async (state_) => {
    clear();
    state_.isAuthenticated = false;
    state_.rewardActor = undefined;
    await state_.authClient?.logout();
  };

  AuthClient.create().then(async (client) => {
    const isAuthenticated1 = await client.isAuthenticated();
    state.authClient = client;
    state.isAuthenticated = isAuthenticated1;
    state.principal = client.getIdentity().getPrincipal().toText()
    getBalance(state);
  })

  return {
    state,
    login,
    logout,
    collectReward,
    getBalance,
    addInviter,
  };
}