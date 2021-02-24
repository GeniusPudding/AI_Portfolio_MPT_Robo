<template>
  <div class="BarChart">
    <apexchart
      :type="chartOptions.chart.type"
      :height="chartOptions.chart.height"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import VueApexCharts from "vue-apexcharts";
export default {
  name: "BarChart",
  props: ["seriesData"],
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {};
  },
  computed: {
    // ...mapState(['resultTwoYearlyData']),
    series() {
      return this.seriesData ? this.seriesData : [];
    },
    chartOptions() {
      return {
        // 線圖顏色順序
        colors: ["#7cb5ec", "#444349"],
        chart: {
          height: 500, // 圖表高度
          type: "bar", // 圖表類型
          // 圖表縮放功能
          zoom: {
            enabled: false
          },
          // 圖表工具列
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        // 背景半透明交錯
        legend: {
          // y軸底下可點擊開關線圖的按鈕
          markers: {
            width: 25,
            height: 10,
            radius: 2
          },
          itemMargin: {
            horizontal: 10,
            vertical: 20
          }
        },
        xaxis: {
          // type: 'datetime'
          labels: {
            formatter: value => {
              var year = new Date(value).getFullYear();
              return year;
            }
          }
        },
        yaxis: {
          title: {
            text: "年化報酬率",
            rotate: 90,
            style: {
              fontSize: "14px",
              fontFamily: "微軟正黑體",
              fontWeight: 500,
              cssClass: "apexcharts-yaxis-title"
            }
          },
          tickAmount: 4,
          // min: -20,
          // max: 40,
          labels: {
            formatter: value => {
              if (value) return `${value.toFixed(2)}%`;
              return value;
            },
            style: {
              colors: [],
              fontSize: "12px",
              fontFamily: "微軟正黑體",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label"
            }
          }
        },
        plotOptions: {
          bar: {
            columnWidth: "40%"
          }
        },
        tooltip: {
          items: {
            display: "inline-block"
          },
          x: {
            format: "yyyy/MM/dd"
          }
        }
      };
    }
  }
};
</script>
