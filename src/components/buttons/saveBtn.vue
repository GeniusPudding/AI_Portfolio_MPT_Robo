<template>
  <Fragment>
    <modal ref="warning" :can-close="true" class="md">
      <slot slot="infoArea">
        <div class="alertModal step1">
          <div class="alertModal-icon">
            <!-- <i class="fas fa-exclamation-circle"></i> -->
            <i class="far fa-calendar-check"></i>
          </div>
          <p style="font-size: 18px">
            已將建議您的投組儲存，將透過簡訊/email
            定期發送投資報告連結至您的手機號碼/信箱，如欲取消訂閱，請於連結中點選取消訂閱。謝謝
          </p>
          <div class="btnArea">
            <div class="btn">
              <a href="/home" title="返回首頁">
                返回首頁 <i class="fas fa-angle-right"></i>
              </a>
            </div>
          </div>
        </div>
      </slot>
    </modal>
    <div class="btn">
      <!-- <a href="" title="儲存建議投組">儲存建議投組</a> -->
      <a
        href="javascript:void(0);"
        title="儲存建議投組"
        @click="savePortfolio()"
      >
        儲存建議投組
      </a>
    </div>
  </Fragment>
</template>
<script>
import { mapState } from "vuex";
import modal from "../modal";
import { Fragment } from "vue-fragment";
export default {
  components: { modal, Fragment },
  computed: {
    ...mapState(['authorizationHeader','useMail','BfNo','recommendedPortfolio',
    'personalPortfolio','client_ip','rr_value','Gid']),
    body () {// gen package body for create API
      if (this.BfNo!==0){// is EC
        if (!this.useMail){
          return {
            'client_ip': this.client_ip,
            'bfNo': this.BfNo,
            'Gid' : this.Gid,
            'custom_portfolio': this.personalPortfolio,
            'notify_type': this.useMail ? 'email' : 'cellphone',
            'recom_portfolio': this.recommendedPortfolio,
            'rr_value': this.rr_value
          }

        }else{
          return {
            'client_ip': this.client_ip,
            'bfNo': this.BfNo,
            'custom_portfolio': this.personalPortfolio,
            'notify_type': this.useMail ? 'email' : 'cellphone',
            'recom_portfolio': this.recommendedPortfolio,
            'rr_value': this.rr_value
          }
        }

      }else{
        return {
          'custom_portfolio': this.personalPortfolio,
          'notify_type': this.useMail ? 'email' : 'cellphone',
          'recom_portfolio': this.recommendedPortfolio,
          'rr_value': this.rr_value
        }
      }

    }
  },
  methods: {
      async savePortfolio() {
        if(this.BfNo!==0){//EC customers
          this.localLog('this.client_ip:',this.client_ip)
          this.localLog('this.body EC:',this.body)
          await this.$api.postEC('/create',this.body,this.authorizationHeader)
        }else{
          await this.$api.postWF09('/create',this.body,this.authorizationHeader)
        }
        this.toggleModal('warning')
      }
  }
};
</script>
