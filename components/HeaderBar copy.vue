<template>
  <header>
    <div class="container h_content">
      <div class="header_title">W的博客</div>
      <div>
        <span v-if="login_status.login">
          <span>欢迎您：{{ login_status.username }}</span> 
          <span class="exit" @click="exit">退出</span>
        </span> 
        <span v-else class="login" @click="login">登陆/注册</span>
      </div>
    </div>
  </header>
</template>

<script>
import { exit } from '@/api'
export default {
  data() {
    return {
      login_info: {
        login: '',
        username: ''
      }
    }
  },

  computed:{
    login_status(){
      return this.$store.state.login
    }
  },

  // mounted() {
  //   this.login_info = JSON.parse(localStorage.getItem('login_info')) || this.login_info
  // },

  methods: {
    exit() {
      exit({username: this.login_info.username}).then(res =>{
        this.login_info = {}
        this.$store.commit('login/loginInfo', {})
        localStorage.removeItem('login_info')
      })
    },

    login() {
      this.$store.commit('dialogLogin', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.h_content {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;

  .login, .exit{
    color: #007fff;
    cursor: pointer;
  }
}
</style>

