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
      default: "400px"
    },
    chartData: {
      type: Object
    },
    title: { 
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

      if (!val) return;
      let option = {
        title: {
          text: this.title
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          padding: [5, 10]
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            }, 
            saveAsImage: {}
          }
        },
        grid: {
          top: 50,
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          data: val.labels,
          axisLabel: {
            align: "center",
            inside: false,
            textStyle: {
              color: "#000"
            }
          }
          // z: 10
        },
        yAxis: {
          axisLine: {
            show: true
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            align: "center",
            inside: false,
            textStyle: {
              color: "#999"
            }
          }
        },
        dataZoom: [
          {
            type: "inside"
          }
        ],
        series: [
          {
            // For shadow
            type: "bar",
            itemStyle: {
              normal: { color: "rgba(0,0,0,0.05)" }
            },
            barGap: "-100%",
            barCategoryGap: "90%",
            animation: true
          },
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#83bff6" },
                  { offset: 0.5, color: "#188df0" },
                  { offset: 1, color: "#188df0" }
                ])
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" }
                ])
              }
            },
            data: val.values
          }
        ]
      };

      this.chart.setOption(option, true);
    }
  }
};
</script>
<style>

</style>

