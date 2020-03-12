<template>
  <div>
    <div class="msg_board_input">
      <div class="msg_board_input_title">留言</div>
      <textarea placeholder="请输入留言内容"></textarea>
      <div class="tips">
        <div >
          <span v-if="!login_status.login">
            请<span>登陆</span> 后发布留言
          </span> 
        </div>

        <div>
          <span>发布</span>
        </div>
      </div>
    </div>

    <div class="msg_board">
      <div class="border_bottom">
        <div class="msg_title">留言板 ({{msg_number}}条)</div>
      </div>
      <div class="msg_list">
        <div class="border_bottom">
          <div v-for="(item, index) in msg_list" :key="index" class="border_bottom item">
            <div class="nick_name">#{{index+1}} {{item.nick_name}}:</div>
            <div class="msg_content">{{item.content}}</div>
            <div class="create_time">{{item.create_time}}</div>
          </div>
        </div>
      </div>

      <div class="more_msg">
        <div @click="moreMsg">加载更多留言</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login_info: {},
      msg_number: 99,
      msg_list: [
        {
          nick_name: '张三',
          content: '今天是个好日子',
          create_time: '2020-02-25 14:34'
        },
        {
          nick_name: '张三',
          content: '今天是个好日子',
          create_time: '2020-02-25 14:34'
        }
      ]
    }
  },

  computed:{
    login_status(){
      return this.$store.state.login
    }
  },
  
  methods: {
    moreMsg() {
      let msg = {
        nick_name: '张三',
        content: '今天是个好日子',
        create_time: '2020-02-25 14:34'
      }
      this.msg_list.push(msg)
    }
  }
}
</script>

<style lang="scss" scoped>
.msg_board_input {
  background-color: #fff;
   margin-top: 20px;

  .msg_board_input_title {
    font-weight: bold;
  }
  padding: 10px 20px;
  textarea {
    width: 100%;
    height: 100px;
    outline: 0;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #f1f1f1;
    resize: none;
  }

  input {
    width: 260px;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    border: 1px solid #f1f1f1;
    outline: 0;
  }

  .tips {
    display: flex;
    justify-content: space-between;
    font-size: 14px;

    span {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}

.msg_board {
  margin-top: 20px;
  background-color: #fff;

  .msg_title {
    font-weight: bold;
    padding: 10px 20px;
  }

  .msg_list {
    .item {
      padding: 10px 20px;
      font-size: 14px;

      .msg_content {
        font-size: 16px;
      }
    }

    .msg_content {
      text-indent: 40px;
      margin: 10px 0;
    }

    .create_time {
      text-align: right;
    }
  }

  .more_msg {
    margin: 20px 0;
    padding-bottom: 20px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
