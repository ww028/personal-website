<template>
  <header>
    <div class="container h_content">
      <div class="header_title">W的博客</div>
      <div class="login" @click="login">登陆/注册</div>
    </div>
  </header>
</template>

<script>
export default {
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

