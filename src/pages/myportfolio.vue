<template>
  <article class="main">
    <div id="combination"></div>
    <section class="item combination">
      <div class="container">
        <h2 class="tit-type2" title="您的基金組合">您的基金組合</h2>
        <fundList></fundList>
        <div class="btnArea">
          <div class="btn">
            <a href="" @click.prevent="jumpCheck()" title="取得建議">取得建議</a>
          </div>
        </div>
      </div>
    </section>

    <div id="reportset"></div>
    <section class="item reportset">
      <div class="container"></div>
    </section>
  </article>
</template>
<script>
import fundList from '../components/fundList'
import { mapFields } from 'vuex-map-fields'
import { mapState} from 'vuex'
export default {
  components: {fundList},
  computed: {
    ...mapState(['isCheckingEmpty']),
    ...mapFields(['personalPortfolio','isCheckingEmpty','investmentAmount'])
  },
  methods: {
    // setPercentage (val, quantile, isSign) {
    //   var num = val ? val : 0
    //   var percent = isSign ? `${num.toFixed(quantile)}%` : Number(num.toFixed(quantile))
    //   return percent
    // },
    jumpCheck (){
      console.log('jump check this.personalPortfolio:',this.personalPortfolio)

      // let emptyIndex = []
      this.personalPortfolio = this.personalPortfolio.filter((item, index)=>{
        console.log('item.weight:',item.weight)
        console.log('item.name:',item.name)
        if (!item.name){
          this.investmentAmount[index] = 0
          this.isCheckingEmpty = true
          // emptyIndex.push(index)
        }
        return (item.name)
      })
      console.log('this.investmentAmount:',this.investmentAmount)
      this.investmentAmount = this.investmentAmount.filter(num=>{
        return (num!==0)
      })

      this.$nextTick(() => {
        this.$router.push('compare')
      })

    }
  }
}
</script>
