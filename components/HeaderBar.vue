<template>
  <header>
    <nuxt-link
      :to="{name: 'index'}"
    >W 的博客</nuxt-link>
  </header>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  line-height: 50px;
  color: #fff;
  background-color: rgba($color: #000000, $alpha: 0.3);
}

@media screen and (max-width: 1000px) {
  header {
    font-size: 0.3rem
  }
}
</style>