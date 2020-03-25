<template>
  <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumb"
      :key="index"
      :to="{path: item.path}"
    >
      {{item.name}}
    </el-breadcrumb-item>
  </el-breadcrumb> -->
  <div>
    <div>首页</div>
    <div>&lt;</div>
    <div>文章详情</div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data(){
    return {
      breadcrumb: [
        { name: '首页', path: '/' },
      ]
    }
  },

  mounted(){
    let from = this.$router.currentRoute.params.from || localStorage.getItem('from')
    if(from){
      localStorage.setItem('from', from)
    }

    if(from === 'home'){
      this.breadcrumb = [
        { name: '首页', path: '/' },
        { name: '文章详情', },
      ]
    } else if(from === 'article') {
      this.breadcrumb = [
        { name: '首页', path: '/' },
        { name: '全部文章', path: '/article' },
        { name: '文章详情', },
      ]
    }
  }
}
</script>