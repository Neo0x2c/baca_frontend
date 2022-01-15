/* eslint-disable no-undef */
//import { ActorSubclass, Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { clear } from "local-storage"; 
import { createActor as dip20CreateActor, canisterId as dip20CanisterId } from "@/utils/dip20"; 

export function useAuthClient () {
  var authClient = null;
  var myactor = null;
  var isAuthenticated = false;
  var principal = false;

  //const [authClient, setAuthClient] = useState(null);
  //const [actor, setActor] = useState(null);
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  //const [principal, setPrincipal] = useState(false);

  const days = BigInt(1);
  const hours = BigInt(24);
  const nanoseconds = BigInt(3600000000000);

  const login = () => {
    authClient?.login({
      identityProvider: process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app/#authorize"
        : process.env.LOCAL_II_CANISTER,
      // identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        initActor();
        isAuthenticated = true;
        //setIsAuthenticated(true);
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
    isAuthenticated = false;
    //setIsAuthenticated(false);
    myactor = undefined
    //setActor(undefined);
    await authClient?.logout();
    console.alert("You have logged out!");
  };

  AuthClient.create().then(async (client1) => {
    const isAuthenticated1 = await client1.isAuthenticated();
    authClient = client1;
    isAuthenticated = isAuthenticated1;
    principal = client1.getIdentity().getPrincipal().toText()

  })

  if (isAuthenticated) initActor();

  return {
    authClient,
    isAuthenticated,
    login,
    logout,
    myactor,
    principal,
  };
}



