  <template>
  <main>
    <div class="filter">
      <el-radio-group v-model="radio1" size="mini">
        <el-radio label="1" border>比赛</el-radio>
        <el-radio label="2" border>人员</el-radio>
        <el-radio label="3" border>图表</el-radio>
      </el-radio-group>
    </div>

    <el-table v-show="radio1 == 1" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="term" align="center" label="比赛轮次"></el-table-column>
      <el-table-column prop="person" align="center" label="参赛人员"></el-table-column>
      <el-table-column prop="time" align="center" label="比赛时间"></el-table-column>
    </el-table>

    <el-table v-show="radio1 == 2" :data="tableDataMembers" stripe style="width: 100%">
      <el-table-column prop="nick_name" align="center" label="昵称"></el-table-column>
      <el-table-column prop="count" align="center" label="参赛次数"></el-table-column>
      <el-table-column prop="integral" align="center" label="累计积分"></el-table-column>
    </el-table>

    <div class="chart" v-show="radio1 == 3">
      <div id="myChart"></div>
    </div>
  </main>
</template>

  <script>
export default {
  data() {
    return {
      radio1: "3",
      tableData: [
        { term: "1", person: "张三、李四、王二麻子、赵五", time: "2020-04-17" },
        { term: "1", person: "张三、李四、王二麻子、赵五", time: "2020-04-17" },
        { term: "1", person: "张三、李四、王二麻子、赵五", time: "2020-04-17" },
        { term: "1", person: "张三、李四、王二麻子、赵五", time: "2020-04-17" },
        { term: "1", person: "张三、李四、王二麻子、赵五", time: "2020-04-17" },
        { term: "1", person: "张三、李四、王二麻子、赵五", time: "2020-04-17" },
        { term: "1", person: "张三、李四、王二麻子、赵五", time: "2020-04-17" },
        { term: "1", person: "张三、李四、王二麻子、赵五", time: "2020-04-17" },
        { term: "1", person: "张三、李四、王二麻子、赵五", time: "2020-04-17" },
      ],
      tableDataMembers: [
        {
          nick_name: "张三",
          count: "1",
          integral: "100"
        }
      ]
    };
  },

  mounted() {
    this.echartsInit();
  },

  methods: {
    echartsInit() {
      // 找到容器
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 开始渲染
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: [
            "参赛次数",
            "累计积分",
          ]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["洪恩", "向毅", "吴彦祖","贝夫", "彦宇", "账灏", "王威", "杨骁", "世林", "熊萍", "秀峰", "ST路人丙", "ST路人乙", "*ST路人丁", "*ST路人丑",]
          }
        ],
        yAxis:{
          type: "value",
        },
        series: [
          {
            name: "参赛次数",
            barWidth : 15,//柱图宽度
            barGap: "20%",//柱图间距
            type: "bar",
            data: [320, 332, 301, 334, 390, 390, 330, 320, 320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "累计积分",
            barWidth : 15,//柱图宽度
            barGap: "20%",//柱图间距
            type: "bar",
            stack: "广告",
            data: [120, 132, 101, 134, 90, 390, 230, 210, 320, 332, 301, 334, 390, 330, 320]
          },
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
main{
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
  #myChart {
    width: 1400px;
    height: 600px;
    margin: 0 auto;
  }
}
</style>