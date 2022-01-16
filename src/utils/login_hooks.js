/* eslint-disable no-undef */
//import { ActorSubclass, Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { clear } from "local-storage";
import { createActor as dip20CreateActor, canisterId as dip20CanisterId } from "./dip20";

export function useAuthClient() {

  var authClient = null;
  var state = {
    isAuthenticated: false,
    principal: "",
  };
  var myactor = null;

  const days = BigInt(1);
  const hours = BigInt(24);
  const nanoseconds = BigInt(3600000000000);
  const local_II_url = "http://qjdve-lqaaa-aaaaa-aaaeq-cai.localhost:8000/#authorize";

  const login = (state) => {
    authClient?.login({
      // identityProvider: process.env.DFX_NETWORK === "ic"
      //   ? "https://identity.ic0.app/#authorize"
      //   : process.env.LOCAL_II_CANISTER,
      // identityProvider: "https://identity.ic0.app/#authorize",
      identityProvider: local_II_url,
      onSuccess: () => {
        initActor();
        state.isAuthenticated = true;
      },
      maxTimeToLive: days * hours * nanoseconds,
    });
  };

  const initActor = () => {
    const actor = dip20CreateActor(dip20CanisterId, {
      agentOptions: {
        identity: authClient?.getIdentity(),
      },
    });
    myactor = actor;
    //setActor(actor);
  };

  const logout = async () => {
    clear();
    state.isAuthenticated = false;
    myactor = undefined
    await authClient?.logout();
  };

  AuthClient.create().then(async (client) => {
    const isAuthenticated1 = await client.isAuthenticated();
    authClient = client;
    state.isAuthenticated = isAuthenticated1;
    state.principal = client.getIdentity().getPrincipal().toText()
  })

  if (state.isAuthenticated) initActor();

  return {
    state,
    login,
    logout,
  };
}