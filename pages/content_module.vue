<template>
  <main class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="c_title">{{title}}</div>
    <div>内容</div>

    <MsgBoard />
  </main>
</template>

<script>
import MsgBoard from '~/components/MsgBoard'
export default {
  components:{
    MsgBoard
  },
  data(){
    return{
      title: '',
      content_module: [
        { label: 'HTML', id: 1 },
        { label: 'CSS', id: 2 },
        { label: 'JavaScript', id: 3 },
        { label: 'Vue.js', id: 4 },
        { label: 'Node.js', id: 5 },
      ],
    }
  },
  mounted(){
    let id = this.$router.currentRoute.query.id || 1
    this.content_module.map(item =>{
      if(item.id == id){
        this.title = item.label
      }
    })
    console.log(this.$router.currentRoute.query.id)
  }
}
</script>
