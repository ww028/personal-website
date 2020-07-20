<template>
  <main>
    <div class="line"></div>
    <div class="container">
      <div class="personal">
        <div class="icon">
          <img src="../assets/images/icon.jpg" alt />
        </div>
        <div class="info">
          <p>魏微</p>
          <p>wwjobs@163.com</p>
          <!-- <p>
            <a target="right" href="https://github.com/ww028">前往 github</a>
          </p> -->
        </div>
      </div>
      <div class="project">
        <div class="nav_bar">
          <div
            v-for="item in nav_bar"
            :key="item.id"
            class="item"
            :class="item.class"
            @click="changeBar(item)"
          >{{ item.label }}</div>
          <div class="item"></div>
          <div class="item"></div>
        </div>
        <div class="title">xxx</div>
        <div class="project_items">
          <div v-for="(item, index) in project" :key="index" class="item">
            <div class="label">{{item.label}}</div>
            <div class="introduce">{{item.introduce}}</div>
            <div class="technology">{{item.technology}}</div>
          </div>
        </div>

        <!-- <el-collapse v-model="activeNames">
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
        </el-collapse>-->
      </div>
    </div>
  </main>
</template>

<script>
import aboutMeData from "@/data/aboutMe";
export default {
  data() {
    return {
      activeNames: "",
      nav_bar: [
        { id: 1, label: "OverView", class: "act" },
        { id: 2, label: "Project", class: "" }
      ],
      project: [
        { label: "name", introduce: "介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息", technology: "Javascript" },
        { label: "name", introduce: "介绍信息", technology: "Javascript" },
        { label: "name", introduce: "介绍信息", technology: "Javascript" },
        { label: "name", introduce: "介绍信息", technology: "Javascript" },
      ]
    };
  },

  mounted() {
    console.log(aboutMeData);
  },

  methods: {
    changeBar(val) {
      this.nav_bar.map(item => {
        item.class = "";
      });
      val.class = "act";
    },

    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/about_me.scss";
</style>
