<template>
  <div class="__container">
    <!-- <div>default</div> -->
    <Snow/>
    <!-- <HeaderBar /> -->
    <nuxt />
  </div>
</template>

<script>
import Snow from '~/components/Snow'
import HeaderBar from '~/components/HeaderBar'
import DialogLogin from '~/components/DialogLogin'
export default {
  components: {
    HeaderBar, DialogLogin, Snow
  },

  mounted(){
    if(localStorage.getItem('login_info')){
      this.$store.commit('login/loginInfo', JSON.parse(localStorage.getItem('login_info')))
    }
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
