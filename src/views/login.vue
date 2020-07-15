<template lang="html">
  <div class="login">
    <div class="login-box ctt">
      <!-- logo -->
      <div class="logo">
        <img src="../assets/imgs/logo.png" alt="logo" />
        <h2>网课后台管理系统</h2>
      </div>
      <p>请使用您的账号密码登录系统</p>
      <!-- 登录表单 -->
      <div class="form-box">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
          <el-form-item prop="userName">
            <el-input
              type="text"
              v-model="ruleForm.userName"
              autofocus
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="userPwd">
            <el-input
              type="password"
              v-model="ruleForm.userPwd"
              @keyup.enter.native="submitForm('ruleForm')"
              autocomplete="off"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item class="check-code" prop="checkCode">
            <el-input
              type="text"
              v-model="ruleForm.checkCode"
              @keyup.enter.native="submitForm('ruleForm')"
              autocomplete="off"
              placeholder="请输入验证码"
            ></el-input>
            <img
              :src="'data:text/html;base64,' + codeImgUrl"
              title="点击换一张"
              @click="getCheckCode"
            />
          </el-form-item>
          <div class="rember-pwd">
            <div></div>
            <a href="#" @click="forgetPwd">忘记密码?</a>
          </div>
          <el-form-item>
            <el-button type="primary" :loading="isLoading" @click="submitForm('ruleForm')"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <!-- footer -->
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import * as api from '@/api/userInfo'
export default {
  data() {
    return {
      isLoading: false,
      codeImgUrl: '',
      ruleForm: {
        userName: '',
        userPwd: '',
        checkCode: '',
        uuid: '',
      },
      //表单验证规则
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        checkCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        userPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    ...mapMutations({
      vxSetToken: 'setToken',
      vxSetUserInfo: 'setUserInfo',
    }),
    ...mapActions({
      vxGetAccessToken: 'getAccessToken',
    }),
    async getCheckCode() {
      let res = await api.captchaImage()
      console.log('res', res)
      this.codeImgUrl = res.img
      this.ruleForm.uuid = res.uuid
    },
    forgetPwd() {
      this.$myMessage('请联系管理员找回密码', 1)
    },
    //登录函数
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.isLoading = true
          try {
            let params = {
              code: this.ruleForm.checkCode,
              password: this.ruleForm.userPwd,
              account: this.ruleForm.userName,
              uuid: this.ruleForm.uuid,
            }
            const res = await api.login(params)
            this.vxSetUserInfo(res)
            this.isLoading = false
            this.$router.replace('/')
          } catch (error) {
            console.log('error', error)
            // this.$myMessage()
            this.isLoading = false
          }
        } else {
          return false
        }
      })
    },
  },
  mounted() {
    this.getCheckCode()
    this.vxGetAccessToken()
  },
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;

  &::after {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../assets/imgs/login.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    content: '';
    z-index: -1;
  }
}

.login-box {
  width: 400px;
  height: auto;
  box-sizing: border-box;
  padding: 20px;
}

.logo {
  p {
    font-size: 20px;
    line-height: 150%;
    margin: 20px 0;
  }
}

.form-box {
  margin: 20px 0;

  /deep/ .el-button {
    width: 100%;
  }

  .rember-pwd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 22px;
    font-size: 14px;
  }
}
.check-code {
  img {
    margin-left: 10px;
  }
  /deep/ .el-form-item__content {
    display: flex;
  }
}
</style>
