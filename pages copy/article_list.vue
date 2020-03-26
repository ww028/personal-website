<template>
  <main>
    <div class="main_container">
      <div class="breadcrumb">
        <nuxt-link :to="{name: 'home' }">首页</nuxt-link>
        <div>&lt;</div>
        <div>文章列表</div>
      </div>

      <div class="article_list">
        <div
          v-for="item in article"
          :key="item.id"
          class="item"
        >
          <div class="info">
            <div class="type_name">[{{item.type_name}}]</div>
          </div>
          <div class="title">
            <nuxt-link
              :to="{name: 'article_info-id', params: {id: `${item.type}-${item.id}-${item.type_name}`}}"
            >{{ item.title }}</nuxt-link>
          </div>
          <div class="preview">
            {{ item.preview }}
          </div>
          <div class="tiem_info">
            <div>发布时间: {{item.edit_time }} </div>
            <div>最后编辑时间: {{item.edit_time }} </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import * as api from '@/api'
export default {
  asyncData({ store, error, params }) {
    return Promise.all([
      api.articleListNew({ pageNo: 1, pageSize: 5 }),
    ])
      .then(arr => {
        console.log(arr[0])
        return {
          article: arr[0].data,
          article_total: arr[0].total,
        }
      })
      .catch(error)
  }
}
</script>

<style lang="scss" scoped>
.article_list{
  margin-top: 10px;

  .item{
    border-bottom: solid 1px #DCDFE6;
    padding: 10px;

    .title{
      margin: 5px 0;
      a{
        font-size: 18px;
      }
    }
    
    .info,
    .tiem_info,
    .preview{
      font-size: 14px;
      color: #909399;
    }

    .tiem_info{
      display: flex;
      justify-content: flex-end;

      >div{
        margin-left: 10px;
      }
    }
  }
}
</style>