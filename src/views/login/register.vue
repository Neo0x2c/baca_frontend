<template>
  <div class="loginbody pd-top-50 pd-bottom-50">
    <!--input email and pass-->
    <div class="login"
         v-show="registertip">
      <div class="login-wrap">
        <img src="@/assets/img/logo_3.png"
             class="logoimg" />
        <el-form :model="ruleForm"
                 status-icon
                 :rules="rules"
                 ref="ruleForm">
          <el-form-item prop="email">
            <el-input v-model.number="ruleForm.email"
                      class="forminput"
                      placeholder="Email Address"></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input type="password"
                      v-model="ruleForm.password"
                      autocomplete="off"
                      placeholder="Password"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input type="password"
                      v-model="ruleForm.checkPass"
                      autocomplete="off"
                      placeholder="Confirm Password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary"
                       @click="signup()">Sign up</el-button>
          </el-form-item>
        </el-form>

        <div class="toRegister">
          <span>Already a member？</span>
          <router-link to="/login"><span style="color: rgba(58, 103, 215, 1)">Login in</span></router-link>
        </div>
      </div>
    </div>

    <!-- input invite code-->
    <div class="login"
         v-show="codetip">
      <div class="login-wrap">
        <h1 style="color: #3a67d7">Have a code?</h1>
        <el-input v-model="invitecode"
                  class="forminput"
                  placeholder="CODE"></el-input>
        <p class="codetip">
          If you have a promo code or referral code from a friend, enter it
          here.
        </p>

        <div class="btns">
          <el-button type="primary"
                     @click="next()">Continue</el-button>
        </div>
        <el-button class="skipbtn"
                   @click="skip()">Skip</el-button>
      </div>
    </div>

    <!-- success-->
    <div class="login"
         v-show="successtip">
      <div class="login-wrap">
        <img src="@/assets/img/login/done.png" />
        <h1 style="color: #ff9a27">Success</h1>
        <div class="btns">
          <router-link to="/">
            <el-button type="primary">HOME</el-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import { setToken } from "@/utils/token.js";
import { createHash } from "@/utils/common_tools.js";
import { register, bindParent } from "@/api/login";
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        checkPass: "",
        email: "",
      },
      invitecode: "",
      codetip: false,
      successtip: false,
      registertip: true,
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        email: [
          {
            required: true,
            message: "please input email address",
            trigger: "blur",
          },
          {
            type: "email",
            message: "please input correct email address",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  mounted () { },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    async next () {
      //绑定邀请码
      if (this.invitecode == "") {
        return;
      }
      let res = await bindParent(datas);
      console.log(res);
      if (res.status == 200 && res.data) {
        this.registertip = false;
        this.codetip = false;
        this.successtip = true;
      }
    },
    skip () {
      this.registertip = false;
      this.codetip = false;
      this.successtip = true;
    },
    async signup () {
      let datas = this.ruleForm;
      datas["name"] = "baca_" + createHash(8)
      console.log("*" * 10, datas)
      let res = await register(datas);
      if (res.status == 200 && res.data && res.data.code == 200 && res.data.token) {
        setToken("bacaToken", res.data.token);
        this.codetip = true;
        this.registertip = false;
        this.successtip = false;
      }
    },
  },
};
</script>

<style  scoped>
.loginbody {
  background-color: #3a67d7;
}
.logoimg {
  width: 40%;
  padding-bottom: 1em;
}
.btns {
  margin-bottom: 1em;
  margin-top: 4em;
}

.toRegister {
  font-style: normal;
  font-weight: bold;
  font-size: 1em;
  color: rgba(158, 158, 158, 1);
}

.login-wrap {
  text-align: center;
}
.forminput {
  width: 100%;
  margin: 0 auto;
  outline: none;
  font-weight: bold;
}

/deep/.el-input__inner {
  height: 4em;
  font-weight: 800;
  border-radius: 10px;
  height: 4em;
}

.login {
  width: 50%;
  padding: 3em;
  margin: auto;
  margin-top: 2em;
  text-align: center;
  box-shadow: #d5d4d4 1px 1px 2px 2px;
  background-color: #ffffff;
  border-radius: 10px;
  font-weight: bold;
}
.el-button {
  width: 100%;
  border-radius: 25px;
  height: 4em;
  color: #ffffff;
  font-weight: 800;
  background-color: #3a67d7;
  border-color: #678be9;
}
.skipbtn {
  background-color: #ffffff;
  color: #3a67d7;
}

.codetip {
  margin: 1em auto;
}
@media only screen and (max-width: 700px) {
  .login {
    width: 100%;
    padding: 1em;
  }
  button {
    display: block;
    width: 30%;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    border: none;
    background-color: #41b883;
    color: #fff;
    font-size: 16px;
    margin-bottom: 5px;
  }
}
</style>