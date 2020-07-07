<template>
  <main>
    <div class="line"></div>
    <div class="container">
      <div class="personal">
        <div class="icon">
          <img src="../assets/images/icon.jpg" alt />
        </div>
      </div>
      <div class="project">
        <div class="nav_bar">
          <div class="item">Overview</div>
        </div>
        <div class="title">Popular repositories</div>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item
            v-for="(item, index) in project"
            :key="index"
            :title="item.title"
            :name="item.name"
          >
            <ol>
              <li v-for="(sub_item, sub_index) in item.info" :key="sub_index">{{sub_item}}</li>
            </ol>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      project: [
        {
          title: "一致性 Consistency",
          name: 2,
          info: [
            "与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念",
            "在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等"
          ]
        },
        {
          title: "反馈 Feedback",
          name: 3,
          info: [
            "控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；",
            "页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。",
            "帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。",
          ]
        }
      ]
    };
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/about_me.scss";
</style>
