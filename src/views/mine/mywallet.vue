<template>
  <div>
    <div v-if="isAuthenticated"> You are LoggedIn! {{principal}}
      <button @click="logout">logout</button>
    </div>
    <button @click="login"> Log In </button>
    <hr className="solid" />
    <div> <button @click="checkAdminBalance">Check Admin Balance </button>
      <h3> Admin Balance: {{adminBalance}} </h3>
    </div>
    <hr className="solid" />
    <button @click="checkMyBalance">Check My Balance</button>
    <h3>My Balance: {{myBalance}} </h3>
    <hr className="solid" />
    <div> <button @click="collectReward">Collect Reward for me</button></div>
    <hr className="solid" />
  </div>
</template>
<script>

//import { Principal } from '@dfinity/principal';
//import { dip20 } from "@/utils/dip20";
//import { useAuthClient } from "@/utils/login_hooks";

export default {
  name: 'mywallet',
  components: {
  },
  data () {
    return {
      adminBalance: 0,
      holderInfo: [],
      myBalance: 0,
      isAuthenticated: true,
      principal: ""
    }
  },
  async created () {
    var wallet = useAuthClient();
    /* 
     authClient,
      isAuthenticated,
      login,
      logout,
      myactor,
      principal*/
    console.log(wallet)
    //checkAdminBalance
  },

  methods: {
    async login () {
      console.log("log in ")
    },
    async logout () {
      console.log("log out ")
    },
    async checkAdminBalance () {
      const admin_public = 'maspa-nshp5-q7zc3-4a3ir-7gqgj-pd37f-5dj4h-jnnag-smohf-jn3mh-pqe'
      var result = await dip20.balanceOf(Principal.fromText(admin_public));
      result = Number(result)
      console.log(result);
      this.adminBalance = result;
    },

    async collectReward () {
      var result = await actor.collectReadReward();
      console.log(result);
    },

    async checkResult () {
      var result = await dip20.getHolders(0n, 100n);
      console.log(result);
      result = result.map((row) => [row[0].toText(), Number(row[1])])
      this.holderInfo = result;
    }
  }
}
</script>
  