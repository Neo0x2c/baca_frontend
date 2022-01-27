import { AuthClient } from "@dfinity/auth-client";
import { Principal } from '@dfinity/principal';
import { clear } from "local-storage";
import { createActor as createRewardActor, canisterId as rewardCanisterId } from "./reward";
import { createActor as createDip20Actor, canisterId as dip20CanisterId } from "./dip20";
import { createActor as createBacaActor, canisterId as bacaCanisterId } from "./baca";

export class IcpAuthClient {

  async createClient() {
    this.client = await AuthClient.create();
    this.isAuthenticated = await this.client.isAuthenticated();
    this.identity = this.client.getIdentity();
    this.principal = this.identity.getPrincipal().toText();
    console.log('client created');
  }

  initActor(createActor, canisterId) {
    if (process.env.VUE_APP_NETWORK === "ic") {
      return createActor(canisterId, {
        agentOptions: {
          identity: this.identity,
          host: 'https://ic0.app'
        }
      })
    } else {
      return createActor(canisterId, {
        agentOptions: {
          identity: this.identity,
          host: 'http://localhost:8000'
        }
      })
    }
  }

  async getRewardHistory() {
    if (this.rewardActor == null) {
      this.rewardActor = this.initActor(createRewardActor, rewardCanisterId);
    }
    return this.rewardActor.getLatestRewardHistory(this.client.getIdentity().getPrincipal(), 20);
  }

  async login() {
    const days = BigInt(1);
    const hours = BigInt(24);
    const nanoseconds = BigInt(3600000000000);
    const public_II_url = "https://identity.ic0.app/#authorize";
    this.client?.login({
      identityProvider: process.env.VUE_APP_NETWORK === "ic"
        ? public_II_url
        : "http://" + process.env.VUE_APP_IDENTITY_CANISTER_ID + ".localhost:8000/#authorize",
      onSuccess: () => {
        this.isAuthenticated = true;
        this.identity = this.client.getIdentity();
        this.principal = this.client.getIdentity().getPrincipal().toText();
        this.getBalance();
      },
      maxTimeToLive: days * hours * nanoseconds,
    });
  }

  async logout() {
    clear();
    this.isAuthenticated = false;
    this.dip20Actor = null;
    this.bacaActor = null;
    this.rewardActor = null;
    this.balance = null;
    this.identity = null;
    this.principal = null;
    await this.client?.logout();
  };

  async getBalance() {
    console.log('start getting balance');
    if (this.dip20Actor == null) {
      this.dip20Actor = this.initActor(createDip20Actor, dip20CanisterId);
    }
    var result = await this.dip20Actor.balanceOf(this.client.getIdentity().getPrincipal());
    this.balance = Number(result);
  };

  async addInviter(pText) {
    if (this.bacaActor == null) {
      this.bacaActor = this.initActor(createBacaActor, bacaCanisterId);
    }
    await this.bacaActor.addInviter(Principal.fromText(pText));
    alert("Successfully add " + pText + " as your inviter");
  };

  async collectReward() {
    if (this.rewardActor == null) {
      this.rewardActor = this.initActor(createRewardActor, rewardCanisterId);
    }
    var ret = await this.rewardActor.collectReadReward(); 
    //TODO handle return error cases
    return ret;
  };

  constructor() {
    this.isAuthenticated = false;
    this.client = null;
    this.dip20Actor = null;
    this.bacaActor = null;
    this.rewardActor = null;
    this.balance = null;
    this.principal = null;
    this.identity = null;
  }
}