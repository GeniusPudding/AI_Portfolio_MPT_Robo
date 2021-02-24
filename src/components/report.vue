<template>
  <div class="fundrpt-item-area">
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

      <p>自訂投資組合報酬率分析</p>
      <monthlyPerformance
        :returns="customReturns.monthly.roi"
        :numFormat="percentFormat"
      ></monthlyPerformance>
    </article>

    <article>
      <h3 title="投資組合績效">投資組合績效</h3>
      <portfolioPerformance
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
      <p>自訂投資組合報酬率分析</p>
      <portfolioAnalysis
        :funds="customComponents"
        :numFormat="percentFormat"
      ></portfolioAnalysis>
    </article>
  </div>
</template>
<script>
import { mapState } from "vuex";
import lineChart from "./charts/line";
import barChart from "./charts/bar";
import tdNum from "./tdNum";
import portfolioAnalysis from "./report/portfolioAnalysis";
import portfolioPerformance from "./report/portfolioPerformance";
import monthlyPerformance from "./report/monthlyPerformance";
export default {
  data() {
    return {
      customData: {},
      recomData: {},
      customTotalPerf: {},
      recomTotalPerf: {},
      customComponents: [],
      recomComponents: [],
      customReturns: {},
      recomReturns: {},
      lineChartData: [],
      lineChartData2: [],
      barChartData: []
    };
  },
  components: {
    tdNum,
    lineChart,
    barChart,
    portfolioAnalysis,
    portfolioPerformance,
    monthlyPerformance
  },
  computed: {
    ...mapState([
      "BfNo",
      "authorizationHeader",
      "recommendedPortfolio",
      "personalPortfolio"
    ]),
    body() {
      return {
        custom_portfolio: this.personalPortfolio,
        recom_portfolio: this.recommendedPortfolio
      };
    }
  },
  async mounted() {
    console.log("authorizationHeader:", this.authorizationHeader);
    let res = await this.getResults();
    console.log("getResults:", res);
    console.log(
      "res.Result.custom.performance:",
      res.Result.custom.performance
    );
    let customPromise, recomPromise;
    await new Promise(resolve => {
      customPromise = res.Result.custom;
      recomPromise = res.Result.recom;

      resolve();
    });
    console.log("customPromise:", customPromise);
    console.log("recomPromise:", recomPromise);
    this.customData = customPromise;
    this.recomData = recomPromise;
    this.customTotalPerf = customPromise.performance[0];
    this.recomTotalPerf = recomPromise.performance[0];
    this.customComponents = customPromise.performance.slice(1);
    this.recomComponents = recomPromise.performance.slice(1);
    this.customReturns = customPromise.returns;
    this.recomReturns = recomPromise.returns;
    console.log("this.customReturns:", this.customReturns);
    console.log("this.recomReturns:", this.recomReturns);

    let fundLine = []
    let fundLine2 = []
    let fundBar = []
    let fundBar2 = []
    let daily, daily2, yearly, yearly2
    await new Promise(resolve => {
      daily = this.recomReturns.daily.cum_roi
      daily2 = this.customReturns.daily.cum_roi
      yearly = this.recomReturns.yearly.roi
      yearly2 = this.customReturns.yearly.roi
      resolve()
    })
    await new Promise(resolve => {
      Object.keys(daily).forEach(obj => {
        fundLine.push({
          x: obj,
          y: daily[obj]
        });
      });
      Object.keys(daily2).forEach(obj => {
        fundLine2.push({
          x: obj,
          y: daily2[obj]
        });
      });
      // console.log("fundLine:", fundLine);

      Object.keys(yearly).forEach(obj => {
        fundBar.push({
          x: obj,
          y: yearly[obj]
        })
      })
      Object.keys(yearly2).forEach(obj => {
        fundBar2.push({
          x: obj,
          y: yearly2[obj]
        })
      })

      resolve()
    })

    let lineSeries, barSeries
    await new Promise(resolve => {
      lineSeries = [
        {
          name: "推薦投資組合",
          data: fundLine
        },
        {
          name: "自訂投資組合",
          data: fundLine2
        }
      ]
      barSeries = [
        {
          name: "推薦投資組合",
          data: fundBar
        },
        {
          name: "自訂投資組合",
          data: fundBar2
        }
      ]
      resolve()
    })
    this.lineChartData = lineSeries
    this.barChartData = barSeries
  },
  methods: {
    percentFormat(floatNum) {
      return floatNum ? Math.round(floatNum * 100) / 100 + "%" : "";
    },
    ratioFormat(floatNum) {
      return floatNum ? Math.round(floatNum * 100) / 100 : "";
    },
    async getResults() {
      //DEBUG
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
    }
  }
};
</script>
