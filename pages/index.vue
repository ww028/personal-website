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
          >
            <div class="info">
              <div>[ {{item.type}} ]</div>
              &emsp;
              <div class="article_title">{{ item.title }}</div>
            </div>
            
            <div>{{ item.date }}</div>
          </div>
        </div>

        <div class="more_artilce">查看更多...</div>
      </div>

      <div class="msg_board">
        <div class="module_title">
          留言板 ({{msg_number}}条)
        </div>
        <div class="msg_list">
          <div
            v-for="(item, index) in msg_list"
            :key="index"
            class="item"
          >
            <div class="nick_name">#{{index+1}} {{item.nick_name}}:</div>
            <div class="msg_content">{{item.content}}</div>
            <div class="create_time">{{item.create_time}}</div>
          </div>
        </div>

        <div class="more_msg">
          <div @click="moreMsg">加载更多留言</div>
        </div>
      </div>

      <div class="msg_board_input">
        <div>留言内容</div>
        <textarea placeholder="请输入留言内容"></textarea>

<!-- 
        <div class="email">
          邮箱(必填)
        </div>
        <input type="text" placeholder="请输入邮箱"> -->

        <div class="submit">
          <button>发布</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  
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
      msg_number: 99,
      msg_list: [
        { nick_name: '张三', content: '今天是个好日子', create_time: '2020-02-25 14:34' },
        { nick_name: '张三', content: '今天是个好日子', create_time: '2020-02-25 14:34' },
        { nick_name: '张三', content: '今天是个好日子', create_time: '2020-02-25 14:34' },
        { nick_name: '张三', content: '今天是个好日子', create_time: '2020-02-25 14:34' },
        { nick_name: '张三', content: '今天是个好日子', create_time: '2020-02-25 14:34' },
        { nick_name: '张三', content: '今天是个好日子', create_time: '2020-02-25 14:34' },
      ]
    }
  },

  methods: {
    moduleClick(val){
      this.$router.push('/content_module?id=' + val.id)
    },

    moreMsg(){
      let msg = { nick_name: '张三', content: '今天是个好日子', create_time: '2020-02-25 14:34' };
      this.msg_list.push(msg)
    }
  }
}
</script>
