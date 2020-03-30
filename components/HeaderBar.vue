<template>
  <header>
    <nuxt-link
      :to="{name: 'index'}"
    >W的博客</nuxt-link>
  </header>
</template>

<style lang="scss" scoped>
header{
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
  padding: 0 20px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;

  a{
    // color: #007fff;
    color: #08108a;
    font-weight: bold;
    letter-spacing: 5px;
  }
}

@media screen and (max-width: 1000px) {
  header {
    z-index: 999;
    font-size: 0.3rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border-bottom: 1px solid rgba(178, 186, 194, 0.15)
  }
}
</style>