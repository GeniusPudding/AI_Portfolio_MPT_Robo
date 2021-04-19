<template>
  <article class="main">
    <div id="combination"></div>
    <section class="item combination">
      <div class="container">
        <h2 class="tit-type2" title="您的基金組合">您的基金組合</h2>
        <fundList isEditableProp></fundList>
        <div class="btnArea">
          <div class="btn">
            <a href="" @click.prevent="jumpCheck()"  :class="{ balloon: isEmptyPortfolio }" balloon-data="Step 2 : 取得富蘭克林最新投資建議。" title="取得建議">取得建議</a>
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
    ...mapFields(['isLoaded','personalPortfolio','isCheckingEmpty','investmentAmount']),
    isEmptyPortfolio(){
      return this.personalPortfolio.length == 0
    }
  },
  methods: {
    jumpCheck (){// check before getting recom portfolio
      if(!this.isLoaded) return // wait for checking
      // if(this.personalPortfolio.length==0){
      //   alert('請至少新增一檔基金!')
      //   return
      // }
      this.localLog('jump check this.personalPortfolio:',this.personalPortfolio)
      // remove empty funds
      this.personalPortfolio = this.personalPortfolio.filter((item, index)=>{
        if (!item.name){
          this.investmentAmount[index] = 0
          this.isCheckingEmpty = true
        }
        return (item.name)
      })
      this.localLog('this.investmentAmount:',this.investmentAmount)
      this.investmentAmount = this.investmentAmount.filter(num=>{
        return (num!==0)
      })

      this.$nextTick(() => {
        this.isLoaded = false
        this.$router.push('compare')
      })

    }
  }
}
</script>
