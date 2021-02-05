<template>
  <article class="main">
    <div id="combination"></div>
    <section class="item combination">
      <div class="container">
        <h2 class="tit-type2" title="您的基金組合">您的基金組合</h2>
        <fundList></fundList>
        <div class="btnArea">
          <div class="btn">
            <a href="" title="取得建議">取得建議</a>
          </div>
        </div>
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
            <div class="sItem active">電子郵件</div>
            <div class="sItem">手機簡訊</div>
          </div>
        </div>

        <div class="btnArea twoBtn" v-show="questionnaire == 0">
          <div class="btn type6">
            <a href="" target="_blank" title="重新建議投組">重新建議投組</a>
          </div>
          <div class="btn">
            <!-- <a href="" title="儲存建議投組">儲存建議投組</a> -->
            <a
              href="javascript:void(0);"
              title="儲存建議投組"
              @click="toggleModal('warning')"
            >
              儲存建議投組</a
            >
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
import { mapState } from 'vuex'
import recommendList from '../components/recommendList'
import fundList from '../components/fundList'
export default {
  // props: ['questionnaire'],
  components: {recommendList, fundList},
  computed: {
    ...mapState(['questionnaire'])
  }
}
</script>
