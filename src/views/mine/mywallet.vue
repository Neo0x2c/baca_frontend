<template>
  <div>
     <div class="ii-login-wrap">
      <h3>Login with Internet Identity</h3>
      <div v-if="icpClient.isAuthenticated">
        You are LoggedIn! <br />
        Principal: {{ icpClient.principal }} <br />
        Your BAT balance: {{ icpClient.balance }}
        <div>
          <el-button @click="iiLogout()">logout </el-button>
        </div>
        <div>
          <el-button @click="collectReward()">collectReward </el-button>
        </div>
        <div>
          <input class="inviter"
                 v-model="inviter" />
          <el-button @click="addInviter()"> Add Inviter </el-button>
        </div>
      </div>
      <div v-else>
        <div class="btns">
          <el-button type="primary"
                     @click="iiLogin()">Login</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { IcpAuthClient } from "@/utils/login_hooks";

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
      principal: "",
      icpClient: new IcpAuthClient(),
    }
  },
  async created () {
    console.log("iilogin");
      await this.icpClient.login(); 
  },

  methods: {
  
  }
}
</script>
  