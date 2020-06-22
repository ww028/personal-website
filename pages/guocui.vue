<template>
  <main>
    <div class="filter">
      <el-radio-group v-model="radio1" size="mini">
        <el-radio label="1" border>劳动列表</el-radio>
        <el-radio label="2" border>韭菜</el-radio>
        <el-radio label="3" border>图表统计</el-radio>
      </el-radio-group>
    </div>

    <!-- 劳动列表 -->
    <el-table v-show="radio1 == 1" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" align="center" label="劳动轮次"></el-table-column>
      <el-table-column prop="members" align="center" label="劳动人员" width="220px"></el-table-column>
      <el-table-column prop="start_time" align="center" label="开始时间"></el-table-column>
      <el-table-column prop="end_time" align="center" label="结束时间"></el-table-column>
      <el-table-column prop="total_time" align="center" label="劳动时长(分钟)"></el-table-column>
      <el-table-column prop="out_put" align="center" label="劳动产出"></el-table-column>
      <el-table-column prop="tax" align="center" label="扣税"></el-table-column>
      <el-table-column type="expand" label="收获明细" width="200px">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <div v-for="(item, index) in props.row.game_info" :key="index" class="items">
              <div>
                <span v-if="item.num > -1">收割者:</span>
                <span v-else>韭菜:</span>
                {{item.name}}
              </div>

              <div>
                <span v-if="item.num > -1">收获:</span>
                <span v-else>被割:</span>
                {{item.num}}
              </div>
            </div>
          </el-form>
        </template>
      </el-table-column>
    </el-table>

    <!-- 韭菜列表 -->
    <el-table
      v-show="radio1 == 2"
      :data="tableDataMembers"
      stripe
      style="width: 100%"
      :default-sort="{prop: 'total_count', order: 'descending'}"
    >
      <el-table-column prop="name" align="center" label="昵称"></el-table-column>
      <el-table-column prop="total_count" sortable align="center" label="劳动次数"></el-table-column>
      <el-table-column prop="win_count" sortable align="center" label="收割次数"></el-table-column>
      <el-table-column prop="lose_count" sortable align="center" label="被收割次数"></el-table-column>
      <el-table-column prop="win_rate" sortable align="center" label="收割率(%)"></el-table-column>
      <el-table-column prop="total_time" sortable align="center" label="累计劳动时长(分钟)"></el-table-column>
      <el-table-column prop="total_num" sortable align="center" label="个人劳动所得"></el-table-column>
      <el-table-column prop="contribution_total" sortable align="center" label="基础建设积分"></el-table-column>
    </el-table>

    <!-- 图表统计 -->
    <div class="chart" v-show="radio1 == 3">
      <div class="my_chart">
        <div id="my_chart"></div>
      </div>

      <!-- 个人收获走势 -->
      <div class="my_chart1">
        <el-select
          v-model="player"
          placeholder="请选择玩家"
          value-key="id"
          size="mini"
          @change="changePlayer"
        >
          <el-option v-for="item in tableDataMembers" :key="item.id" :label="item.name" :value="item"></el-option>
        </el-select>
        <div id="my_chart1"></div>
      </div>
    </div>
  </main>
</template>

<script>
import * as api from "@/api";
export default {
  data() {
    return {
      player: "",
      radio1: "1"
    };
  },

  asyncData({ store, error, params }) {
    return Promise.all([api.GameList(), api.memberList({ count: "count" })])
      .then(arr => {
        return {
          tableData: arr[0].data,
          tableDataMembers: arr[1].data
        };
      })
      .catch(error);
  },

  watch: {
    radio1(val, oldVal) {
      if (val == 3) {
        this.chartsInit();
        this.chartsLineInit(this.tableDataMembers[0]);
      }
    }
  },

  mounted() {
    this.chartsInit();
    this.chartsLineInit(this.tableDataMembers[0]);
  },

  methods: {
    changePlayer(val) {
      console.log(val);
      this.chartsLineInit(val);
    },

    chartsLineInit(val) {
      console.log(val);
      let my_chart = this.$echarts.init(document.getElementById("my_chart1"));
      let legend = [];
      let x_data = [];
      let y_data = [
        {
          name: val.name,
          type: "line",
          stack: "总量",
          data: val.game_history.split(",")
        }
      ];

      for (let i = 0; i < val.total_count; i++) {
        x_data.push(`第${i + 1}次`);
      }

      my_chart.setOption({
        title: {
          text: "个人走势"
        },
        tooltip: {
          trigger: "axis"
        },

        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: x_data
        },
        yAxis: {
          type: "value"
        },
        series: y_data
      });
    },

    chartsInit() {
      let my_chart = this.$echarts.init(document.getElementById("my_chart"));
      let xAxisData = [];
      let y_data = [];

      this.tableDataMembers.map(item => {
        xAxisData.push(item.name);
        y_data.push(item.total_num);
      });

      my_chart.setOption({
        title: {
          text: "累计收获"
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false
          }
        },
        yAxis: {},
        series: [
          {
            name: "累计收获",
            type: "bar",
            data: y_data,
            barWidth: 15, //柱图宽度
            barGap: "10%", //柱图间距
            itemStyle: {
              normal: {
                color: function(params) {
                  const colorList = [
                    "#3398db",
                    "#434348",
                    "#90ed7d",
                    "#f7a35c",
                    "#61a0a8",
                    "#61a0a8",
                    "#91c7ae",
                    "#2f4554",
                    "#3398db",
                    "#434348",
                    "#90ed7d",
                    "#f7a35c",
                    "#61a0a8",
                    "#61a0a8",
                    "#91c7ae"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            },
            animationDelay: function(idx) {
              return idx * 10 + 100;
            }
          }
        ],
        animationEasing: "elasticOut",
        animationDelayUpdate: function(idx) {
          return idx * 5;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  width: 1500px;
}

.filter {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
}

.chart {
  width: 100%;
  .my_chart,
  .my_chart1 {
    width: 100%;
    height: 500px;
    padding: 10px;
    background-color: #fff;
  }

  #my_chart {
    width: 100%;
    height: 500px;
  }

  .my_chart1 {
    margin-top: 10px;
  }

  #my_chart1 {
    width: 100%;
    height: 450px;
  }

  .el-select {
    position: absolute;
    right: 10px;
    z-index: 999;
  }
}
</style>
