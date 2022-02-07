
<template>
  <el-dialog :modal="true"
             :modal-append-to-body="true"
             :visible.sync="isShow"
             :close-on-click-modal="false"
             :show-close="true"
             :close-on-press-escape="true"
             center>
    <h4>
      please connect your Internet Computer wallet first to receive your reward.
    </h4>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="isShow = false">取 消</el-button>
      <el-button type="primary"
                 @click="connectWallet()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { setToken } from "@/utils/token.js";
import { bindWallet } from "@/api/mine.js";
import { IcpAuthClient } from "@/utils/login_hooks";
import { Notification } from "element-ui";
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    switchStyle: {
      type: Boolean,
      default: true,
    },
    tittle: {
      type: String,
      default: "标题",
    },
    width: {
      type: String,
      default: "50%",
    },
    height: {
      type: String,
      default: "1000px",
    },
  },
  data () {
    return {
      icpClient: new IcpAuthClient(),
    };
  },
  async created () {
    if (this.icpClient.client == null) {
      await this.icpClient.createClient();
    }
  },
  methods: {
    async connectWallet () {
      var that = this;
      await this.icpClient.login();
      this.isShow = false;
      if ((this.icpClient.isAuthenticated) && (this.icpClient.principal !== null)) {
        setToken("bacaWallet", this.icpClient.principal);
        //后端绑定钱包
        let datas = {
          "principal": this.icpClient.principal
        }
        bindWallet(datas);
      } else {
        const h = that.$createElement;
        var mes = "bind wallet fail";
        var options = {
          title: "Aha ~",
          message: h("i", { style: "color: teal;font-weight:700" }, mes),
          type: "error",
        };
        Notification(options);
      }
    },
    handleClose (done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => { });
    },
  },
  components: {},
};
</script> 

<style scoped>
@media only screen and (max-width: 600px) {
  /deep/ .el-dialog {
    width: 90%;
  }
}
</style>