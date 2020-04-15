<template>
  <footer>
    <main>
      <span>邮箱: wwjobs@163.com</span>
      <span>
        <a href="http://www.beian.miit.gov.cn" target="blank">蜀ICP备20009820号</a>
      </span>
    </main>
  </footer>
</template>

<script>
export default {
  name: "FooterBar"
};
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  height: 40px;
  background-color: #fff;

  main {
    margin: 10px auto 0;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #7c8aab;

    span {
      margin-right: 10px;
    }

    a {
      color: #7c8aab;
      font-size: 14px;
    }
  }
}
</style>
