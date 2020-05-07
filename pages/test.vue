<template>
  <main>测试页面</main>
</template>

<script>
import * as api from "@/api";
export default {
  name: 'test',

  mounted(){
    api.test().then(res =>{
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped>
.test{
  height: 500px;
}
</style>