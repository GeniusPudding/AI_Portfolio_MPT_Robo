<template>
  <loading v-if="!isLoaded" />
  <div v-else class="fundrpt-item-area">
    <article>
      <h3 title="基金投資組合成長圖">基金投資組合成長圖</h3>
      <lineChart :seriesData="lineChartData"></lineChart>
    </article>

    <article>
      <h3 title="年化報酬率">年化報酬率</h3>
      <barChart :seriesData="barChartData"></barChart>
    </article>

    <article>
      <h3 title="每月績效分析">每月績效分析</h3>
      <p>建議投資組合報酬率分析</p>
      <monthlyPerformance
        :returns="recomReturns.monthly.roi"
        :numFormat="percentFormat"
      ></monthlyPerformance>
      <Fragment v-if="!isCustomNone">
        <p>自訂投資組合報酬率分析</p>
        <monthlyPerformance
          :returns="customReturns.monthly.roi"
          :numFormat="percentFormat"
        ></monthlyPerformance>
      </Fragment>

    </article>

    <article>
      <h3 title="投資組合績效">投資組合績效</h3>
      <portfolioPerformance
        :isCustomNone="isCustomNone"
        :recomTotalPerf="recomTotalPerf"
        :customTotalPerf="customTotalPerf"
        :percentFormat="percentFormat"
        :ratioFormat="ratioFormat"
      ></portfolioPerformance>
    </article>

    <article>
      <h3 title="投資組合基金表現分析 Portfolio Components">
        投資組合基金表現分析 Portfolio Components
      </h3>
      <p>建議投資組合報酬率分析</p>
      <portfolioAnalysis
        :funds="recomComponents"
        :numFormat="percentFormat"
      ></portfolioAnalysis>
      <Fragment v-if="!isCustomNone">
        <p>自訂投資組合報酬率分析</p>
        <portfolioAnalysis
          :funds="customComponents"
          :numFormat="percentFormat"
        ></portfolioAnalysis>
      </Fragment>

    </article>
  </div>
</template>
<script>
import { mapState } from "vuex"
import { mapFields } from 'vuex-map-fields'
import lineChart from "./charts/line"
import barChart from "./charts/bar"
import tdNum from "./tdNum"
import portfolioAnalysis from "./report/portfolioAnalysis"
import portfolioPerformance from "./report/portfolioPerformance"
import monthlyPerformance from "./report/monthlyPerformance"
import loading from "./includes/loading.vue"
import { Fragment } from "vue-fragment"
export default {
  data() {
    return {
      isCustomNone: false,
      customData: {},
      recomData: {},
      customTotalPerf: {},
      recomTotalPerf: {},
      customComponents: [],
      recomComponents: [],
      customReturns: {},
      recomReturns: {},
      lineChartData: [],
      barChartData: []
    };
  },
  components: {
    tdNum,
    lineChart,
    barChart,
    portfolioAnalysis,
    portfolioPerformance,
    monthlyPerformance,
    loading,
    Fragment
  },
  computed: {
    ...mapState([
      "BfNo",
      "authorizationHeader",
      "recommendedPortfolio",
      "personalPortfolio"
    ]),
    ...mapFields(["isLoaded"]),
    body() {
      return {
        custom_portfolio: this.personalPortfolio,
        recom_portfolio: this.recommendedPortfolio
      };
    }
  },
  async mounted() {
    this.localLog("EDM mounted this.$route.name:", this.$route.name);
    this.localLog("recommendedPortfolio:", this.recommendedPortfolio);
    this.localLog("personalPortfolio:", this.personalPortfolio);
    let res = this.$route.name == 'edm' ? await this.$parent.getEDMResults() : await this.getResults()
    this.localLog("getResults:", res);
    var parsedobj = JSON.parse(JSON.stringify(res))
    this.localLog('parsedobj res:',parsedobj)
    // this.localLog(
    //   "res.Result.custom.performance:",
    //   res.Result.custom.performance
    // );
    let customPromise, recomPromise;
    await new Promise(resolve => {
      customPromise = res.Result.custom;
      recomPromise = res.Result.recom;

      resolve();
    });
    this.localLog("customPromise:", customPromise);
    this.localLog("recomPromise:", recomPromise);

    this.customData = customPromise;
    if (!customPromise.performance || !customPromise.returns){
      this.customData.performance = [{},{},{},{},{},{}]
      this.customData.returns = {daily:{}, monthly:{}, yearly:{}}
      this.isCustomNone = true
    }

    this.recomData = recomPromise
    this.customTotalPerf = customPromise.performance[0]
    this.recomTotalPerf = recomPromise.performance[0]
    this.customComponents = customPromise.performance.slice(1)
    this.recomComponents = recomPromise.performance.slice(1)
    this.customReturns = customPromise.returns
    this.recomReturns = recomPromise.returns
    this.localLog("this.customReturns:", this.customReturns)
    this.localLog("this.recomReturns:", this.recomReturns)
    this.localLog("this.customComponents:", this.customComponents)
    let fundLine = []
    let fundLine2 = []
    let fundBar = []
    let fundBar2 = []
    let daily, daily2, yearly, yearly2
    await new Promise(resolve => {
      daily = this.recomReturns.daily.cum_roi
      yearly = this.recomReturns.yearly.roi
      if (!this.isCustomNone){
        daily2 = this.customReturns.daily.cum_roi
        yearly2 = this.customReturns.yearly.roi
      }
      resolve()
    })
    await new Promise(resolve => {

      Object.keys(daily).forEach(obj => {
        fundLine.push({
          x: obj,
          y: daily[obj]
        })
      })

      if(daily2){
        Object.keys(daily2).forEach(obj => {
          fundLine2.push({
            x: obj,
            y: daily2[obj]
          })
        })
      }

      // this.localLog("fundLine:", fundLine)

      Object.keys(yearly).forEach(obj => {
        fundBar.push({
          x: obj,
          y: yearly[obj]
        })
      })

      if(yearly2){
        Object.keys(yearly2).forEach(obj => {
          fundBar2.push({
            x: obj,
            y: yearly2[obj]
          })
        })
      }

      resolve();
    });

    let lineSeries, barSeries;
    await new Promise(resolve => {
      if (!this.isCustomNone){
        lineSeries = [
          {
            name: "建議投資組合",
            data: fundLine
          },
          {
            name: "自訂投資組合",
            data: fundLine2
          }
        ];
        barSeries = [
          {
            name: "建議投資組合",
            data: fundBar
          },
          {
            name: "自訂投資組合",
            data: fundBar2
          }
        ];
      }else{
        lineSeries = [
          {
            name: "建議投資組合",
            data: fundLine
          }
        ]
        barSeries = [
          {
            name: "建議投資組合",
            data: fundBar
          }
        ]
      }
      resolve();
    });
    this.lineChartData = lineSeries;
    this.barChartData = barSeries;
    this.isLoaded = true;
  },
  methods: {
    percentFormat(floatNum) {
      // this.localLog('percentFormat:',floatNum)
      if ((floatNum+'').includes('Infinity')){//for some may be inf such as sortino ratio
        return "None"
      }
      return !isNaN(floatNum) ? Math.round(floatNum * 100) / 100 + "%" : "";
    },
    ratioFormat(floatNum) {
      // this.localLog('ratioFormat:',floatNum)
      if ((floatNum+'').includes('Infinity')){
        return "None"
      }
      return !isNaN(floatNum) ? Math.round(floatNum * 100) / 100 : "";
    },
    async getResults() {
      try {
        if (this.BfNo !== 0) {
          //EC customers
          return await this.$api.postEC(
            "/backtest",
            this.body,
            this.authorizationHeader
          );
        } else {
          return await this.$api.postWF09(
            "/backtest",
            this.body,
            this.authorizationHeader
          );
        }
      } catch (error) {
        this.$api.handlerErr(error);
      } finally {
        this.isLoaded = true;
      }
    }
  }
};
</script>
