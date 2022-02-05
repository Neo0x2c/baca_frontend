<template>
  <div>
    <walletdia :isShow="isDiaShow">
    </walletdia>
    <div class="maincontext">
      <div class="personbox"
           v-for="item in earningObjList">
        <div class="title_box">
          <p style="font-size: 1.5em">{{ item.title }}</p>
          <p>{{ item.dt }}</p>
        </div>
        <div class="sub_box stake_box">
          <span v-if="item.result == 'Success'"
                style="color: green">{{ item.bal }}BAT</span>
          <span v-else
                style="color: grey">{{ item.bal }} BAT</span>
        </div>
        <div class="sub_box stake_box">
          <span v-if="item.result == 'Success'"
                style="color: green">{{ item.result }}
          </span>
          <span v-else
                style="color: red">{{ item.result }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyHeader from "./myheader";
import walletdia from "../components/walletdia.vue";
import { IcpAuthClient } from "@/utils/login_hooks";
import { getFromVariant } from "@/utils/motoko_tools.js";
export default {
  name: "Myearning",
  components: {
    MyHeader,
    walletdia
  },

  async created () {
    // 页面一打开就去列表。
    if (this.icpClient.client == null) {
      await this.icpClient.createClient();
    }
    if (this.icpClient.isAuthenticated) {
      var result = await this.icpClient.getRewardHistory();
      result = result.map((data) => this.processHistory(data));
      console.log("result:", result);
      this.earningObjList = result;
    } else {
      //this.isDiaShow = true
    }
  },

  methods: {
    processHistory (data) {
      return {
        result: getFromVariant(data.result),
        dt: new Date(Number(data.time) / 1000).toLocaleTimeString("en-US"),
        bal: Number(data.ammount),
        title: getFromVariant(data.rewardType),
      };
    },
  },

  data () {
    return {
      icpClient: new IcpAuthClient(),
      isDiaShow: false,
      earningObjList: [

      ],
    };
  },
};
</script>
<style scoped>
.personbox:nth-child(even) {
  background-color: lightgray;
}

.personbox {
  background-color: #e9e9e9;
  display: flex;
  font-size: 0.2em;
  padding: 3em;
  width: 80%;
  margin: 0 auto;
}

.sub_box {
  flex: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
}

.vote_box {
  width: 10%;
}

.title_box {
  font-size: 1.5em;
  padding-left: 1em;
  text-align: left;
  width: 60%;
  font-weight: 500;
  font-size: 1rem;
  color: rgba(136, 136, 136, 1);
  justify-content: left;
}
.title_box p {
  margin: 0;
  padding: 0;
}

.stake_box {
  width: 30%;
  font-size: 1.5rem;
}
.blue {
  color: #11b4ff;
}

@media only screen and (max-width: 479px) {
  .personbox {
    width: 100%;
  }

  .title_box {
    width: 75%;
  }

  .stake_box {
    width: 15%;
    font-size: 1em;
  }
}
</style>