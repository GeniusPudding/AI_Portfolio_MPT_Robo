<template>
  <article class="main">
    <div id="combination"></div>
    <section class="item combination">
      <div class="container">
        <h2 class="tit-type2" title="您的基金組合">您的基金組合</h2>
        <fundList></fundList>
        <!-- <div class="btnArea">
          <div class="btn">
            <a href="" title="取得建議">取得建議</a>
          </div>
        </div> -->
      </div>
      <div class="container">
        <h2 class="tit-type2" title="建議的投組清單">建議的投組清單</h2>
        <div class="btn reportbtn">
          <router-link to="/fundreport">理財健檢報告</router-link>
          <!-- <a href="fundreport">理財健檢報告</a> -->
        </div>
        <recommendList></recommendList>

        <div class="report-item-area">
          <p>定期投資報告通知發送設定</p>
          <div class="report-item-btn">
            <div class="sItem" :class="{'active': useMail}" @click.prevent="switchSend($event)">電子郵件</div>
            <div class="sItem" :class="{'active': !useMail}" @click.prevent="switchSend($event)">手機簡訊</div>
          </div>
        </div>

        <div class="btnArea twoBtn" v-show="questionnaire == 0">
          <div class="btn type6">
            <a href="myportfolio" title="重新自訂投組">重新自訂投組</a>
          </div>
          <saveBtn></saveBtn>
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
import { mapState } from 'vuex'
import {mapFields} from 'vuex-map-fields'
import recommendList from '../components/recommendList'
import fundList from '../components/fundList'
import saveBtn from '../components/buttons/saveBtn'
export default {
  // props: ['questionnaire'],
  components: {recommendList, fundList, saveBtn},
  computed: {
    ...mapState(['questionnaire']),
    ...mapFields(['useMail'])
  },
  methods: {
    // setPercentage(val, quantile, isSign) {
    //   var num = val ? val : 0
    //   var percent = isSign ? `${num.toFixed(quantile)}%` : Number(num.toFixed(quantile))
    //   return percent
    // },
    // toggleModal(name) {
    //   console.log("toggleModal name:", name);
    //   this.$refs[name].toggle = !this.$refs[name].toggle;
    // }
    switchSend (event) {
      // targetId = event.currentTarget.id;
      if(event.target.innerText==='手機簡訊'){
        this.useMail = false
      }else if(event.target.innerText==='電子郵件'){
        this.useMail = true
      }else{
        console.debug(event.target.innerText)
      }

    }
  }
}
</script>
