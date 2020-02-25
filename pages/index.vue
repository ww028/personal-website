<template>
  <div>
    <main class="container">
      <div class="content_module">
        <div 
          v-for="(item, index) in content_module"
          :key="index"
          class="item"
          @click="moduleClick(item)"
        >
          {{ item.label }}
        </div>
      </div>

      <div class="recently_article">
        <div class="module_title">
          最近的文章
        </div>

        <div class="list">
          <div
            v-for="(item, index) in recently_article"
            :key="index"
            class="item"
            @click="artilceInfo(item)"
          >
            <div class="info">
              <div>[ {{item.type}} ]</div>
              &emsp;
              <div class="article_title">{{ item.title }}</div>
            </div>
            
            <div>{{ item.date }}</div>
          </div>
        </div>

        <div class="more_artilce" @click="more">查看更多...</div>
      </div>

      <MsgBoard />
    </main>
  </div>
</template>

<script>
import MsgBoard from '~/components/MsgBoard'
export default {
  components:{
    MsgBoard
  },
  data(){
    return{
      content_module: [
        { label: 'HTML', id: 1 },
        { label: 'CSS', id: 2 },
        { label: 'JavaScript', id: 3 },
        { label: 'Vue.js', id: 4 },
        { label: 'Node.js', id: 5 },
      ],
      recently_article: [
        { id: 1, type: 'JavaScript', title: 'JavaScript 从入门到入土', date: '2020-02-25' },
        { id: 2, type: 'Node.js', title: '使用express 框架与MySQL 数据库编写接口', date: '2020-02-25'  },
        { id: 3, type: 'Vue.js', title: '有趣的Vue.js', date: '2020-02-25'  },
        { id: 4, type: 'Vue.js', title: '有趣的Vue.js', date: '2020-02-25'  },
        { id: 5, type: 'Vue.js', title: '有趣的Vue.js', date: '2020-02-25'  },
      ],
      
    }
  },

  methods: {
    moduleClick(val){
      this.$router.push('/content_module?id=' + val.id)
    },

    artilceInfo(val){
      this.$router.push('/article_info?title=' + val.title)
    },

    more(){
      this.$router.push('/article')
    }
  }
}
</script>
