<template>
  <div class="__container">
    <!-- <div>default</div> -->
    <HeaderBar />
    <nuxt />
    <FooterBar />
  </div>
</template>

<script>
import HeaderBar from '~/components/HeaderBar'
import FooterBar from '~/components/FooterBar'
// import DialogLogin from '~/components/DialogLogin'
export default {
  components: {
    HeaderBar, FooterBar
  },

  mounted() {
    if (localStorage.getItem('login_info')) {
      this.$store.commit(
        'login/loginInfo',
        JSON.parse(localStorage.getItem('login_info'))
      )
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
