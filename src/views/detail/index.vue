<template>
  <div v-loading="loading" element-loading-text="doing">
    <div class="fixed_div">
      <component
        :is="component"
        :progress="progress"
        color="#f9a402"
        empty-color="transparent"
        :size="180"
        :thickness="10"
        :empty-thickness="1"
        lineMode="in 45"
        :legend="false"
        animation="default 1000 100"
        fontSize="1rem"
      >
        <img slot="legend-caption" height="80px" src="@/assets/img/bct.gif" />
      </component>
    </div>

    <!-- blog area Start -->
    <div class="blog-details-area pd-top-30 pd-bottom-80">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb-inner pb-4">
              <i class="fa fa-home fa-2"></i>
              <ul class="page-list">
                <li><a href="/" style="font-size: 1.5em">Home</a></li>
                <li style="font-size: 1.5em">Details</li>
              </ul>
            </div>
            <div class="blog-details-wrap">
              <h3>{{ articleObj.title }}</h3>
              <p class="subtitle">{{ articleObj.sub_title }}</p>
              <div></div>
              <div class="meta">
                <a href="#" class="author">
                  <img
                    :src="articleObj.author_head"
                    alt="img"
                    style="width: 2em"
                  />
                  {{ articleObj.author }}
                </a>
                <el-button
                  round
                  type="primary"
                  ref="followuser"
                  style="padding: 9px 10px; margin-right: 2em"
                  @click="follow"
                  >Follow</el-button
                >
              </div>
              <div class="meta float-sm-right">
                <div class="date">
                  <i class="fa fa-clock-o" style="color: #7c7577"></i>
                  {{ articleObj.created_at }}
                </div>
              </div>
              <div class="row">
                <div v-html="articleObj.content" class="col-lg-12"></div>
              </div>
              <div class="blog-share-area">
                <ul class="social-area action">
                  <li>
                    <i class="fa fa-thumbs-up fa-lg" @click="like"></i>
                    {{ articleObj.like }}
                  </li>
                  <li>
                    <i class="fa fa-thumbs-down fa-lg" @click="dislike"></i>
                    {{ articleObj.unlike }}
                  </li>
                  <li @click="vote">
                    <img src="./imgs/vote.png" alt="img" style="width: 1.5em" />
                    <el-button
                      round
                      type="primary"
                      @click="vote"
                      class="votebutton"
                      >vote</el-button
                    >
                  </li>
                </ul>
                <ul class="social-area share">
                  <li>
                    <a class="facebook" href="#"
                      ><i class="fa fa-facebook"></i
                    ></a>
                  </li>
                  <li>
                    <a class="pinterest" href="#"
                      ><i class="fa fa-pinterest"></i
                    ></a>
                  </li>
                  <li>
                    <a class="twitter" href="#"
                      ><i class="fa fa-twitter"></i
                    ></a>
                  </li>
                  <li>
                    <a class="linkedin" href="#"
                      ><i class="fa fa-linkedin"></i
                    ></a>
                  </li>
                </ul>
              </div>
              <el-dialog
                title="VOTE"
                :visible.sync="centerDialogVisible"
                width="30%"
                center
                :destroy-on-close="true"
                class="votedialog"
              >
                <h6 style="text-align: center">How many BAT to stake?</h6>
                <div style="margin-top: 3em">
                  <vue-slider
                    v-model="votenum"
                    :tooltip="'always'"
                    :max="max"
                    :min="min"
                  />
                </div>
                <h6
                  style="text-align: center; margin-top: 1.2em; color: #409eff"
                >
                  Avaliable: {{ balance }}
                </h6>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="centerDialogVisible = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="submitTran"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- blog area End -->
  </div>
</template>
<script>
import { articleDetail, articleLike, articleDisLike } from "@/api/article.js";
import { userBanllance, userTransferToBack } from "@/api/mine.js";
import { setToken, getToken } from "@/utils/token.js";
import { Notification } from "element-ui";
import userTransfer from "@/utils/handleStake.js";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import { Loading } from "element-ui";
import Interval from "@/utils/interval";
import { useAuthClient } from "@/utils/login_hooks";

export default {
  name: "Detail",
  components: {
    VueSlider,
  },
  data() {
    return {
      articleObj: {},
      centerDialogVisible: false,
      balance: 0,
      votenum: 1,
      min: 1,
      max: 100,
      loading: false,
      sec: 0,
      progress: 0,
      activate: false,
      authClient: useAuthClient(),
    };
  },
  watch: {
    activate(newVal, oldVal) {
      //console.log(`activate changed: ${oldVal} to ${newVal}`);
      var that = this;
      if (newVal == true && oldVal == false) {
        Interval.run(that);
      }
    },
    progress(newVal, oldVal) {
      //console.log(`progress changed: ${oldVal} to ${newVal}`);
      if (newVal === 100) {
        alert("get reward");
        this.authClient.collectReward(this.authClient.state);
      }
    },
  },
  async created() {
    //获取当前进度
    let lastprogress = Number(getToken("readingProgress"));
    if (lastprogress !== undefined || lastprogress != null) {
      this.progress = lastprogress;
    }
    // 页面一打开就去加载文章详情。
    let res = await articleDetail({
      art_id: this.$route.params.art_id,
    });
    this.articleObj = res.data.data;
  },
  computed: {
    component() {
      return this.test ? "vue-ellipse-progress-test" : "vue-ellipse-progress";
    },
  },
  methods: {
    handleScroll() {
      this.activate = true;
    },
    runTimer() {
      if (this.sec === 60) {
        this.sec = 0;
        this.progress = (this.sec * 100) / 60;
        return;
      }
      this.sec += 2; //控制速度
      this.progress = (this.sec * 100) / 60;
    },
    //激活页面
    handleActivate() {
      // 监听页面是否是激活状态
      var hiddenProperty =
        "hidden" in document
          ? "hidden"
          : "webkitHidden" in document
          ? "webkitHidden"
          : "mozHidden" in document
          ? "mozHidden"
          : null;
      if (!document[hiddenProperty]) {
        setToken("readingProgress", this.progress);
        console.log("页面非激活");
      } else {
        var lastprogress = Number(getToken("readingProgress"));
        this.progress = lastprogress;
        console.log("页面激活");
      }
    },
    follow() {},
    async like() {
      if (this.$checkLogin()) {
        let res = await articleLike({
          aid: this.articleObj.id,
        });
        if (res.data.code == 0) {
          //刷新文章喜欢数
          let res = await articleDetail({
            art_id: this.$route.params.art_id,
          });
          this.articleObj = res.data.data;
        }
      } else {
        this.$router.push("/login");
      }
    },
    async dislike() {
      if (this.$checkLogin()) {
        let res = await articleDisLike({
          aid: this.articleObj.id,
        });
        if (res.data.code == 0) {
          //刷新文章喜欢数
          let res = await articleDetail({
            art_id: this.$route.params.art_id,
          });
          this.articleObj = res.data.data;
        }
      } else {
        this.$router.push("/login");
      }
    },
    async vote() {
      // 获取余额
      if (this.$checkLogin()) {
        let ba = getToken("bacaWallet");
        let bal_res = await userBanllance({ wallet_id: ba });
        if (bal_res.data && bal_res.data.code == 0) {
          this.balance = bal_res.data.data["ballance"];
          this.max = parseInt(this.balance);
        }
        this.centerDialogVisible = true;
      } else {
        this.$router.push("/login");
      }
    },
    async submitTran() {
      var mywallet = getToken("bacaWallet");
      var ammount = this.votenum;
      console.log("当前值", this.votenum);
      if (this.$checkLogin()) {
        this.centerDialogVisible = false;
        let loadingInstance = Loading.service({ fullscreen: true });
        let res = await userTransfer({
          wallet_id: mywallet,
          stake_ammount: ammount,
        });
        console.log(res);
        loadingInstance.close();
        const h = this.$createElement;
        var mes = "Transfer submit seccuss";
        var options = {
          title: "Aha ~",
          message: h("i", { style: "color: teal;font-weight:700" }, mes),
          type: "success",
        };
        Notification(options);
        var params = { aid: this.articleObj.id, stake: ammount };
        let backres = await userTransferToBack(params);
        console.log(backres);
      }
    },
  },
  mounted() {
    Interval.addTask(this.runTimer);
    var that = this;
    Interval.run(that);
    window.addEventListener("scroll", this.handleScroll, true);
    window.addEventListener("visibilitychange", this.handleActivate, true);
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload", () => {
      setToken("readingProgress", this.progress);
    });
  },
  destroyed() {
    setToken("readingProgress", this.progress);
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("visibilitychange", this.handleScroll);
  },
};
</script>
<style scoped>
.blog-share-area {
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
  border: none !important;
}
.social-area {
  display: inline-block;
}
.action {
  float: left;
}

.action li {
  margin-right: 2em !important;
}

.el-dialog__header {
  background-color: #409eff;
  font-weight: bold;
}

.votebutton {
  margin-left: 0.5em !important;
  vertical-align: middle !important;
  padding: 5px 7px !important;
}

.votedialog .el-dialog {
  border: 1px solid #94c1e7;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border-radius: 6px;
  box-shadow: darkgrey 1px 1px 2px 2px;
}

.fixed_div {
  position: fixed;
  z-index: 10;
  right: 0;
  bottom: 0;
}

.meta .date i {
  color: #7c7577;
}

@media only screen and (max-width: 700px) {
  .share {
    margin: 20px 0 !important;
    padding: 0;
  }
  .share li:first {
    padding-left: 0;
  }
  .share li {
    margin-right: 10px;
  }
  .blog-details-area {
    padding-bottom: 0;
  }
}
</style>