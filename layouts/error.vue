<template>
  <main class="err_container">
    <h1 v-if="error.statusCode === 404">页面不存在</h1>
    <h1 v-else>哦豁</h1>
    <nuxt-link to="/">服务器有一点点繁忙，点我回到首页吧</nuxt-link>
  </main>
</template>

<script>
export default {
  props: ['error'],
}
</script>

<style lang="scss" scoped>
.err_container{
  text-align: center;

  h1{
    margin-bottom: 20px
  }
}
</style>

