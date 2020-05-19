<template>
  <main>
    <div>抽奖</div>
    <button>开始</button>
    <div class="lucky_box">
      <div
        v-for="item in list"
        :key="item.id"
        class="item"
        :class="item.class"
        @click="start(item)"
      >{{item.name}}</div>
    </div>
    <div>
      <div>
        恭喜你！获得了：<span>{{reward_text}}</span>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  name: "lucky_draw",
  data() {
    return {
      list: [],
      index: 0,
      turn_index: [0, 1, 2, 5, 8, 7, 6, 3],
      trun_time: 100,
      turn_circle: 0,
      reward_id: 6,
      reward_text: ''
    };
  },

  mounted() {
    this.getData().then(res => {
      this.list = res;
    });
  },

  methods: {
    start(val) {
      if (val.id < 0) {
        console.log("val");
        this.startTurn()
      }
    },

    startTurn() {
      this.index++
      this.trun_time += 20

      let timer = setTimeout(() => {
        this.startTurn()
      }, this.trun_time);

      if(this.index > 7){
        this.index = 0
        this.turn_circle ++
      }

      this.list[this.turn_index[this.index]].class = 'act'
      if(this.index > 0){
        this.list[this.turn_index[this.index-1]].class = ''
      } else {
        this.list[this.turn_index[7]].class = ''
      }

      if(this.turn_circle > 0 && this.list[this.turn_index[this.index]].id == this.reward_id){
        this.reward_text = this.list[this.turn_index[this.index]].name 
        clearTimeout(timer)
      }
    },

    async getData() {
      let data = [];
      for (let i = 0; i < 8; i++) {
        data.push({ id: i + 1, name: `item-${i + 1}`, class: "" });
      }
      let btn = { id: -1, name: "开始" };
      data.splice(4, 0, btn);
      data[0].class = "act";
      return data;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/lucky_draw.scss";
</style>
