<template>
  <div class="scroll">
    <table class="table tablehover">
      <thead>
        <tr class="text-center">
          <th></th>
          <th>建議投資組合</th>
          <th v-if="!isCustomNone">自訂投資組合</th>
          <!---->
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>日期區間Period</td>
          <td>
            {{ recomTotalPerf.start_date + ' - ' +  recomTotalPerf.end_date}} 
          </td>
          <td v-if="!isCustomNone">
            {{ customTotalPerf.start_date ? customTotalPerf.start_date + ' - ' +  customTotalPerf.end_date : null}} 
          </td>
          <!-- Jan 2020 - Jan 2021 -->
        </tr>
        <tr>
          <td>期初投資餘額Start Balance</td>
          <td>{{ recomTotalPerf.Start_Balance | currency }}</td>
          <Fragment v-if="!isCustomNone">
            <td v-if="customTotalPerf.Start_Balance">{{customTotalPerf.Start_Balance | currency}}</td>
            <td v-else></td> 
          </Fragment>
  
          <!---->
        </tr>
        <tr>
          <td>期末餘額End Balance</td>
          <td>{{ recomTotalPerf.End_Balance | currency }}</td>
          <Fragment v-if="!isCustomNone">
            <td v-if="customTotalPerf.End_Balance">{{customTotalPerf.End_Balance | currency}}</td>
            <td v-else></td> 
          </Fragment>
          <!---->
        </tr>
        <tr>
          <td>年複合成長率CAGR</td>
          <tdNum
            :content="recomTotalPerf['CAGR(%)']"
            :numFormat="percentFormat"
          ></tdNum>
          <tdNum v-if="!isCustomNone"
            :content="customTotalPerf['CAGR(%)']"
            :numFormat="percentFormat"
          ></tdNum>
          <!---->
        </tr>
        <tr>
          <td>波動率Volatility</td>
          <tdNum
            :content="recomTotalPerf['Stdev(%)']"
            :numFormat="percentFormat"
          ></tdNum>
          <tdNum v-if="!isCustomNone"
            :content="customTotalPerf['Stdev(%)']"
            :numFormat="percentFormat"
          ></tdNum>
          <!---->
        </tr>
        <tr>
          <td>最好的年度報酬率Best Year<i class="icon-info-sign"></i></td>
          <tdNum
            :content="recomTotalPerf['max_year_return']"
            :numFormat="percentFormat"
          ></tdNum>
          <tdNum v-if="!isCustomNone"
            :content="customTotalPerf['max_year_return']"
            :numFormat="percentFormat"
          ></tdNum>
          <!---->
        </tr>
        <tr>
          <td>最差的年度報酬率Worst Year<i class="icon-info-sign"></i></td>
          <tdNum
            :content="recomTotalPerf['min_year_return']"
            :numFormat="percentFormat"
          ></tdNum>
          <tdNum v-if="!isCustomNone"
            :content="customTotalPerf['min_year_return']"
            :numFormat="percentFormat"
          ></tdNum>
          <!---->
        </tr>
        <tr>
          <td>最大的跌幅Max. Drawdown</td>
          <tdNum
            :content="recomTotalPerf['Max.Drawdown(%)']"
            :numFormat="percentFormat"
          ></tdNum>
          <tdNum v-if="!isCustomNone"
            :content="customTotalPerf['Max.Drawdown(%)']"
            :numFormat="percentFormat"
          ></tdNum>
          <!---->
        </tr>
        <tr>
          <td>夏普值Sharpe Ratio</td>
          <tdNum
            :content="recomTotalPerf['Sharpe_Ratio']"
            :numFormat="ratioFormat"
          ></tdNum>
          <tdNum v-if="!isCustomNone"
            :content="customTotalPerf['Sharpe_Ratio']"
            :numFormat="ratioFormat"
          ></tdNum>
          <!---->
        </tr>
        <tr>
          <td>下檔標準差Downside Deviation (monthly)</td>
          <tdNum
            :content="recomTotalPerf['Downsid_Deviation(monthly)(%)']"
            :numFormat="percentFormat"
          ></tdNum>
          <tdNum v-if="!isCustomNone"
            :content="customTotalPerf['Downsid_Deviation(monthly)(%)']"
            :numFormat="percentFormat"
          ></tdNum>
          <!---->
        </tr>
        <tr>
          <td>索提諾值Sortino Ratio</td>
          <tdNum
            :content="recomTotalPerf['Sortino_Ratio']"
            :numFormat="ratioFormat"
          ></tdNum>
          <tdNum v-if="!isCustomNone"
            :content="customTotalPerf['Sortino_Ratio']"
            :numFormat="ratioFormat"
          ></tdNum>
          <!---->
        </tr>
        <tr>
          <td>績效比率Calmar Ratio</td>
          <tdNum
            :content="recomTotalPerf['Calmar_Ratio']"
            :numFormat="ratioFormat"
          ></tdNum>
          <tdNum v-if="!isCustomNone"
            :content="customTotalPerf['Calmar_Ratio']"
            :numFormat="ratioFormat"
          ></tdNum>
          <!---->
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import tdNum from "../tdNum"
import { Fragment } from "vue-fragment"
export default {
  props: {
    isCustomNone: Boolean,
    percentFormat: Function,
    ratioFormat: Function,
    recomTotalPerf: Object,
    customTotalPerf: Object
  },
  components: { tdNum, Fragment }
};
</script>
