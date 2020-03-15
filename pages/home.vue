<template>
  <main>
    <div class="main_container">
      <div class="title">W 的博客</div>

      <div class="main_content">
        <div class="content_box">
          <div class="article_list">
            <div v-for="item in article" :key="item.id" class="item">
              <div>
                <span>[{{item.type_name}}]</span>
                <nuxt-link :to="{name: 'article_info' }">{{ item.title }}</nuxt-link>
              </div>
              <div>{{item.created_time}}</div>
            </div>
          </div>
        </div>
        <div class="info">
          info
          </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      article: [
        {
          id: 1,
          title: "测试文章",
          type_name: "code",
          created_time: "2020/03/15"
        },{
          id: 2,
          title: "测试文章",
          type_name: "code",
          created_time: "2020/03/15"
        },{
          id: 1,
          title: "测试文章",
          type_name: "code",
          created_time: "2020/03/15"
        }
      ]
    };
  }
};
</script>