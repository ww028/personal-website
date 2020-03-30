<template>
  <div class="message_board">
    <div class="msg_title">留言板：</div>
    <div class="message_input">
      <div class="w_textarea">
        <el-input type="textarea" placeholder="请输入留言内容"></el-input>
      </div>

      <div class="input_info">
        <div class="w_input">
          <el-input size="mini" placeholder="请输入昵称"></el-input>
        </div>

        <div class="w_input">
          <el-input size="mini" placeholder="请输入邮箱地址或电话号码"></el-input>
        </div>

        <div class="w_input">
          <el-button size="mini">提交</el-button>
        </div>
      </div>
    </div>
    <div class="message_list">
      <ul>
        <li v-for="item in msg_list" :key="item.id">
          <div>{{ item.nick_name}}</div>
          <div>{{ item.msg }}</div>
          <div>{{ item.create_time }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg_list: [
        { id: 1, nick_name: '张三', create_time: '2018-03-27', msg: '你好啊' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.message_board {
  background-color: #fff;
  padding: 10px 20px;
  margin-top: 10px
}

.msg_title {
  margin-bottom: 10px;
  font-weight: bold;
}

.input_info {
  display: flex;
  .w_input {
    margin-top: 10px;
    margin-right: 10px;
  }
}

// .message_board {
//   margin: 10px 0;
// }

// .input_info{
//   display: flex;
//   margin-top: 10px;

//   .w_input{
//     margin-right: 10px;
//   }
// }
</style>