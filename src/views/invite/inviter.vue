<template>
  <div>
    <walletdia :isShow="isDiaShow">
    </walletdia>

    <!--share--> 
      <div class="section1">
        <h1 class="font_blue" style="text-align: center;">Refer a friend and get $30 in CPRX</h1>
        <h5>
          For every friend who uses your link to download Baca, signs up for a
          new account, and funds it, you'll bothe get $30 in CPRX
        </h5>
        <div v-show="isShareShow">
        <h5><span>Code: </span><span class="font_blue">{{code}}</span></h5>
        <h5> <span>Link: </span><span>http://www.baca.com/ref/{{code}}</span></h5>
        <el-button type="primary" class="share">Share your link</el-button> 
        <div class="flex">
          <div>
            <h1 class="h1_num">0</h1>
            <h5>Signed up</h5>
          </div>
          <div>
            <h1 class="h1_num">0</h1>
            <h5>Completed refereals</h5>
          </div>
        </div>
        </div>
      </div>
   

    <!--info-->
   <div style="background-color: #e9e9e9;margin-top: 2em;">
    <div class="section2">
      <h1 class="font_blue" style="background-color: #e9e9e9;text-align: center;">How do i earn rewards?</h1>
      <h3 class="font_blue">2.5% cash back on every trade</h3>
      <h5> Rewards are based on the value of your trade and paid out in cprx twice a week.</h5>
      <h3 class="font_blue">2.5% cash back on every trade</h3>
      <h5> Rewards are based on the value of your trade and paid out in cprx twice a week.</h5>
      <h3 class="font_blue">2.5% cash back on every trade</h3>
      <h5> Rewards are based on the value of your trade and paid out in cprx twice a week.</h5>
      <h3 class="font_blue">2.5% cash back on every trade</h3>
      <h5> Rewards are based on the value of your trade and paid out in cprx twice a week.</h5>
    </div>
     </div>
  </div>
</template> 
<script>
import walletdia from "../components/walletdia.vue";
export default {
  components: { walletdia},
  data() {
    return {
      code:"RCVL7M45J",
      isDiaShow:false ,
      isShareShow:true
    };
  },
  created() {
    //获取邀请码
    //if login
    if (!this.$checkLogin()) {
      this.$router.push("/login"); 
    }
    if(!this.$checkWallet()){
      this.isShareShow = false
      this.isDiaShow = true 
    }
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.section1 ,.section2 {
  width: 60%;
  margin: 0 auto;
  padding: 2em 0;
}

.font_blue {
  color: #0a57cd;
}
.share {
  width: 100%;
  background-image: linear-gradient(to right, #6791f7, #3967d7);
  height: 2.5em;
  font-size: 2em;
  border-radius: 17px;
}
h5 {
  padding-bottom: 1em;
}
.h1_num {
  text-align: center;
  color: #0a57cd;
  font-size: 7em;
}
.flex {
  display: flex;
  justify-content: space-between;
}
</style>