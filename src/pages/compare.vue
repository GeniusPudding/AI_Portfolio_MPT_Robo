<template>
  <article class="main">
    <div id="combination"></div>
    <section class="item combination">
      <div class="container">
        <h2 class="tit-type2" title="您的基金組合">您的基金組合</h2>
        <fundList></fundList>
      </div>
      <div class="container">
        <h2 class="tit-type2" title="建議的投組清單">建議的投組清單</h2>
        <div class="btn reportbtn">
          <a href="" @click.prevent="goReport()" title="理財健檢報告">理財健檢報告</a>
        </div>
        <recommendList></recommendList>

        <div class="report-item-area">
          <p>定期投資報告通知發送設定</p>
          <div class="report-item-btn">
            <!-- <div
              class="sItem"
              :class="{ active: useMail }"
              @click.prevent="switchSend($event)"
            >
              電子郵件
            </div> -->
            <div
              class="sItem"
              :class="{ active: !useMail }"
              @click.prevent="switchSend($event)"
            >
              手機簡訊
            </div>
          </div>
        </div>

        <div class="btnArea twoBtn">
          <div class="btn type6">
            <a href="#/myportfolio" title="重新自訂投組">重新自訂投組</a>
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
import recommendList from "../components/recommendList";
import fundList from "../components/fundList";
import saveBtn from "../components/buttons/saveBtn";
import { mapFields } from "vuex-map-fields";
export default {
  components: { recommendList, fundList, saveBtn },
  computed: {
    ...mapFields(["useMail", 'isLoaded'])
  },
  methods: {
    switchSend(event) {
      if (event.target.innerText === "手機簡訊") {
        this.useMail = false;
      } else if (event.target.innerText === "電子郵件") {
        this.useMail = true;
      } else {
        console.debug(event.target.innerText);
      }
    },
   goReport (){
      if(!this.isLoaded) return
      this.isLoaded = false
      this.$router.push('fundreport')
    }
  }
};
</script>
