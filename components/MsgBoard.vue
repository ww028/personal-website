<template>
  <div class="msg_board">
    <div class="title">留言板</div>
    <div class="w_textarea">
      <textarea></textarea>
    </div>

    <div class="w_input">
      <input type="text" placeholder="请输入您的名字" />

      <input type="text" placeholder="请输入您的邮箱(不公开)" />

      <button class="btn">发布</button>
    </div>

    <div class="msg_list">
      <div
        v-for="(item, index) in msg_list"
        :key="item.id"
        class="item"
      >
        <div class="username">
          <span> #{{index+1}}</span>
          <span>{{item.username}}</span>
        </div>

        <div class="msg">
          {{item.msg}}
        </div>

        <div class="create_time">
          {{item.create_time}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      msg_list: [
        { id: 1, username: '张三', msg: '今天是个好天气', create_time: '2020/03/15'},
        { id: 2, username: '张三', msg: '今天是个好天气', create_time: '2020/03/15'},
        { id: 3, username: '张三', msg: '今天是个好天气', create_time: '2020/03/15'},
        { id: 4, username: '张三', msg: '今天是个好天气', create_time: '2020/03/15'},
        { id: 5, username: '张三', msg: '今天是个好天气', create_time: '2020/03/15'},
        { id: 6, username: '张三', msg: '今天是个好天气', create_time: '2020/03/15'},
        { id: 7, username: '张三', msg: '今天是个好天气', create_time: '2020/03/15'},
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
}

.btn {
  width: 80px;
  height: 30px;
  color: #fff;
  border: solid 1px #000;
  outline: none;
  cursor: pointer;
  background-color: rgba($color: #000000, $alpha: 0.5);
  // border-radius: ;
}

.w_input {
  display: flex;
  margin-top: 10px;
  input {
    width: 200px;
    height: 30px;
    border: solid 1px #000;
    outline: none;
    color: #fff;
    padding: 10px;
    margin-right: 20px;
    background-color: rgba($color: #000000, $alpha: 0.5);
  }
}

.w_textarea {
  width: 100%;
  height: 200px;

  textarea {
    width: 100%;
    height: 100%;
    padding: 10px;
    resize: none;
    outline: none;
    border: solid 1px #000;
    background-color: rgba($color: #000000, $alpha: 0.5);
    color: #fff;
    font-size: 14px;
    line-height: 18px;
  }
}

.msg_list{
  color: #fff;
  margin-top: 10px;
  // background-color: rgba($color: #000000, $alpha: 0.5);
  margin-top: 10px;
  // padding: 10px;

  .item{
    margin-top: 10px;
    border-bottom: solid 1px rgba($color: #fff, $alpha: 0.1);
  }

  .item:last-child{
    border: 0;
  }

  .msg{
    margin-top: 10px;
    text-indent: 20px;
  }

  .create_time{
    padding-bottom: 10px;
    text-align: right;
  }
}
</style>