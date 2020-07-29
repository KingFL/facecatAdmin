<template>
  <div class="dashboard-editor-container">
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-col :xs="24" :sm="24" :lg="12">
        <pie-chart :chart-data="totalCount.sexcount"></pie-chart>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <bar-chart :title="'猫咪动态'" :chart-data="totalCount.catcount"></bar-chart>
      </el-col>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-col :xs="24" :sm="24" :lg="24">
        <bar-chart :title="'位置动态'" :chart-data="totalCount.locationcount"></bar-chart>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getcatAnalyse } from "@/api/add";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
export default {
  components: {
    PieChart,
    BarChart
  },
  data() {
    return {
      totalCount: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getcatAnalyse()
        .then(res => {
          console.log(res);
          this.totalCount = res.data;
        })
        .catch(e => {});
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
