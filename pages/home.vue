<template>
  <main>
    <div class="main_container">
      <div class="content_box">
        <div class="m_title">最近的文章</div>
        <div class="article_list">
          <div v-for="item in article" :key="item.id" class="item">
            <div>
              <span>[{{item.type_name}}]</span>
              <!-- <nuxt-link :to="{name: 'article_info' }">{{ item.title }}</nuxt-link> -->
              <nuxt-link
                :to="{name: 'article_info-id', params: {id: item.id, from: 'article' }}"
              >{{ item.title }}</nuxt-link>
            </div>
            <div>{{item.publish_time}}</div>
          </div>
        </div>
        <nuxt-link v-if="false" :to="{path: '/article' }">查看更多文章</nuxt-link>

        <MsgBoard type="1" />
      </div>
      <div class="info">
        <div class="m_title">关于 W 的博客:</div>
        <div class="info_content">
          <p>我会在这里分享 web前端开发技术，读书笔记等内容，后期应还会增加更富的内容。</p>
          <p>建立这个网站的初衷是为了实践自己所掌握的技术，以及有一个可以做笔记的地方。</p>
          <p>希望我所写的内容可以帮到大家吧，有问题的同学可以留言，或者发邮件给我，下面会有联系方式。</p>
          <p>我所发布的内容有误之处，还请不吝赐教。</p>
        </div>

        <div class="m_title">联系方式:</div>
        <div class="connect">
          <p>邮箱：wwjobs@163.com</p>
          <p>
            微博:
            <a
              target="blank"
              href="https://weibo.com/7413652268/profile?rightmod=1&wvr=6&mod=personinfo&is_all=1"
            >考拉在华清池买橘子</a>
          </p>
        </div>

        <div class="m_title">数据统计</div>
        <div>

          <p>今日访问次数： {{ data_col.today_total }}</p>
          <p>今日访问人数： {{ data_col.today_total_person }}</p>
          <p>历史访问次数： {{ data_col.total }}</p>
          <p>历史访问人数： {{ data_col.total_person }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import * as api from '@/api'
import MsgBoard from '@/components/MsgBoard'
export default {
  components: {
    MsgBoard
  },
  data() {
    return {
      data_col: {}
      // article: []
    }
  },

  asyncData({ store, error, params }) {
    return Promise.all([
      api.articleList({ type: 0, pageNo: 1, pageSize: 7 }),
      api.dataCol({ page: 'home' }),
      api.dataColList()
    ])
      .then(arr => {
        return {
          article: arr[0].data || [],
          data_col: arr[2].data
        }
      })
      .catch(error)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/home.scss';
</style>