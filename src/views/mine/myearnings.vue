<template>
  <div>
    <div class="maincontext">
      <div class="personbox"
           v-for="item in earningObjList">
        <div class="title_box">
          <p style="font-size: 1.5em;">{{item.title}}</p>
          <p>{{item.dt}}</p>
        </div>
        <div class="sub_box stake_box">
          <span v-if="item.bal >=0"
                style="color:green;">+{{item.bal }}BAT</span>
          <span v-if="item.bal < 0"
                style="color:red;">{{item.bal }}BAT</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyHeader from './myheader'
import { stakeList } from "@/api/mine.js";

export default {
  name: 'Myearning',
  components: {
    MyHeader
  },
  async created () {
    // 页面一打开就去列表。
    if (this.$checkLogin()) {
      console.log("login");
      //let stakelistTmp = await stakeList();
      //this.stakeObjList = stakelistTmp.data.data;
    } else { this.$router.push("/login"); }
  },
  data () {
    return {
      earningObjList: [{ "title": "read incentive", "dt": "2020-09-09 19:22:22", "bal": 20 }, { "title": "share incentive", "dt": "2020-09-09 19:22:22", "bal": 30 }, {
        "title": "ecological development", "dt": "2020-09-09 19:22:22", "bal": 30
      },
      { "title": "invite incentive", "dt": "2020-09-09 19:22:22", "bal": +200 }, { "title": "vote stake", "dt": "2020-09-09 19:22:22", "bal": -1000 }]
    }
  }
}
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