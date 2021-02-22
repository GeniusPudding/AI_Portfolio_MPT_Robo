<template>
  <article class="main">
    <div id="combination"></div>
    <section class="item combination">
      <div class="container">
        <h2 class="tit-type2" title="理財健檢報告">理財健檢報告</h2>

        <report></report>

        <!-- fix button -->
        <div class="btnArea">
          <div class="btn">
            <router-link to="/compare">返回投組</router-link>
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
import report from '../components/report'
import saveBtn from '../components/buttons/saveBtn'
export default {
  components: {report, saveBtn},
  computed: {
    ...mapState(['user_id', 'BfNo','rr_value', 'IdNo', 'client_ip'])
  },
  methods: {
    async getResults(){//DEBUGH
      if(this.BfNo!==0){//EC customers
        return await this.$api.getEC('/backrest',this.rr_param,this.authorizationHeader)
      }else{
        return await this.$api.getWF09('/backrest',this.rr_param,this.authorizationHeader)
      }
    }

  }
}
</script>
