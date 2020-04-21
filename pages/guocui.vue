  <template>
  <main>
    <div class="filter">
      <el-radio-group v-model="radio1" size="mini">
        <el-radio label="1" border>比赛</el-radio>
        <el-radio label="2" border>玩家</el-radio>
        <el-radio label="3" border>累计收获图表</el-radio>
      </el-radio-group>
    </div>

    <!-- 比赛列表 -->
    <el-table v-show="radio1 == 1" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" align="center" label="劳动轮次"></el-table-column>
      <el-table-column prop="members" align="center" label="劳动人员"></el-table-column>
      <el-table-column prop="start_time" align="center" label="开始时间"></el-table-column>
      <el-table-column prop="end_time" align="center" label="结束时间"></el-table-column>
      <el-table-column prop="game_time" align="center" label="劳动时长(分钟)"></el-table-column>
      <el-table-column prop="product_integral" align="center" label="劳动产出"></el-table-column>
      <el-table-column prop="reduce_integral" align="center" label="扣税"></el-table-column>
      <el-table-column type="expand" label="收获明细" width="200px">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <div
              v-for="(item, index) in props.row.members_info"
              :key="index"
              class="items"
            >
              <div>
                <span  v-if="props.row.members_info[index].integral > 0">
                  收割者:
                </span>
                <span v-else-if="props.row.members_info[index].integral < 0">
                  韭菜:
                </span>
                <span v-else>
                  白劳动:
                </span>
                {{ props.row.members_info[index].user_name }}
              </div>

              <div>
                收获: {{ props.row.members_info[index].integral }}
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
      :default-sort="{prop: 'count', order: 'descending'}"
      style="width: 100%"
    >
      <el-table-column prop="user_name" align="center" label="昵称"></el-table-column>
      <el-table-column prop="count" sortable align="center" label="劳动次数"></el-table-column>
      <el-table-column prop="win_count" sortable align="center" label="收割次数"></el-table-column>
      <el-table-column prop="lose_count" sortable align="center" label="被收割次数"></el-table-column>
      <el-table-column prop="win_odds" sortable align="center" label="收割率"></el-table-column>
      <el-table-column prop="total_game_time" sortable align="center" label="累计劳动时长(分钟)"></el-table-column>
      <el-table-column prop="integral" sortable align="center" label="个人劳动所得"></el-table-column>
      <el-table-column prop="commission" sortable align="center" label="基础建设积分"></el-table-column>
    </el-table>
    <div class="chart" v-show="radio1 == 3">
      <div id="myChart"></div>
    </div>
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
    return Promise.all([api.GameList(), api.memberList()])
      .then(arr => {
        return {
          tableData: arr[0].data,
          tableDataMembers: arr[1].data
        };
      })
      .catch(error);
  },

  // mounted() {
  //   this.chartsInit();
  // },

  watch: {
    radio1(val, oldVal) {
      if (val == 3) {
        this.chartsInit();
      }
    }
  },

  mounted(){
    api.dataAnalysisEdit({
      w_ip: returnCitySN['cip'],
      w_city: returnCitySN['cname'],
      page: '国粹',
    })
  },

  methods: {
    chartsInit() {
      // 找到容器
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let xAxisData = [];

      let y_data = [];

      this.tableDataMembers.map(item => {
        xAxisData.push(item.user_name);
        y_data.push(item.integral);
      });

      myChart.setOption({
        title: {
          text: "累计收获"
        },
        // toolbox: {
        //   feature: {
        //     magicType: {
        //       type: ["stack", "tiled"]
        //     },
        //     dataView: {},
        //     saveAsImage: {
        //       pixelRatio: 2
        //     }
        //   }
        // },
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
                    "#2f4554"
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
  height: 700px;
  width: 100%;
  padding: 10px;
  #myChart {
    width: 1400px;
    height: 700px;
    margin: 0 auto;
  }
}
</style>