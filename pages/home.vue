<template>
  <main>
    <div class="main_container">
      <div class="content_box">
        <div class="m_title">最近的文章</div>
        <div class="article_list">
          <div v-for="item in article" :key="item.id" class="item">
            <div>
              <span>[{{item.type_name}}]</span>
              <nuxt-link :to="{name: 'article_info' }">{{ item.title }}</nuxt-link>
            </div>
            <div>{{item.created_time}}</div>
          </div>
        </div>
        <nuxt-link :to="{path: '/article' }">查看更多文章</nuxt-link>

        <MsgBoard />
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
        <div>
          <p>邮箱：wwjobs@163.com</p>
          <p>
            微博:
            <a
              target="blank"
              href="https://weibo.com/7413652268/profile?rightmod=1&wvr=6&mod=personinfo&is_all=1"
            >考拉在华清池买橘子</a>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import MsgBoard from '@/components/MsgBoard'
export default {
  components: {
    MsgBoard
  },
  data() {
    return {
      article: [
        {
          id: 1,
          title: '测试文章',
          type_name: 'code',
          created_time: '2020/03/15'
        },
        {
          id: 2,
          title: '测试文章',
          type_name: 'code',
          created_time: '2020/03/15'
        },
        {
          id: 3,
          title: '测试文章',
          type_name: 'code',
          created_time: '2020/03/15'
        },
        {
          id: 4,
          title: '测试文章',
          type_name: 'code',
          created_time: '2020/03/15'
        },
        {
          id: 5,
          title: '测试文章',
          type_name: 'code',
          created_time: '2020/03/15'
        },
        {
          id: 6,
          title: '测试文章',
          type_name: 'code',
          created_time: '2020/03/15'
        },
        {
          id: 7,
          title: '测试文章',
          type_name: 'code',
          created_time: '2020/03/15'
        },
        {
          id: 8,
          title: '测试文章',
          type_name: 'code',
          created_time: '2020/03/15'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/home.scss';
</style>