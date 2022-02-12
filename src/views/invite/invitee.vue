<template>
  <div>
    <!--reward-->
    <div style="background-color: #719afe">
      <div class="section2">
        <div class="logoimg"><img src="@/assets/img/invite/reward.png" /></div>
        <h1 class="font_blue"
            style="text-align: center;color:#ffffff">GET $30 IN CRUPTO WHEN YOU
          DOWNLOAD & FUND!</h1>
      </div>
    </div>
    <!--share-->
    <div class="section1">
      <h1 class="font_blue"
          style="text-align: center;">Congratulations!</h1>
      <h1 class="font_blue"
          style="text-align: center;"> A friend has referred you to Abra!</h1>
      <div class="down">
        <el-button type="primary"
                   class="share">TAP HERE TO SIGN UP</el-button>
        <h1 style="color:#ff7904;">OR Download</h1>
        <div class="flex">
          <img src="@/assets/img/invite/apple.png" />
          <img src="@/assets/img/invite/android.png" />
        </div>
      </div>
    </div>

    <!--info-->
    <div style="background-color: #e9e9e9;margin-top: 2em;">
      <div class="section2">
        <h1 class="font_blue"
            style="background-color: #e9e9e9;">To complete the referral process, download the BACA APP on your monile device by tapping the link above. Then:</h1>
        <h3> 1. Sign up for a new account within 30 days of using the referral link to download the app.</h3>
        <h3> 2. Verify your identity to comply with anti-money laundering.</h3>
        <h3> 3. Keep at least $15 in your account for at least 30 days.</h3>
        <h3> 4. You and your friend both get $30 in CPRX!</h3>
      </div>
    </div>

    <!--footer-->
    <div style="background-color: #719afe">
      <div class="section2">
        <h3 style="color:#ffffff"> This offer is for new customers only. If you already hava an account, please take advantage of our increased rewards though January 14th, 2021.</h3>
      </div>
    </div>
  </div>
</template> 
<script>
export default {
  data () {
    return {
      code: "RCVL7M45J"
    };
  },
  methods: {},
};
</script>

<style scoped>
.section1,
.section2 {
  width: 60%;
  margin: 0 auto;
  padding: 2em 0;
}

.font_blue {
  color: #0a57cd;
}
.down {
  width: 80%;
  text-align: center;
  margin: 0 auto;
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
.section1 h1 {
  line-height: 1.8;
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
.flex img {
  width: 40%;
}
.logoimg {
  margin: 3em auto;
  width: 12em;
}

.section2 h3 {
  line-height: 1.8;
}
</style>