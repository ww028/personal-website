<template>
  <main>
    <div class="filter">
      <el-radio-group v-model="radio1" size="mini">
        <el-radio label="1" border>劳动列表</el-radio>
        <el-radio label="2" border>韭菜</el-radio>
        <el-radio label="3" border>图表统计</el-radio>
      </el-radio-group>
      <div>
        <span>累计上税：{{ tax }}</span>
        &emsp;
        <span>剩余基金：{{ fund_total }}</span>
      </div>
    </div>

    <!-- 劳动列表 -->
    <el-table v-show="radio1 == 1" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" align="center" :width="60" label="轮次"></el-table-column>
      <el-table-column prop="game_name" align="center" label="劳动名称"></el-table-column>
      <el-table-column prop="members" align="center" :width="320" label="劳动人员"></el-table-column>
      <el-table-column prop="start_time" align="center" :width="150" label="开始时间"></el-table-column>
      <el-table-column prop="end_time" align="center" :width="150" label="结束时间"></el-table-column>
      <el-table-column prop="total_time" align="center" :width="120" label="劳动时长"></el-table-column>
      <el-table-column prop="out_put" align="center" :width="80" label="劳动产出"></el-table-column>
      <el-table-column prop="tax" align="center" :width="60" label="上税"></el-table-column>
      <el-table-column prop="money" align="center" :width="60" label="茶钱"></el-table-column>
      <el-table-column prop="fund_consume" align="center" :width="80" label="基金消耗"></el-table-column>
      <el-table-column prop="fund_in" align="center" :width="80" label="基金转存"></el-table-column>
      <el-table-column type="expand" label="收获明细" :width="80">
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
    <el-table v-show="radio1 == 2" :data="tableDataMembers" stripe style="width: 100%">
      <el-table-column prop="name" align="center" label="昵称"></el-table-column>
      <el-table-column prop="total_count" sortable align="center" label="劳动次数"></el-table-column>
      <el-table-column prop="win_count" sortable align="center" label="收割次数"></el-table-column>
      <el-table-column prop="lose_count" sortable align="center" label="被收割次数"></el-table-column>
      <el-table-column prop="win_rate" sortable align="center" label="收割率(%)"></el-table-column>
      <el-table-column prop="total_time" sortable align="center" label="劳动时长(分钟)"></el-table-column>
      <el-table-column prop="total_time_fomat" align="center" label="劳动时长"></el-table-column>
      <el-table-column prop="total_num" sortable align="center" label="个人劳动所得"></el-table-column>
      <el-table-column prop="contribution_total" sortable align="center" label="基础建设积分"></el-table-column>
    </el-table>

    <!-- 图表统计 -->
    <div class="chart" v-show="radio1 == 3">
      <div class="my_chart">
        <div id="my_chart"></div>
      </div>

      <!-- 单次走势图 -->
      <div class="my_chart1">
        <!-- <el-select
          v-model="player"
          placeholder="请选择玩家"
          value-key="id"
          size="mini"
          @change="changePlayer"
        >
          <el-option
            v-for="item in tableDataMembers"
            :key="item.id"
            :label="item.name"
            :value="item"
          ></el-option>
        </el-select>-->
        <div id="my_chart1"></div>
      </div>

      <!-- 累加走势图 -->
      <div class="my_chart1">
        <div id="my_chart2"></div>
      </div>
    </div>
  </main>
</template>

<script>
import * as api from "@/api";
import echarts from "echarts"; // 引入echarts
// import echarts from "@/plugins/echarts"
export default {
  data() {
    return {
      tax: 0,
      fund_total: 0,
      player: "",
      radio1: "1",
    };
  },

  asyncData({ store, error, params }) {
    return Promise.all([
      api.GameList(),
      api.memberList(),
      api.dataAnalysisEdit({
        page: "国粹",
      }),
    ])
      .then((arr) => {
        arr[0].data.map(item =>{
          let hour = Math.floor(item.total_time / 60 )
          let minutes = item.total_time % 60
          item.total_time = `${hour}小时 ${minutes}分钟`
        })

        arr[1].data.map(item =>{
          let day = Math.floor(item.total_time / 60 / 24)
          let hour = Math.floor(item.total_time % (60*24) / 60)
          let minutes = item.total_time % (60*24) % 60
          
          if(day){
            item.total_time_fomat = `${day}天 ${hour}小时 ${minutes}分钟`
          } else {
            item.total_time_fomat = `${hour}小时 ${minutes}分钟`
          }
        })
        return {
          tableData: arr[0].data,
          tableDataMembers: arr[1].data,
        };
      })
      .catch(error);
  },

  watch: {
    radio1(val, oldVal) {
      if (val == 3) {
        setTimeout(() => {
          this.chartsInit();
          this.chartsLineInit(this.tableDataMembers);
          this.chartsLineSumInit(this.tableDataMembers);
        });
      }
    },
  },

  mounted() {
    this.tableData.map((item) => {
      this.tax += Number(item.tax);
      this.fund_total += Number(item.fund_in);
      item.game_name = item.game_name || `第 ${item.id} 轮`;
    });
  },

  methods: {
    // changePlayer(val) {
    //   this.chartsLineInit(val);
    // },

    chartsLineInit(val) {
      let my_chart = echarts.init(document.getElementById("my_chart1"));
      let legend = {
        data: [],
        selected: {}
      };
      let x_data = [];
      let y_data = [];

      val.map((item, index) => {
        legend.data.push(item.name);
        if(index === 0){
          legend.selected[item.name] = true
        } else {
          legend.selected[item.name] = false
        }
        y_data.push({
          name: item.name,
          type: "line",
          data: item.game_history.split(","),
        });
      });

      for (let i = 0; i < this.tableData.length; i++) {
        x_data.push(`第${i + 1}次`);
      }

      console.log(legend)

      my_chart.setOption({
        title: {
          text: "单次走势图",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: legend,
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: x_data,
        },
        yAxis: {
          type: "value",
        },
        series: y_data,
      });

      my_chart.on("legendselectchanged", function(pamars){
        console.log(pamars)
      })
    },

    chartsLineSumInit(val) {
      let my_chart = echarts.init(document.getElementById("my_chart2"));
      let legend = {
        data: [],
        selected: {}
      };
      let x_data = [];
      let y_data = [];

      val.map((item, index) => {
        legend.data.push(item.name);
        if(index === 0){
          legend.selected[item.name] = true
        } else {
          legend.selected[item.name] = false
        }

        let game_history = item.game_history.split(",");
        let sum = 0;
        let arr = [];

        for (let i = 0; i < game_history.length; i++) {
          sum += Number(game_history[i]);
          arr.push(sum);
        }

        y_data.push({
          name: item.name,
          type: "line",
          data: arr,
        });
      });

      for (let i = 0; i < this.tableData.length; i++) {
        x_data.push(`第${i + 1}次`);
      }

      my_chart.setOption({
        title: {
          text: "累计走势图",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: legend,
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: x_data,
        },
        yAxis: {
          type: "value",
        },
        series: y_data,
      });
    },

    chartsInit() {
      let my_chart = echarts.init(document.getElementById("my_chart"));
      let xAxisData = [];
      let y_data = [];

      this.tableDataMembers.map((item) => {
        xAxisData.push(item.name);
        y_data.push(item.total_num);
      });

      my_chart.setOption({
        title: {
          text: "累计收获",
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false,
          },
        },
        yAxis: {},
        series: [
          {
            name: "累计收获",
            type: "bar",
            data: y_data,
            barWidth: 20, //柱图宽度
            barGap: "1%", //柱图间距
            itemStyle: {
              normal: {
                color: function (params) {
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
                    "#91c7ae",
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
            // animationDelay: function(idx) {
            //   return idx * 10 + 100;
            // }
          },
        ],
        animationEasing: "elasticOut",
        // animationDelayUpdate: function(idx) {
        //   return idx * 5;
        // }
      });
    },
  },
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
  display: flex;
  justify-content: space-between;
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

  #my_chart1,
  #my_chart2 {
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
