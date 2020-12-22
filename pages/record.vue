<!--
 * @Author: 魏微
 * @Date: 2020-12-22 17:22:29
 * @LastEditTime: 2020-12-22 18:44:52
 * @FilePath: /personal-website/pages/record.vue
-->
<template>
  <div class="record">
    <div class="type-list">
      <div v-for="(item, index) in typeList"
           :key="index"
           class="item">
        {{ item.name }}
      </div>
      <div class="item add">+</div>
    </div>

    <div class="list">
      <div v-for="(item, index) in list"
           :key="index"
           class="item">
        <div class="list_head">
          {{ item.date }}
        </div>
        <div class="list_body">
          <div v-for="(sub_item, sub_index) in item.data"
               :key="sub_index"
               class="sub_item">
            <p> {{ sub_item.typeName}} </p>
            <p class="value"> {{ sub_item.count}} </p>
            <p class="delete">
              <span>-</span>
            </p>
          </div>
        </div>
        <div class="list_foot">
          <!-- <div class="edit_box" v-if="item.edit">
            <input type="text">
            <input type="text">
          </div> -->
          <button v-if="!item.edit" @click="edit(item)">编辑</button>
          <button v-if="item.edit" @click="add(item)">添加</button>
          <button v-if="item.edit" @click="save(item)">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'record',
  data () {
    return {
      typeList: [
        { id: 1, name: '早餐' },
        { id: 2, name: '午餐' },
        { id: 3, name: '晚餐' },
      ],
      list: [
        {
          id: 1,
          edit: false,
          date: '2020-12-20',
          data: [
            { typeName: '早餐', count: 5 },
            { typeName: '午餐', count: 25 },
            { typeName: '晚餐', count: 15 },
          ]
        },
        {
          id: 2,
          edit: false,
          date: '2020-12-21',
          data: [
            { typeName: '早餐', count: 5 },
            { typeName: '午餐', count: 25 },
            { typeName: '晚餐', count: 15 },
          ]
        },
        {
          id: 3,
          edit: false,
          date: '2020-12-22',
          data: [
            { typeName: '早餐', count: 5 },
            { typeName: '午餐', count: 25 },
            { typeName: '晚餐', count: 15 },
          ]
        }
      ]
    }
  },

  methods:{
    edit(val){
      console.log(val)
      val.edit = true
    }
  }
}
</script>

<style lang="scss" scoped>
.record {
  font-size: 0.2rem;
  padding: 0.2rem;
}

.type-list {
  display: flex;

  .item {
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    border-radius: 50%;
    background-color: lightblue;
    margin-right: 0.2rem;
  }

  .add {
    background-color: #fff;
    font-size: 0.4rem;
  }
}

.list {
  margin-top: 0.2rem;

  .item {
    margin-bottom: 0.2rem;
    border-radius: 0.08rem;
    background-color: #fff;

    .list_head {
      border-bottom: solid 1px #000;
      padding: 0.1rem 0.2rem;
    }

    .list_body {
      padding: 0.1rem 0.2rem;

      .sub_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.6rem;
        line-height: 0.6rem;
        border-bottom: dashed 1px lightgray;

        .value{
          width: 0;
          flex-grow: 1;
          font-size: 0.3rem;
          font-weight: bold;
          text-align: right;
        }

        .delete{
          width: 0.8rem;
          text-align: center;
          
          span{
            display: inline-block;
            width: 0.3rem;
            height: 0.3rem;
            text-align: center;
            line-height: 0.3rem;
            border: solid 1px #000;
            border-radius: 50%;
          }
        }
      }
    }

    .list_foot{
      padding: 0.1rem 0.2rem;
      text-align: right;

      .edit_box{
        margin-bottom: 0.2rem;
      }
      button{
        font-size: 0.14rem;
        width: 1rem;
        height: 0.4rem;
      }
    }
  }
}
</style>