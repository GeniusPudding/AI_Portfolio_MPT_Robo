<template>
  <loading v-if="!isLoaded" />
  <div v-else class="fund-item-area">
    <ul class="noselect">
      <li class="thead">
        <ol class="tr">
          <li>類型</li>
          <li>市場</li>
          <li>基金名稱</li>
          <li>投資比重(%)</li>
        </ol>
      </li>
      <li class="tbody">
        <ol class="tr" v-for="(fundItem, $index) in recommendedPortfolio" :key="$index">
          <li data-title="類型">{{fundItem.type}}</li>
          <li data-title="市場">{{fundItem.market}}</li>
          <li data-title="基金名稱">
            <p>
              {{`${fundItem.fund_id} ${fundItem.name}`}}
            </p>
          </li>
          <li data-title="投資比重(%)">{{Math.round(fundItem.weight)+'%'}}</li>         
        </ol>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import loading from './includes/loading'
export default {
  components: {loading},
  computed: {
    ...mapState(['BfNo', 'rr_param', 'recommendedSource','personalPortfolio']),
    ...mapFields(['isLoaded', 'recommendedPortfolio', 'authorizationHeader']),
    body(){
      let fund_list = this.personalPortfolio.map(fund=>fund.fund_id)
      console.log('fund_list:',fund_list)
      return {
        ...this.rr_param,
        "fund_list":fund_list
      }
    }
  },
  async mounted(){
    console.log("RecomList mounted this.$route.name:", this.$route.name);
    console.log('recom authorizationHeader:',this.authorizationHeader)
    console.log('recom personalPortfolio:',this.personalPortfolio)

    let sources = this.$route.name == 'edm' ? await this.$parent.getEDMResults() : await this.getRecommendedList()

    this.recommendedPortfolio = sources.Result.recom.portfolio
    console.log('getRecommendedList Portfolio:',this.recommendedPortfolio)
  },
  methods:{
    async getRecommendedList(){
      // let fund_list = this.personalPortfolio.map(fund=>fund.fund_id)
      // console.log('fund_list:',fund_list)
      // let body = {
      //   ...this.rr_param,
      //   "fund_list":fund_list
      // }
      try {
        let res
        if(this.BfNo!==0){//EC customers
          res = await this.$api.postEC('/recom',this.body,this.authorizationHeader)

        }else{
          console.log('check authorizationHeader:',this.authorizationHeader)
          res = await this.$api.postWF09('/recom',this.body,this.authorizationHeader)
        }
        return  res
      } catch (error) {
        this.$api.handlerErr(error);
      } finally {
        this.isLoaded = true;
      }
    }
  }
}
</script>>
