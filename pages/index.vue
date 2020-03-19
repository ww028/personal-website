<template>
  <main>
    <div class="welcome">
      <div class="moon"></div>
      <div class="content">
        <div class="title"></div>
        <div class="introduce"></div>
        <div class="loading">
          <div class="dot" v-for="(item, index) in dot" :key="index" @click="start">{{ item.label }}</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import * as api from '@/api'
export default {
  data() {
    return {
      title: '你好啊，欢迎来到 W 的博客',
      introduce:
        '我将会在这里分享一些 web前端开发技术，读书笔记等内容，希望您会感兴趣。',
      dot: [
        { label: 'S' },
        { label: 'T' },
        { label: 'A' },
        { label: 'R' },
        { label: 'T' }
      ]
    }
  },

  // asyncData({ store, error, params }) {
  //   console.log(getUnixTime())
  //   return Promise.all([api.dataCol({ type: 0, pageNo: 1, pageSize: 7 })])
  //     .then(arr => {
  //       console.log(arr[0].data)
  //       return {
  //         article: arr[0].data || []
  //       }
  //     })
  //     .catch(error)
  // },

  mounted() {
    api.dataCol({page: 'index'})
    this.textPlay('.title', this.title)
    setTimeout(() => {
      this.textPlay('.introduce', this.introduce)
    }, 1500)
  },

  methods: {
    start() {
      this.$router.push('/home')
    },

    textPlay(dom, text) {
      let landInTexts = document.querySelectorAll(dom)
      console.log(landInTexts)
      landInTexts.forEach(landInText => {
        let letters = text.split('')
        landInText.textContent = ''
        letters.forEach((letter, i) => {
          let span = document.createElement('span')
          span.textContent = letter
          span.style.animationDelay = `${i * 0.09}s`
          landInText.append(span)
        })
      })
    }
  }
}
</script>
