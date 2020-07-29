<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from "echarts";
import "echarts/lib/chart/map";
import "echarts/map/js/china.js";
require("echarts/map/js/china.js"); // 引入中国地图组件
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "500px"
    },
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.initChart(val);
      }
    }
  },
  mounted() {
    this.initChart(this.chartData);
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener("resize", this.__resizeHandler);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener("resize", this.__resizeHandler);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart(val) {
      this.chart = echarts.init(this.$el, "macarons");
      if (val) {
        this.chart.setOption(
          {
            title: {
              subtext: "性别比例", 
            },
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} :  ({d}%)"
            },
            toolbox: {
              feature: { 
                saveAsImage: {}
              }
            }, 
            calculable: true,
            series: [
              {
                name: "用户性别比例",
                type: "pie",
                // roseType: "radius",
                radius: [0, 100],
                center: ["50%", "50%"],
                data: this.chartData.data,
                animationEasing: "cubicInOut",
                animationDuration: 800
              }
            ]
          },
          true
        );
      }
    }
  }
};
</script>
