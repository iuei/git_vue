<template>
  <div class="login-container">
    <el-form :model="loginForm" label-width="80px" class="login-form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="primary" @click="openRegisterDialog">注册</el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-model="registerDialogVisible" title="注册" width="30%" center>
      <el-form ref="registerForm" :model="registerForm" label-width="80px" class="register-form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="cell">
          <el-input v-model="registerForm.cell" placeholder="请输入手机号" :maxlength="11"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="primary" @click="returnLogin">返回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie"
// import { setToken, getToken } from "./check";

export default {
  data() {
    return {
      baseUrl: 'http://localhost:5000',
      loginForm: {
        username: '',
        password: '',
      },
      registerForm: {
        username: '',
        password: '',
        cell: '',
      },
      registerDialogVisible: false,
    };
  },

  methods: {
    login() {
      axios.post(`${this.baseUrl}/user/login`, this.loginForm, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then(response => {
            const { data } = response;
            if (data.message === '登录成功') {
              this.$message.success('登录成功！');
              // setToken(data.user_info.token);
              this.$router.push('/list');
            } else {
              this.$message.error(`登录失败: ${data.error}`);
            }
          })
          .catch(error => {
            this.$message.error(`登录失败: ${error.message}`);
          });
    },

    openRegisterDialog() {
      this.registerDialogVisible = true;
    },

    returnLogin() {
      console.log('返回登录');
      this.registerDialogVisible = false;
    },

    register() {
      axios.post(this.baseUrl+"/user/register", this.registerForm, {
        headers: {'Content-Type': 'application/json'}
      })
          .then(response => {
            const {data} = response;
            if (data.state === 0) {
              this.$message.success('注册成功！！！');
              // 使用cookie存储信息
              Cookies.set("user", JSON.stringify(this.registerForm));
              this.registerDialogVisible = false;
            } else if (data.state === -1) {
              this.$message.error(`注册失败: ${data.msg}`);
            }
          })
          .catch(error => {
            this.$message.error(`注册失败: ${error.message}`);
          });
    },

  },
};
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

.login-form {
  width: 300px;
}

.register-form {
  width: 100%;
}
</style>
