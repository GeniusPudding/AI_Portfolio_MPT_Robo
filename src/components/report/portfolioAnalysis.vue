<template>
      <div class='scroll'>
        <table data-v-6ee2785f='' class='table tablehover'>
          <thead data-v-6ee2785f=''>
            <tr data-v-6ee2785f='' class='text-center'>
              <th data-v-6ee2785f='' class='text-center'>基金代碼</th>
              <th data-v-6ee2785f=''>基金名稱</th>
              <!---->
              <th data-v-6ee2785f=''>波動率</th>
              <th data-v-6ee2785f=''>最好年度</th>
              <th data-v-6ee2785f=''>最差年度</th>
              <th data-v-6ee2785f=''>最大回撤</th>
              <th data-v-6ee2785f=''>夏普值</th>
              <th data-v-6ee2785f=''>索提諾指標</th>
              <!---->
            </tr>
          </thead>
          <tbody data-v-6ee2785f=''>
            <tr data-v-6ee2785f=''  v-for="(fundItem, $index) in funds" :key="$index">
              <td data-v-6ee2785f='' class='text-center'>{{fundItem.fund_id}}</td>
              <td data-v-6ee2785f='' class='text-left'>{{fundItem.fund_name}}</td>
              <tdNum data-v-6ee2785f='' :content="fundItem['Stdev(%)']" :numFormat="numFormat"></tdNum>
              <tdNum data-v-6ee2785f='' :content="fundItem.max_year_return" :numFormat="numFormat"></tdNum>
              <tdNum data-v-6ee2785f='' :content="fundItem.min_year_return" :numFormat="numFormat"></tdNum>
              <tdNum data-v-6ee2785f='' :content="fundItem['Max.Drawdown(%)']" :numFormat="numFormat"></tdNum>
              <tdNum data-v-6ee2785f='' :content="fundItem.Sharpe_Ratio" :numFormat="numFormat"></tdNum>
              <tdNum data-v-6ee2785f='' :content="fundItem.Sortino_Ratio" :numFormat="numFormat"></tdNum>
            </tr>
          </tbody>
        </table>
      </div>    
</template>>
<script>
import tdNum from '../tdNum'
export default {
    props : {
        funds: Array,
        numFormat: Function
    },
    components: {tdNum}
}
</script>