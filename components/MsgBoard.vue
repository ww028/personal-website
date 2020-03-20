<template>
  <div class="msg_board">
    <div class="title">留言板</div>
    <div class="w_textarea">
      <textarea v-model="sub_data.msg"></textarea>
    </div>

    <div class="w_input">
      <input type="text" v-model="sub_data.nick_name" placeholder="请输入您的名字" />
      <input type="text" v-model="sub_data.email_or_tel" placeholder="请输入您的邮箱/电话号码" />
      <button v-if="limit_count < 3" class="btn" @click="submit" :disabled='submit_flag'>发布</button>
      <div v-else class="tips" >{{tips}}</div>
    </div>

    <div class="msg_list">
      <div class="title">留言内容 <span>({{msg_number}})</span> </div>
      <div
        v-for="(item, index) in msg_list"
        :key="item.id"
        class="item"
      >
        <div class="username">
          <span> #{{ msg_number - index }}</span>
          <span>{{item.nick_name}}</span>
        </div>

        <div class="msg">
          {{item.msg}}
        </div>

        <div class="create_time">
          {{item.create_time}}
        </div>
      </div>
      <div class="more_btn">
        <button class="btn" v-if="more_flag" @click="more" :disabled='submit_flag'>查看更多</button>
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
     */
    type: String,
    article_id: [String, Number]
  },
  data(){
    return{
      msg_number: '',
      submit_flag: false,
      pageNo: 1,
      pageSize: 3,
      page: 0,
      sub_data:{
        msg: '',
        nick_name: '',
        email_or_tel: ''
      },
      tips: '',
      limit_count: 0,
      msg_list: []
    }
  },

  computed:{
    more_flag(){
      return this.page > 0 && this.pageNo < this.page
    }
  },

  mounted(){
    this.getData()
  },

  methods:{
    submit(){
      if(this.sub_data.msg === ''){
        this.tips = '请输入留言内容'
        return
      }

      if(this.sub_data.msg.indexOf('渣男') > -1) {
        this.tips = '不要污蔑我！'
        return
      }

      if(this.sub_data.nick_name === ''){
        this.tips = '请输入您的昵称'
        return
      }

      if(!this.emailOrTel(this.sub_data.email_or_tel)){
        return
      }

      this.submit_flag = true
      this.sub_data.type = this.type
      this.sub_data.article_id = this.article_id
      api.messageEdit(this.sub_data).then(res => {
        this.tips = res.message
        if (res.status) {
          this.pageNo = 1
          this.sub_data.msg = ''
          this.sub_data.nick_name = ''
          this.sub_data.email_or_tel = ''
          this.getData()
          setTimeout(() =>{
            this.tips = ''
          },1000)
        }
        setTimeout(() =>{
          this.submit_flag = false
        },1000)
      })
    },

    more(){
      this.submit_flag = true
      setTimeout(() =>{
        this.submit_flag = false
      },1000)
      this.pageNo++
      this.getData()
    },

    getData() {
      let sub_data = {
        type: Number(this.type),
        article_id: Number(this.article_id),
        pageSize: this.pageSize,
        pageNo: this.pageNo
      }
      api.messageList(sub_data).then(res => {
        console.log(res)
        this.limit_count = res.limit_count
        if(this.limit_count == 3){
          this.tips = '每天做多只可以发布3条留言'
        }
        this.msg_number = res.total
        this.page = res.page
        if(this.pageNo > 1){
          this.msg_list = this.msg_list.concat(res.data)
        } else{
          this.msg_list = res.data
        }
      })
    },

    emailOrTel(val){
      let rule = ''
      let flag = false

      if(val === ''){
        this.tips = '请输入您的邮箱/电话号码'
        return false
      }

      if(val.indexOf('@') > 0){
        // 邮箱
        rule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        flag = rule.test(val)
      } else {
        // 电话
        rule = /^1[3456789]\d{9}$/
        flag = rule.test(val)
      }

      if(!flag){
        this.tips = '邮箱/电话号码格式不正确'
        return false
      } else {
        return true
        this.tips = ''
      }
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

.get_check_code{
  width: 100px
}

.more_btn{
  margin-top: 10px;
  text-align: center
}

.w_input {
  display: flex;
  margin-top: 10px;
  input {
    width: 180px;
    height: 30px;
    border: solid 1px #000;
    outline: none;
    color: #fff;
    padding: 10px;
    margin-right: 20px;
    background-color: rgba($color: #000000, $alpha: 0.5);
  }

  .tips{
    height: 30px;
    line-height: 30px;
    color: red;
    margin-left: 20px;
    font-size: 14px;
    font-weight: bold
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

@media screen and (max-width: 1000px) {
  .title{
    font-size: 0.3rem
  }

  .w_textarea{
    height: 2rem;
  }

  .w_input{
    flex-direction: column;
    input{
      width: 5rem;
      font-size: 0.2rem;
      margin-bottom: 0.1rem;
    }
  }

  .msg_list{
    font-size: 0.2rem;
  }
}

</style>