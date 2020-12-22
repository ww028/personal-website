<!--
 * @Author: 魏微
 * @Date: 2020-10-18 23:55:42
 * @LastEditTime: 2020-12-22 17:22:38
 * @FilePath: /personal-website/pages/zsz.vue
-->
<template>
  <div class="zsz">
    <img src="../assets/images/table.jpeg" alt="">
    <div class="info">
      <span>本信息来源：贵州省生育服务网上登记平台</span>
      <span>查验时间：{{dete_time}}</span>
    </div>
    <img src="../assets/images/table_footer.jpeg" alt="">
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
  data(){
    return {
      dete_time: ''
    }
  },
  created(){
    const _date = new Date();
    const year = _date.getFullYear()
    const month = _date.getMonth() + 1
    const day = _date.getDate()
    let hour = _date.getHours()
    let min = _date.getMinutes()
    let sec = _date.getSeconds()
    if(hour < 10){
      hour = `0${hour}`
    }

    if(min < 10 ){
      min = `0${min}`
    }

    if(sec < 10 ){
      sec = `0${sec}`
    }
    this.dete_time = `${year}-${month}-${day} ${hour}:${min}:${sec}`
  }
}
</script>

<style lang="scss">
.zsz{
  height: 100%;
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;

  img{
    width: 100%;
  }

  .info{
    font-size: 0.13rem;
    text-align:center;
    color: #222
    // transform: scale(0.5);
    // margin-top: -0.3rem;
    // width: 200%;
    // margin-left: -2rem;
  }
}
</style>