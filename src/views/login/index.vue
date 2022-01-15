<template>
  <div class="login">

    <div class="login-wrap"
         v-show="showLogin">
      <h3>登录</h3>
      <p v-show="showTishi">{{tishi}}</p>
      <el-form :model="loginForm"
               status-icon
               ref="loginForm"
               label-width="30%"
               class="demo-ruleForm">
        <el-form-item prop="email"
                      label="邮箱"
                      :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]">
          <el-input v-model="loginForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="pass"
                      :rules="[ { required: true, message: '请输入密码', trigger: 'blur' } , ]">
          <el-input type="password"
                    v-model="loginForm.password"
                    autocomplete="off"></el-input>
        </el-form-item>
        <div class='btns'>

          <el-button type="primary"
                     @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </div>

      </el-form>
      <span v-on:click="ToRegister">没有账号？马上注册</span>
    </div>

    <div class="register-wrap"
         v-show="showRegister">
      <h3>注册</h3>
      <p v-show="showTishi">{{tishi}}</p>
      <el-form :model="registerForm"
               status-icon
               ref="registerForm"
               label-width="30%"
               class="demo-ruleForm">
        <el-form-item prop="email"
                      label="邮箱"
                      :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="pass"
                      :rules="[
      { required: true, message: '请输入密码', trigger: 'blur' } 
    ]">
          <el-input type="password"
                    v-model="registerForm.password"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称"
                      prop="name">
          <el-input v-model="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邀请码"
                      prop="invitecode">
          <el-input v-model="registerForm.invitecode"></el-input>
        </el-form-item>
        <div class='btns'>
          <el-button type="primary"
                     @click="register()">提交</el-button>
          <el-button @click="resetForm('registerForm')">重置</el-button>
        </div>
      </el-form>
      <span v-on:click="ToLogin">已有账号？马上登录</span>
    </div>
  </div>
</template>

<style>
.btns {
  padding-left: 3em;
  margin-bottom: 1em;
}
.demo-ruleForm {
  padding-right: 3em;
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

//import { setCookie, getCookie } from '../../assets/js/cookie.js'
import { login, register } from "@/api/login"
export default {
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        email: '',
        password: '',
        name: '',
        invitecode: ''
      },

      tishi: '',
      showTishi: false,
      showLogin: true,
      showRegister: false,
    }
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
      let datas = this.loginForm
      let res = await login(datas);
      console.log(res)
      this.tishi = "登陆成功"
      this.showTishi = true
      this.tishi = "登录成功"
      this.showTishi = true
      //setCookie('username', this.username, 1000 * 60)
      setTimeout(function () {
        this.$router.push({ path: '/', query: { id: 1 } })
      }.bind(this), 1000)

    },
    ToRegister () {
      this.showRegister = true
      this.showLogin = false
    },
    ToLogin () {
      this.showRegister = false
      this.showLogin = true
    },
    async register () {
      let datas = this.registerForm
      let res = await register(datas);

      this.tishi = "注册成功"
      this.showTishi = true
      setTimeout(function () {
        this.showRegister = false
        this.showLogin = true
        this.showTishi = false
      }.bind(this), 1000)


    }
  }
}
</script>