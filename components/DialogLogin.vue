<template>
  <div class="dialog_login">
    <div class="content">
      <div class="dialog_header">
        <div class="title">{{ status ? '登陆' : '注册' }}</div>
        <div class="close" @click="close">X</div>
      </div>

      <div>
        <div class="input_box">
          <input type="text" v-model="form_data.username" placeholder="请输入用户名" />
        </div>

        <div class="input_box">
          <input type="password" v-model="form_data.password" placeholder="请输入密码" />
        </div>

        <div class="input_tips">{{input_tips}}</div>
        <button @click="login" class="btn">{{ status ? '登陆' : '注册' }}</button>

        <div class="tips">
          <div>
            <span v-show="status">没有账号?</span>
            <span @click="loginOrRegister">{{ status ? '注册' : '已有账号登陆' }}</span>
          </div>
          <div class="forget_pst">
            <span>忘记密码</span>
          </div>
        </div>

        <div class="login_way">
          <div class="title">第三方账号登陆</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register, login } from '@/api'
export default {
  data() {
    return {
      status: true, // true:登陆 false:注册,
      input_tips: '',
      login_info: {
        username: '',
        status: false
      },
      form_data: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    close() {
      this.$store.commit('dialogLogin', false)
    },

    loginOrRegister() {
      this.form_data = {
        username: '',
        password: ''
      }
      this.input_tips = ''
      this.status = !this.status
    },

    login() {
      if (!this.form_data.username) {
        this.input_tips = '请输入用户名'
        return
      }

      if (!this.form_data.password) {
        this.input_tips = '请输入密码'
        return
      }

      this.input_tips = ''

      if (this.status) {
        login(this.form_data)
          .then(res => {
            if (res.code === 0) {
              this.login_info.status = false
              this.input_tips = '账号或密码错误'
            } else {
              let login_info = {
                login: true,
                username: res.data[0].username
              }
              this.$store.commit('login/loginInfo', login_info)
              this.$store.commit('dialogLogin', false)
            }
          })
          .catch(e => {
            this.input_tips = '请求服务器失败，请刷新页面重试'
          })
        // 登陆
      } else {
        // 注册
        register(this.form_data).then(res => {
          console.log(res)
          this.form_data = {
            username: res.data.username,
            password: ''
          }
          this.input_tips = '注册成功，请输入密码登陆'
          this.status = true
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog_login {
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.5);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 16px;

  .content {
    width: 300px;
    background-color: #fff;
    border-radius: 2px;
    padding: 20px;

    .dialog_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      .title {
        font-weight: bold;
      }

      .close {
        cursor: pointer;
      }
    }

    .input_box {
      width: 100%;
      margin-bottom: 10px;
      input {
        width: 100%;
        height: 40px;
        padding: 5px;
        outline: none;
        border: 1px solid #e9e9e9;
        border-radius: 2px;
      }
    }

    .btn {
      width: 100%;
      height: 40px;
      background-color: #007fff;
      color: #fff;
      letter-spacing: 5px;
      font-weight: bold;
      border: 0;
      outline: 0;
      cursor: pointer;
      // margin-top: 10px;
    }

    .tips {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      color: #767676;

      span {
        color: #007fff;
        cursor: pointer;
      }
    }

    .login_way {
      font-size: 14px;
      margin-top: 10px;
      color: #767676;
      display: none;
    }
  }
}

.input_tips {
  font-size: 14px;
  color: red;
  text-align: center;
  margin-bottom: 5px;
}
</style>