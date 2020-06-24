<template>
  <div class="message_board">
    <div class="msg_title">留言板({{total}})：</div>
    <div class="message_input">
      <div class="w_textarea">
        <el-input v-model="msg_form.msg" type="textarea" placeholder="请输入留言内容,后台审核通过后会展示在留言列表"></el-input>
      </div>

      <div class="input_info">
        <div class="w_input">
          <el-input v-model="msg_form.nick_name" size="mini" placeholder="请输入昵称"></el-input>
        </div>

        <div class="w_input">
          <el-input v-model="msg_form.email" size="mini" placeholder="请输入邮箱地址"></el-input>
        </div>

        <div class="w_input">
          <el-button size="mini" :disabled="submit_flag" @click="submit">提交</el-button>
        </div>

        <div class="w_input tips">{{ tips }}</div>
      </div>
    </div>
    <div class="message_list">
      <ul>
        <li v-for="(item, index) in msg_list" :key="item.id">
          <div>
            <span>#{{index+1}}</span>
            {{ item.nick_name}}
          </div>
          <div class="msg">{{ item.msg }}</div>
          <div class="create_time">{{ item.create_time }}</div>
        </li>
      </ul>
      <div class="more" v-if="total_page > pageNo">
        <el-button type="text" @click="more">查看更多</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "@/api";
import fn from "@/assets/js/fn.js";
export default {
  props: {
    type: Number,
    article_id: Number
  },

  data() {
    return {
      msg_form: {
        msg: "",
        nick_name: "",
        email: ""
      },
      total: "",
      submit_flag: false,
      tips: "",
      msg_list: [],
      pageNo: 1,
      pageSize: 5,
      total_page: 1
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData(pageNo = 1) {
      api
        .msgBoardList({
          type: this.type,
          article_id: this.article_id || "",
          pageNo: pageNo,
          pageSize: this.pageSize
        })
        .then(res => {
          if(res){
            this.msg_list = this.msg_list.concat(res.data);
            this.total = res.total;
            this.total_page = res.total_page;
          }
          // this.msg_list.(res.data)
        });
    },

    more() {
      this.pageNo++;
      this.getData(this.pageNo);
    },

    submit() {
      // 验证内容
      if (this.msg_form.msg === "") {
        this.tips = "请输入留言内容";
        return;
      }

      if (this.msg_form.msg.indexOf("渣") > -1 || this.msg_form.msg.indexOf("zha") > -1) {
        this.tips = "总有刁民想污蔑朕";
        return;
      }

      // 验证昵称
      if (!this.checkNickName(this.msg_form.nick_name)) {
        return;
      }

      // 验证邮箱
      if (!this.checkEmail(this.msg_form.email)) {
        return;
      }

      // this.msg_form.w_ip = returnCitySN["cip"];
      // this.msg_form.w_city = returnCitySN["cname"];
      this.msg_form.type = this.type;
      this.msg_form.article_id = this.article_id || "";
      this.submit_flag = true;

      api.msgBoardEdit(this.msg_form).then(res => {
        this.tips = res.message;

        if (res.status) {
          // 清空留言板输入内容
          for (let key in this.msg_form) {
            this.msg_form[key] = "";
          }
        }
        setTimeout(() => {
          this.submit_flag = false;
          this.tips = "";
        }, 3000);
      });
    },

    checkNickName(val) {
      if (val === "") {
        this.tips = "昵称不能为空";
        return false;
      }

      if (val.length < 2) {
        this.tips = "昵称长度不可以少于 2 个字符";
        return false;
      }

      if (val.length > 8) {
        this.tips = "昵称长度不可以大于 8 个字符";
        return false;
      }

      let check_rule = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
      if (check_rule.test(this.msg_form.nick_name)) {
        this.tips = "";
        return true;
      } else {
        this.tips = "昵称不可以输入特殊字符";
        return false;
      }
    },

    checkEmail(val) {
      let check_rule = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (check_rule.test(this.msg_form.email)) {
        this.tips = "";
        return true;
      } else {
        this.tips = "邮箱格式不正确";
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.message_board {
  width: 710px;
  background-color: #fff;
  padding: 10px 20px;
  margin-top: 10px;
}

.msg_title {
  margin-bottom: 10px;
  font-weight: bold;
}

.input_info {
  display: flex;
  // border-bottom: 1px solid rgba(178, 186, 194, 0.15);
  // padding-bottom: 10px;
  .w_input {
    margin-top: 10px;
    margin-right: 10px;
  }

  .tips {
    font-size: 12px;
    line-height: 28px;
    color: red;
  }
}

.message_list {
  margin-top: 10px;
  ul {
    font-size: 14px;
    color: #7c8aa8;
  }

  li {
    padding: 10px 0;
    border-top: 1px solid rgba(178, 186, 194, 0.15);
  }

  .msg {
    margin: 5px 0;
    color: #000;
    text-indent: 20px;
  }

  .create_time {
    text-align: right;
  }

  .more {
    border-top: 1px solid rgba(178, 186, 194, 0.15);
    text-align: center;
  }
}

@media screen and (max-width: 1000px) {
  .message_board {
    width: 100%;
    margin-top: 0;
    border-top: 1px solid rgba(178, 186, 194, 0.15);
  }

  .msg_title {
    font-size: 0.3rem;
  }

  .input_info {
    display: contents;
    .w_input {
      margin-top: 0.2rem;
      font-size: 0.2rem;
    }
  }
}
</style>