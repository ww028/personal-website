<template>
  <header>
    <div class="container h_content">
      <div class="header_title">W的博客</div>
      <!-- <div class="login" @click="login">登陆/注册</div> -->
      <div class="login" @click="login">
        <span class="login" @click="login">登陆/注册</span>
        <span>欢迎您：{{this.login_info.username || this.$store.state.username}}</span> 
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data(){
    return{
      login_info: {}
    }
  },

  mounted(){
    console.log(this.$store.state.username)
    this.login_info = JSON.parse(localStorage.getItem('login_info'))
    console.log(this.login_info)
  },

  methods:{
    login(){
      this.$store.commit('dialogLogin', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.h_content{
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .login{
    font-size: 14px;
    cursor: pointer;
  }
}
</style>

