/* eslint-disable no-undef */
//import { ActorSubclass, Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { clear } from "local-storage";
import { createActor as createRewardActor, canisterId as rewardCanisterId } from "./reward";
import { dip20, canisterId as tokenCanisterId } from "./dip20";

export function useAuthClient() {

  var state = {
    isAuthenticated: false,
    principal: "",
    authClient: null,
    rewardActor: null,
    balance: 0
  };

  const days = BigInt(1);
  const hours = BigInt(24);
  const nanoseconds = BigInt(3600000000000);
  const local_II_url = "http://qjdve-lqaaa-aaaaa-aaaeq-cai.localhost:8000/#authorize";

  const login = (state_) => {
    state_.authClient?.login({
      // identityProvider: process.env.DFX_NETWORK === "ic"
      //   ? "https://identity.ic0.app/#authorize"
      //   : process.env.LOCAL_II_CANISTER,
      // identityProvider: "https://identity.ic0.app/#authorize",
      identityProvider: local_II_url,
      onSuccess: () => {
        state_.isAuthenticated = true;
        state_.principal = state_.authClient.getIdentity().getPrincipal().toText()
        getBalance(state_);
      },
      maxTimeToLive: days * hours * nanoseconds,
    });
  };

  const initRewardActor = (state_) => {
    const actor = createRewardActor(rewardCanisterId, {
      agentOptions: {
        identity: state_.authClient?.getIdentity(),
        host: 'http://localhost:8000'
      },
    });
    state_.rewardActor = actor;
  }

  const getBalance = async (state_) => {
    var result = await dip20.balanceOf(state_.authClient.getIdentity().getPrincipal());
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