<template>
  <article class="main">
    <div id="combination"></div>
    <section class="item combination">
      <div class="container">
        <h2 class="tit-type2" title="建議的投組清單">建議的投組清單</h2>  
        <recommendList></recommendList> 
        <h2 class="tit-type2" title="理財健檢報告">理財健檢報告</h2>
        <report></report>

        <!-- fix button -->
        <div class="btnArea twoBtn">
          <div class="btn type6">
            <a href="" title="取消訂閱"> 取消訂閱 </a>
          </div>
          <div class="btn">
            <a href="" title="增加建議投組"> 增加建議投組 </a>
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
// import { mapState } from 'vuex'
import report from '../components/report'
import recommendList from '../components/recommendList'
export default {
  // props: ['questionnaire'],
  components: { report, recommendList },
  //   computed: {
  //     ...mapState(['questionnaire'])
  //   }
};
</script>
