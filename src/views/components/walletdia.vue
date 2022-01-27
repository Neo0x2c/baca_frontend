
<template>
  <el-dialog
    :modal="true"
    :modal-append-to-body="true"
    :visible.sync="isShow"
    width="50%"
    :close-on-click-modal="false"
    :show-close="true"
    :close-on-press-escape="true"
    center
  >
    <h4>
      please connect your Internet Computer wallet first to receive your reward.
    </h4>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isShow = false">取 消</el-button>
      <el-button type="primary" @click="connectWallet()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { setToken } from "@/utils/token.js";
import { IcpAuthClient } from "@/utils/login_hooks";
export default {
  props: {
    isShow: {
      type: Boolean,
      default: true,
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
      default: "35%",
    },
    height: {
      type: String,
      default: "1000px",
    },
  },
  data() {
    return {
      icpClient: new IcpAuthClient(),
    };
  },
  async created() {
    if (this.icpClient.client == null) {
      await this.icpClient.createClient();
    }
  },
  methods: {
    async connectWallet() {
      await this.icpClient.login();
      this.isShow = false;
      if (!this.icpClient.principal) {
        setToken("bacaWallet", this.icpClient.principal);
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  components: {},
};
</script> 