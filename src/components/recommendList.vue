<template>
  <div class="fund-item-area">
    <ul class="noselect">
      <li class="thead">
        <ol class="tr">
          <li>類型</li>
          <li>市場</li>
          <li>基金名稱</li>
          <li>投資比重</li>
          <li>投資金額</li>
        </ol>
      </li>
      <li class="tbody">
        <ol class="tr">
          <li data-title="類型">債券</li>
          <li data-title="市場">高收益債券型</li>
          <li data-title="基金名稱">
            <p>
              6509 富蘭克林華美新興趨勢傘型基金之積極回報債券組合基金 累積型
              新台幣
            </p>
          </li>
          <li data-title="投資比重">5%</li>
          <li data-title="投資金額">5,000</li>
        </ol>
        <ol class="tr">
          <li data-title="類型">債券</li>
          <li data-title="市場">公債型</li>
          <li data-title="基金名稱">
            <p>
              A873 富蘭克林坦伯頓全球投資系列-全球債券總報酬基金 A 累積型 美元
            </p>
          </li>
          <li data-title="投資比重">40%</li>
          <li data-title="投資金額">40,000</li>
        </ol>
        <ol class="tr">
          <li data-title="類型">股票</li>
          <li data-title="市場">全球股票型</li>
          <li data-title="基金名稱">
            <p>A829 富蘭克林坦伯頓全球投資系列-成長(歐元)基金 A 累積型 歐元</p>
          </li>
          <li data-title="投資比重">43%</li>
          <li data-title="投資金額">43,000</li>
        </ol>
        <ol class="tr">
          <li data-title="類型">股票</li>
          <li data-title="市場">健康醫療股票型</li>
          <li data-title="基金名稱">
            <p>6529 富蘭克林華美全球醫療保健基金 累積型 新台幣</p>
          </li>
          <li data-title="投資比重">12%</li>
          <li data-title="投資金額">12,000</li>
        </ol>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'
export default {
  computed: {
    ...mapState(['user_id', 'BfNo','rr_value', 'IdNo', 'client_ip']),
    ...mapFields(['isEditable', 'fundPool', 'investmentAmount', 'token',
    'personalPortfolio', 'budget','isCheckingEmpty']),
  },
}
</script>>
