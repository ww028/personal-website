<template>
  <footer>
    <div class="container">
      <span>邮箱: wwjobs@163.com</span>
      <span>
        <a href="http://www.beian.miit.gov.cn" target="blank">蜀ICP备20009820号</a>
      </span>
    </div>
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

  .container {
    width: 960px;
    margin: 0 auto;
    // margin: 10px auto 0;
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

@media screen and (max-width: 1000px) {
  footer{
    padding: 0rem 0.1rem;

    .container{
      width: 100%;
    }
  }
}
</style>
