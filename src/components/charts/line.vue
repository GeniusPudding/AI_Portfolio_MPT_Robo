<template>
  <div class="LineChart">
    <apexchart :type="chartOptions.chart.type"
               :height="chartOptions.chart.height"
               :options="chartOptions"
               :series="series"></apexchart>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import VueApexCharts from "vue-apexcharts";
export default {
  name: "LineChart",
  props: ["seriesData", "titleY", "height", "tick"],
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {};
  },
  computed: {
    // ...mapState(["resultOneData"]),
    series() {
      return this.seriesData ? this.seriesData : [];
    },
    chartOptions() {
      var title = {
        text: this.titleY ? this.titleY : "",
        rotate: 90,
        offsetX: 0,
        style: {
          fontSize: "14px",
          fontFamily: "微軟正黑體",
          fontWeight: 500,
          cssClass: "apexcharts-yaxis-title",
        },
      };
      return {
        // 左上標題
        // title: {
        //   text: null,
        // },
        // 線圖顏色順序
        colors: ["#7cb5ec", "#444349"],
        chart: {
          height: this.height ? this.height : 500, // 圖表高度
          type: "line", // 圖表類型
          // 圖表縮放功能
          zoom: {
            enabled: false,
          },
          // 圖表工具列
          toolbar: {
            show: false,
          },
        },
        // 線圖粗細
        stroke: {
          curve: "straight",
          width: 1.5,
        },
        // 背景半透明交錯
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        legend: {
          // y軸底下可點擊開關線圖的按鈕
          markers: {
            width: 50,
            height: 5,
            strokeColor: "#fff",
            radius: 12,
          },
          itemMargin: {
            horizontal: 10,
            vertical: 20,
          },
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          title,
          tickAmount: this.tick ? this.tick : 4,
          // min: 5000,
          // max: 35000,
          labels: {
            formatter: (value) => {
              if (value) return `${value.toFixed(2)}%`;
              return value;
            },
            style: {
              colors: [],
              fontSize: "12px",
              fontFamily: "微軟正黑體",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
          },
        },
        tooltip: {
          items: {
            display: "inline-block",
          },
          x: {
            format: "yyyy/MM/dd",
          },
        },
      };
    },
  },
};
</script>