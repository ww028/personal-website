<template>
  <div class="zsz">
    <img src="../assets/images/table.jpg" alt="">
  </div>
</template>

<script>
export default {
  name: 'zsz',
  head(){
    return {
      title:'生育登记'
    }
  },
  created(){
    this.$store.commit('hideHeader')
  }
}
</script>

<style lang="scss">
.zsz{
  height: 100%;
  width: 100%;
  background-color: #fff;

  img{
    width: 100%;
  }
}
</style>