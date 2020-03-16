<template>
  <div>
    <div class="msg_board_input">
      <div class="msg_board_input_title">留言</div>
      <textarea v-model="msg" placeholder="请输入留言内容" :disabled="!login_status.login"></textarea>
      <div class="tips">
        <div>
          <span v-if="!login_status.login" @click="login">
            请
            <span>登陆</span> 后发布留言
          </span>
        </div>

        <div>
          <i class="submit_tip">{{submit_tip}}</i>
          <span v-if="login_status.login" @click="submit">发布</span>
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
            <div class="nick_name">#{{index+1}} {{item.username}}:</div>
            <div class="msg_content">{{item.content}}</div>
            <div class="create_time">{{item.publish_time}}</div>
          </div>
        </div>
      </div>

      <div class="more_msg">
        <!-- <div @click="moreMsg">加载更多留言</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api'
export default {
  props:{
    /**
     * type: 1 首页留言
     * type: 2 文章留言
     * 
     */
    type: String,
    article_id: [String, Number]
  },

  data() {
    return {
      submit_tip: '',
      msg: '',
      msg_number: '',
      msg_list: []
    }
  },

  // watch:{
  //   msg(val){
  //     this.submit_tip = ''
  //   }
  // },

  computed: {
    login_status() {
      return this.$store.state.login
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    login(){
      this.$store.commit('dialogLogin', true)
    },

    submit() {
      if (this.msg) {
        let sub_data = {
          username: this.$store.state.login.username,
          content: this.msg,
          type: Number(this.type),
          article_id: Number(this.article_id)
        }
        api.messageEdit(sub_data).then(res => {
          this.msg = ''
          if (res.status) {
            this.getList()
            this.submit_tip = '发布留言成功'
            setTimeout(() =>{
              this.submit_tip = ''
            },1000)
          }
        })
      } else {
        this.submit_tip = '请输入留言内容'
      }
    },

    getList() {
      let sub_data = {
        type: Number(this.type),
        article_id: Number(this.article_id)
      }
      api.messageList(sub_data).then(res => {
        this.msg_number = res.count
        this.msg_list = res.data
      })
    },

    moreMsg() {
      let msg = {
        username: '张三',
        content: '今天是个好日子',
        publish_time: '2020-02-25 14:34'
      }
      this.msg_list.push(msg)
    }
  }
}
</script>

<style lang="scss" scoped>
.msg_board_input {
  background-color: #fff;
  margin-top: 10px;

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

    .submit_tip{
      color: red;
      margin-right: 5px;
    }

    span {
      text-decoration: underline;
      cursor: pointer;
      color: #007fff
    }
  }
}

.msg_board {
  margin-top: 10px;
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
    margin: 10px 0;
    padding-bottom: 20px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
