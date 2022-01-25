<template>
  <div class="login">
    <div class="login-wrap"
         v-show="showLogin">
      <h3>Login222</h3>
      <p v-show="showTishi">{{ tishi }}</p>
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
        <p>Account will be automatically registered</p>
        <div class="btns">
          <el-button type="primary"
                     @click="login()">Login</el-button>
          <!-- <el-button @click="resetForm('loginForm')">重置</el-button> -->
        </div>
      </el-form>
      <span v-on:click="ToRegister">Register for a new account</span>
    </div>

    <hr />
    <div class="ii-login-wrap">
      <h3>Login with Internet Identity</h3>
      <div v-if="authClient.state.isAuthenticated">
        You are LoggedIn! <br />
        Principal: {{ authClient.state.principal }} <br />
        Your BAT balance: {{ authClient.state.balance }}
        <div>
          <el-button @click="iiLogout()">logout </el-button>
        </div>
        <div>
          <el-button @click="collectReward()">collectReward </el-button>
        </div>
      </div>
      <div v-else>
        <div class="btns">
          <el-button type="primary"
                     @click="iiLogin()">Login</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.btns {
  padding-left: 3em;
  margin-bottom: 1em;
}
.el-input__inner {
  height: 4em !important;
  font-weight: 800;
  border-radius: 10px !important;
}

.login-wrap {
  text-align: center;
}
input {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  margin-bottom: 10px;
  outline: none;
  border: 1px solid #888;
  padding: 10px;
  box-sizing: border-box;
}
p {
  color: red;
}
button {
  display: block;
  width: 20%;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  border: none;
  background-color: #41b883;
  color: #fff;
  font-size: 16px;
  margin-bottom: 5px;
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
  background-color: #e9e9e9;
  margin: auto;
  margin-top: 2em;
  text-align: center;
  box-shadow: #d5d4d4 1px 1px 2px 2px;
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

<script>
import { setToken, getToken } from "@/utils/token.js";
import { login, register } from "@/api/login";
import { useAuthClient } from "@/utils/login_hooks";
export default {
  data () {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      registerForm: {
        email: "",
        password: "",
        name: "",
        invitecode: "",
      },
      tishi: "",
      showTishi: false,
      showLogin: true,
      showRegister: false,
      authClient: useAuthClient(),
    };
  },
  mounted () {
    /*if (getCookie('username')) {
      this.$router.push('/home')
    }*/
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    async login () {
      let datas = this.loginForm;
      let res = await login(datas);
      console.log(res);
      if (res.status == 200 && res.data && res.data.data.token) {
        setToken("bacaToken", res.data.data.token)
        this.tishi = "登陆成功";
        this.showTishi = true;
        this.tishi = "登录成功";
        this.showTishi = true;
        //setCookie('username', this.username, 1000 * 60)
        setTimeout(
          function () {
            this.$router.push({ path: "/", query: { id: 1 } });
          }.bind(this),
          1000
        );
      }

    },

    async iiLogin () {
      console.log("iilogin");
      await this.authClient.login(this.authClient.state);
    },

    async iiLogout () {
      await this.authClient.logout(this.authClient.state);
    },

    async collectReward () {
      await this.authClient.collectReward(this.authClient.state);
    },

    ToRegister () {
      this.showRegister = true;
      this.showLogin = false;
    },
    ToLogin () {
      this.showRegister = false;
      this.showLogin = true;
    },
    async register () {
      let datas = this.registerForm;
      let res = await register(datas);
      if (res.status == 200 && res.data && res.data.data.token) {
        setToken("bacaToken", res.data.data.token)
        this.tishi = "注册成功";
        this.showTishi = true;
        this.$router.push({ path: "/", query: { id: 1 } });
      }
    }
  }
};
</script>