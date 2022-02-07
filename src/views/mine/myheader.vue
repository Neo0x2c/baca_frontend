<template>
  <div class="myheadercontain">
    <walletdia :isShow="isDiaShow">
    </walletdia>
    <img src="@/assets/img/mine/headimg.png"
         border="2"
         class="myheadimg" />
    <div class="myname">{{userObj.name }}
      <el-tooltip class="item"
                  effect="dark"
                  content="please connect your Internet Computer wallet first to receive your reward."
                  placement="right-start">
        <img :src="require('@/assets/img/mine/card.png')"
             style=" width: 1em; margin-left: 0.1em;"
             @click="bindwallet()" />
      </el-tooltip>

    </div>

    <div class="bitinfo">
      <div class="parent_nav"
           style="color: #ffbb00; font-size: 1.5em; font-weight: 600">
        <span class="sub_nav_left">inviteCode</span><span class="sub_nav_right">{{ userObj.inviteCode}}</span>
      </div>
      <!--
      <div class="parent_nav">
        <span class="sub_nav_left">Staked</span><span class="sub_nav_right">{{ userObj.stake }}</span>
      </div>
      <div class="parent_nav">
        <span class="sub_nav_left">Available</span><span class="sub_nav_right">{{ userObj.money.toFixed(4) }}</span>
      </div> 
      -->
    </div>

  </div>
</template>
<script>
import { userInfo } from "@/api/mine.js";
import { setToken } from "@/utils/token.js";
import walletdia from "../components/walletdia.vue";
export default {
  name: "MyHeader",
  data () {
    return {
      userObj: {},
      cur: 0, //默认选中第一个tab,  
      isDiaShow: false
    };
  },
  components: { walletdia },
  async created () {
    // let ba = getToken("bacaToken")
    // var mywallet = getToken("bacaWallet")
    let res = await userInfo();
    if (res.status == 200 && res.data) {
      this.userObj = res.data.data
      setToken("inviteCode", this.userObj.inviteCode)
    }
    console.log(res)
  },
  methods: {
    bindwallet () {
      this.isDiaShow = true
      /*if (!this.$checkWallet()) {
        this.isDiaShow = true
      } else {
        console.log("bind wallet seccess")
      }*/
    },
  },

};
</script>
<style scoped>
.bitinfo {
  width: 50%;
  margin: 0 auto;
}

.parent_nav {
  display: flex;
}

.sub_nav_left {
  flex: auto;
  display: flex;
  align-items: center;
  justify-content: left;
  font-weight: 600;
}
.sub_nav_right {
  flex: auto;
  display: flex;
  align-items: center;
  justify-content: right;
  font-weight: 600;
}
.myheadimg {
  width: 7em;
  height: 7em;
  border-radius: 50%;
  background-color: #bebebe;
  padding: 0.5em;
  border: none;
}
.myname {
  font-size: 2em;
  margin: 0.5em;
  font-weight: 800;
}

@media only screen and (max-width: 479px) {
  .bitinfo {
    width: 80%;
  }
}
</style>