<template>
  <div class="loginbody pd-top-50 pd-bottom-50">
    <div class="login">
      <div class="login-wrap">
        <img src="@/assets/img/logo_3.png"
             class="logoimg" />
        <el-form :model="loginForm"
                 status-icon
                 ref="loginForm">
          <el-form-item prop="email"
                        :rules="[
            { required: true, message: 'Email is required', trigger: 'blur' },
            {
              type: 'email',
              message: 'Email is invalid',
              trigger: ['blur', 'change'],
            },
          ]">
            <el-input v-model="loginForm.email"
                      class="forminput"
                      placeholder="Email Address"
                      required=true></el-input>
          </el-form-item>
          <el-form-item prop="pass"
                        :rules="[
            {
              required: true,
              message: 'Password is required',
              trigger: 'blur',
            },
          ]">
            <el-input type="password"
                      v-model="loginForm.password"
                      placeholder="Password"
                      autocomplete="off"></el-input>
          </el-form-item>
          <div class="btns">
            <el-button type="primary"
                       @click="login()">Login</el-button>
            <!-- <el-button @click="resetForm('loginForm')">重置</el-button> -->
          </div>
        </el-form>
        <div class="toRegister">
          <span>Don't have an account？</span>
          <router-link to='/register'><span style="color:rgba(58,103,215,1);">Sign up</span></router-link>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
import { setToken } from "@/utils/token.js";
import { login } from "@/api/login";
export default {
  data () {
    return {
      loginForm: {
        email: "",
        password: "",
      }
    };
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    async login () {
      console.log(this.$route.path)
      let datas = this.loginForm;
      let res = await login(datas);
      if (res.status == 200 && res.data && res.data.data.token) {
        setToken("bacaToken", res.data.data.token)
        if (this.$route.path == "/login") {
          this.$router.push("/");
        } else {
          this.$router.go(-2);
        }
      }
    }
  }
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

span {
  cursor: pointer;
}
span:hover {
  color: #41b883;
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
