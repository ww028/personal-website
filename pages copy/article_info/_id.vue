<template>
  <main>
    <div class="main_container">
      <!-- <div class="main_container"> -->
      <!-- <div class="m_title">相关的文章</div> -->
      <!-- :class="mobil_menu ? 'menu_open' : 'menu_close'" -->
      <div class="content_box">
        <div class="aside" :class="mobil_menu_class">
          <div class="breadcrumb">
            <nuxt-link :to="{name: 'home' }">首页</nuxt-link>
            <div>&lt;</div>
            <div>文章详情</div>
          </div>
          <div class="type_title">{{ type_title }}</div>

          <div v-for="item in article_list" :key="item.id" class="item">
            <nuxt-link
              :to="{name: 'article_info-id', params: {id: `${item.type}-${item.id}-${type_title}`}}"
            >{{ item.title }}</nuxt-link>
          </div>
        </div>
        <div class="article_info">
          <div class="article_title">{{ article_title }}</div>
          <div class="article_content" v-html="content" @click="mobil_menu_class = 'menu_close'"></div>
          <div class="bottom_nav">
            <nuxt-link
              v-if="pre.id"
              class="pre"
              :to="{name: 'article_info-id', params: {id: `${pre.type}-${pre.id}-${type_title}`}}"
            >上一篇 《{{ pre.title }}》</nuxt-link>
            <div v-else>&emsp;</div>
            <nuxt-link
              v-if="next.id"
              class="next"
              :to="{name: 'article_info-id', params: {id: `${next.type}-${next.id}-${type_title}`}}"
            >下一篇 《{{ next.title }}》</nuxt-link>
          </div>
        </div>
      </div>

      <div class="float_menu">
        <i class="el-icon-more" @click="showMenu"></i>
      </div>
    </div>
  </main>
</template>

<script>
import * as api from '@/api'
export default {
  data() {
    return {
      loading: false,
      article_title: '',
      mobil_menu_class: '',
      mobil_menu: false
    }
  },

  asyncData({ store, error, params }) {
    /**
     * params: type-id-title
     */
    let type = params.id.split('-')[0]
    let id = params.id.split('-')[1]
    let title = params.id.split('-')[2]
    return Promise.all([
      api.typeArticleList({ type: type }),
      api.articleContent({ id: id, type: type })
    ])
      .then(arr => {
        return {
          article_list: arr[0].data,
          type_title: title,
          article_title: arr[1].data[0].title,
          content: arr[1].data[0].content,
          pre: arr[1].pre,
          next: arr[1].next
        }
      })
      .catch(error)
  },

  methods: {
    showMenu() {
      this.mobil_menu_class = 'menu_open'
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  color: #fff;
  padding: 0;
}

.float_menu {
  display: none;
}

.breadcrumb {
  margin-bottom: 10px;
}

.content_box {
  display: flex;
  font-size: 14px;

  .aside {
    width: 200px;
    height: calc(100vh - 60px);
    border-right: solid 1px rgb(100, 94, 85);
    padding: 10px;

    .type_title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
    }

    .item {
      cursor: pointer;
      height: 24px;
      line-height: 24px;
    }
  }

  .article_info {
    width: 0;
    flex-grow: 1;
    height: calc(100vh - 60px);
    padding: 10px;
    overflow: auto;

    .article_title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
    }
  }

  .bottom_nav {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
}

@media screen and (max-width: 1000px) {
  .float_menu {
    display: block;
    position: fixed;
    right: 0.2rem;
    top: 1.2rem;
    font-size: 0.3rem;
  }

  .content_box {
    width: 100%;
    position: relative;
    .aside {
      position: absolute;
      left: -5rem;
      background-color: #000;
      // display: none;
    }

    .bottom_nav {
      width: 100%;
    }
  }

  .menu_open {
    animation: menu_open 0.2s forwards;
  }

  .menu_close {
    animation: menu_close 0.2s forwards;
  }

  @keyframes menu_open {
    from {
      left: -5rem;
    }
    to {
      left: 0;
    }
  }

  @keyframes menu_close {
    from {
      left: 0;
    }
    to {
      left: -5rem;
    }
  }
}
</style>

<style lang="scss">
.article_content {
  line-height: 24px;
  // > p,
  // > div {
  //   width: 600px;
  // }

  pre {
    // width: 600px;
    width: fit-content;
    background-color: #000;
    padding: 10px;
  }
}

@media screen and (max-width: 1000px) {
  .article_content {
    > p,
    > div {
      width: 100%;
    }

    pre {
      width: fit-content;
      background-color: #000;
      padding: 0.2rem;
    }
  }
}
</style>
