<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" :comments="lineChartData.commenttotal" :moments="lineChartData.momenttotal"></panel-group>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChart"></line-chart> 
    </el-row>
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";

import { getIndex } from "@/api/add";
 
export default {
  name: "dashboard-admin",
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      lineChartData: [],
      lineChart: []
    };
  },
  mounted() {
    getIndex()
      .then(res => {
        console.log(res);
        this.lineChartData = res.data
        this.lineChart = this.lineChartData.monthmomentchange
        console.log(this.lineChart);
        
      })
      .catch(e => {});
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChart = this.lineChartData[type];
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
