<template>
  <div>
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
      <textarea placeholder="请输入留言内容" disabled></textarea>
      <div class="tips">请 <span>登陆</span> 后发布留言</div>

<!-- 
      <div class="email">
        邮箱(必填)
      </div>
      <input type="text" placeholder="请输入邮箱"> -->

      <div class="submit">
        <button>发布</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
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

  methods:{
    moreMsg(){
      let msg = { nick_name: '张三', content: '今天是个好日子', create_time: '2020-02-25 14:34' };
      this.msg_list.push(msg)
    }
  }
}
</script>
