  <template>
  <main>
    <div class="filter">
      <el-radio-group v-model="radio1" size="mini">
        <el-radio label="1" border>劳动列表</el-radio>
        <el-radio label="2" border>韭菜</el-radio>
        <el-radio label="3" border>累计收获图表</el-radio>
      </el-radio-group>
    </div>

    <!-- 比赛列表 -->
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

    <!-- 成员列表 -->
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

    <!-- 累计收获概览 -->
    <div class="chart" v-show="radio1 == 3">
      <div id="my_chart"></div>
    </div>

    <!-- 个人收获走势 -->
    <!-- <div class="chart personal_chart" v-show="radio1 == 3">
      <div id="personal_chart"></div>
    </div> -->
  </main>
</template>

  <script>
import * as api from "@/api";
export default {
  data() {
    return {
      radio1: "1"
    };
  },

  asyncData({ store, error, params }) {
    return Promise.all([api.GameList(), api.memberList({ count: "count" })])
      .then(arr => {
        console.log(JSON.stringify(arr))
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
        // this.personalChartInit();
      }
    }
  },

  mounted() {
    // console.log('mounted')
    // api.GameList().then(res =>{
    //   console.log(res)
    // })
    this.chartsInit();
    // api.dataAnalysisEdit({
    //   w_ip: returnCitySN['cip'],
    //   w_city: returnCitySN['cname'],
    //   page: '国粹',
    // })
  },

  methods: {
    // personalChartInit() {
    //   console.log(this.tableDataMembers)
    //   // 找到容器
    //   let personal_chart = this.$echarts.init(
    //     document.getElementById("personal_chart")
    //   );
    //   personal_chart.setOption({
    //     title: {
    //       text: "折线图堆叠"
    //     },
    //     tooltip: {
    //       trigger: "axis"
    //     },
    //     legend: {
    //       data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
    //     },
    //     grid: {
    //       left: "3%",
    //       right: "4%",
    //       bottom: "3%",
    //       containLabel: true
    //     },
    //     toolbox: {
    //       feature: {
    //         saveAsImage: {}
    //       }
    //     },
    //     xAxis: {
    //       type: "category",
    //       boundaryGap: false,
    //       data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    //     },
    //     yAxis: {
    //       type: "value"
    //     },
    //     series: [
    //       {
    //         name: "邮件营销",
    //         type: "line",
    //         stack: "总量",
    //         data: [120, 132, 101, 134, 90, 230, 210]
    //       },
    //       {
    //         name: "联盟广告",
    //         type: "line",
    //         stack: "总量",
    //         data: [220, 182, 191, 234, 290, 330, 310]
    //       },
    //       {
    //         name: "视频广告",
    //         type: "line",
    //         stack: "总量",
    //         data: [150, 232, 201, 154, 190, 330, 410]
    //       },
    //       {
    //         name: "直接访问",
    //         type: "line",
    //         stack: "总量",
    //         data: [320, 332, 301, 334, 390, 330, 320]
    //       },
    //       {
    //         name: "搜索引擎",
    //         type: "line",
    //         stack: "总量",
    //         data: [820, 932, 901, 934, 1290, 1330, 1320]
    //       }
    //     ]
    //   });
    // },

    chartsInit() {
      // 找到容器
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
            barGap: "20%", //柱图间距
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
  background-color: #fff;
  height: 600px;
  width: 100%;
  padding: 10px;
  #my_chart {
    width: 1400px;
    height: 600px;
    margin: 0 auto;
  }

  #personal_chart {
    width: 1400px;
    height: 600px;
    margin: 0 auto;
  }
}

.personal_chart{
  margin-top: 20px;
}
</style>