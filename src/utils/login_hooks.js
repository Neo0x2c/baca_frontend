import { AuthClient } from "@dfinity/auth-client";
import { clear } from "local-storage";
import { createActor as createRewardActor, canisterId as rewardCanisterId } from "./reward";
import { createActor as createDip20Actor, canisterId as dip20CanisterId } from "./dip20";

export function useAuthClient() {

  var state = {
    isAuthenticated: false,
    principal: "",
    authClient: null,
    rewardActor: null,
    dip20Actor: null,
    balance: 0
  };

  const days = BigInt(1);
  const hours = BigInt(24);
  const nanoseconds = BigInt(3600000000000);
  // const local_II_url = "http://qjdve-lqaaa-aaaaa-aaaeq-cai.localhost:8000/#authorize";
  const public_II_url = "https://identity.ic0.app/#authorize";

  const login = (state_) => {
    state_.authClient?.login({
      identityProvider: process.env.VUE_APP_NETWORK === "ic"
        ? public_II_url
        : "http://" + process.env.VUE_APP_IDENTITY_CANISTER_ID + ".localhost:8000/#authorize",
      // identityProvider: "https://identity.ic0.app/#authorize",
      // identityProvider: local_II_url,
      onSuccess: () => {
        state_.isAuthenticated = true;
        state_.principal = state_.authClient.getIdentity().getPrincipal().toText()
        getBalance(state_);
      },
      maxTimeToLive: days * hours * nanoseconds,
    });
  };

  const initDip20Actor = (state_) => {
    const actor =
      process.env.VUE_APP_NETWORK === "ic"
        ? createDip20Actor(dip20CanisterId, {
          agentOptions: {
            identity: state_.authClient?.getIdentity(),
            host: 'https://ic0.app'
          }
        })
        : createDip20Actor(dip20CanisterId, {
          agentOptions: {
            identity: state_.authClient?.getIdentity(),
            host: 'http://localhost:8000'
          }
        })
    state_.dip20Actor = actor;
  };

  const initRewardActor = (state_) => {
    const actor =
      process.env.VUE_APP_NETWORK === "ic"
        ? createRewardActor(rewardCanisterId, {
          agentOptions: {
            identity: state_.authClient?.getIdentity(),
            host: 'https://ic0.app'
          }
        })
        : createRewardActor(rewardCanisterId, {
          agentOptions: {
            identity: state_.authClient?.getIdentity(),
            host: 'http://localhost:8000'
          }
        })
    state_.rewardActor = actor;
  }

  const getBalance = async (state_) => {
    console.log("get balance");
    console.log(state_.dip20Actor);
    if (state_.dip20Actor == null) {
      initDip20Actor(state_);
    }
    console.log(state_.dip20Actor);
    var result = await state_.dip20Actor?.balanceOf(state_.authClient.getIdentity().getPrincipal());
    result = Number(result)
    state_.balance = result;
  }

  const collectReward = async (state_) => {
    console.log('start collect reward')
    if (state_.rewardActor == null) {
      initRewardActor(state_);
    }
    var ret = await state_.rewardActor.collectReadReward()
    console.log(ret);
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
  };
}