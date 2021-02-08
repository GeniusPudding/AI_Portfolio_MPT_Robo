<template>
  <section class="banner-type2">
    <img src="../assets/images/banner-bg.png" alt="" class="banner-type2-bg" />
    <div class="container">
      <div class="banner-type2-content">
        <h2
          class="banner-type2-tits wow animate__animated animate__fadeInUp"
          title="真‧懂你的"
        >
          真‧懂你的
        </h2>
        <h1
          class="banner-type2-tit wow animate__animated animate__fadeInUp"
          title="理財健檢機器人"
        >
          理財健檢機器人
        </h1>
        <p class="banner-type2-sTit wow animate__animated animate__fadeInUp">
          老品牌 X 新科技
        </p>
        <p class="banner-type2-text wow animate__animated animate__fadeInUp">
          <b>深耕台灣30年 您的資產，富蘭克林幫您守護</b>
        </p>
        <p
          class="banner-type2-textsmall wow animate__animated animate__fadeInUp"
        >
          您的資產健康嗎？不知道該如何做理財投資決策嗎？<br />
          富蘭克林投顧結合金融科技，推出真‧懂你的理財健檢機器人<br />
          24小時線上服務，提供您最完善的理財資產建議
        </p>
        <div class="btnArea" v-show="questionnaire == 0">
          <div class="btn">
            <a
              href="javascript:void(0);"
              title="立即進行資產檢測"
              @click="toggleModal('member')"
            >
              立即進行資產檢測 <i class="fas fa-angle-right"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="banner-type2-kv wow animate__animated animate__fadeIn">
        <img src="../assets/images/kv-aperture.png" alt="" class="banner-type2-kv-bg" />
        <img
          src="../assets/images/kv-1.png"
          alt="你的投資神隊友"
          class="banner-type2-kv-img"
        />
      </div>
      <modal ref="member" :can-close="true" class="md">
        <slot slot="infoArea">
          <div class="alertModal step1">
          <h3>富蘭克林理財帳戶請登入</h3>
          <div>
            <!-- 一般狀態 start -->
            <div class="formArea wow fadeInUp">
              <!-- 有錯誤時[.formArea-item]加[.error] -->
              <div class="formArea-item">
                <div class="formArea-item-tit">
                  <label for="id">
                    帳號
                  </label>
                </div>
                <div class="formArea-item-input">
                  <input type="text" v-model="ec_id" @keyup.enter="next" autocomplete="off" name="" placeholder="請輸入Email或身分證字號"/>
                </div>
                <div class="formArea-item-error">
                  請確認您的帳號或身分證字號
                </div>
              </div>
              <div class="formArea-item">
                <div class="formArea-item-tit">
                  <label for="password">
                    密碼
                  </label>
                </div>
                <div class="formArea-item-input">
                  <input type="password" v-model="pwd" @keyup.enter="next" autocomplete="off" name="" placeholder="請輸密碼"/>
                </div>
                <div class="formArea-item-error">
                  請確認您的密碼
                </div>
              </div>
              <!-- <div class="formArea-item">
                <div class="formArea-item-tit">
                  <label for="repassword">
                    驗證碼
                  </label>
                </div>
                <div class="formArea-item-input">
                  <input type="password" name="" id="repassword"  placeholder="請輸驗證碼"/>
                </div>
                <div class="formArea-item-error">
                  請確認您的驗證碼
                </div>
              </div> -->
              <div class="btnArea">
                <a href="">忘記密碼?</a>
                <div class="btn">
                  <a href="" :class="isSubmit ? 'disabled' : ''" :disabled="isSubmit" @click.prevent="!isSubmit ? next() : null" title="登入"> 登入 <i class="fas fa-angle-right"></i> </a>
                </div>
              </div>
            </div>
            <!-- 一般狀態 end -->

          </div>
          <h3>沒有富蘭克林理財帳戶!?</h3>
            <div class="btnArea twoBtn">
              <div class="btn">
                <a href="https://etrade.franklin.com.tw/Open/Entrance" target="_blank" title="立即開戶">
                  立即開戶
                </a>
              </div>
              <div class="btn type2">
                <a title="搶先體驗" >
                  搶先體驗
                </a>
              </div>
            </div>
          </div>
        </slot>

        <slot slot="infoArea">
          <div class="alertModal step2">
            <h3>尚未開戶，體驗版</h3>
            <div>
              <!-- 一般狀態 start -->
              <div class="formArea wow fadeInUp">
                <div class="formArea-item" >
                  <div class="formArea-item-tit">
                    <label for="name">
                      姓名
                    </label>
                  </div>
                  <div class="formArea-item-input">
                    <input type="text" name="" id="name"  placeholder="請輸入您的姓名"/>
                  </div>
                  <div class="formArea-item-error">
                    請確認您的姓名
                  </div>
                </div>
                <div class="formArea-item">
                  <div class="formArea-item-tit">
                    <label for="email">
                      Email
                    </label>
                  </div>
                  <div class="formArea-item-input">
                    <input type="email" name="" id="email" placeholder="請輸入您的Email"/>
                  </div>
                  <div class="formArea-item-error">
                    請確認您的Email
                  </div>
                </div>
                <div class="formArea-item">
                  <div class="formArea-item-tit">
                    <label for="phone">
                      手機
                    </label>
                  </div>
                  <div class="formArea-item-input">
                    <input type="tel" name="" id="phone"   placeholder="請輸入您的手機號碼"/>
                  </div>
                  <div class="formArea-item-error">
                    請確認您的手機
                  </div>
                </div>
                <div class="formArea-item">
                  <div class="formArea-item-tit">
                    <label for="id">
                      往來銀行
                    </label>
                  </div>
                  <div class="formArea-item-input">
                    <input type="text" name="" id="id" placeholder="請輸入請輸入往來銀行"/>
                  </div>
                  <div class="formArea-item-error">
                    請確認您的往來銀行
                  </div>
                </div>
                <div class="btnArea">
                  <a href="">返回登入</a>
                  <div class="btn">
                    <a href="" title="確認"> 確認 <i class="fas fa-angle-right"></i> </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </slot>

      </modal>

    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import modal from '../components/modal'
import md5 from "blueimp-md5";
export default {
  data () {
    return {
      isSubmit: false,
      pwd: "",
    };
  },
  components: {
    modal
  },
  computed: {
    ...mapState(['questionnaire']),
    loginData() {
      return {
        account: this.ec_id,
        pwd: md5(this.pwd),
      };
    }
  },
  methods: {
    toggleModal(name) {
      console.log('test toggleModal:',name)
      this.$refs[name].toggle = !this.$refs[name].toggle;
    },
    async checkLogin() {
      console.log('loginData:',this.loginData)
      const res = await fetch('https://wt.franklin.com.tw/areas/myip/myip.aspx')
      const ip = await res.text()
      console.log('ip:',ip)
      const ECheaders = {
        'x-ft-idno': loginData.account,
        'x-ft-clientip': ip,
        'x-ft-apikey': 'c6db7c09-3798-4ded-b851-c806f7066c2d'
      }
      return this.$api.login("/user/auth/login", this.loginData,ECheaders);
    },
    async next() {
      if (this.ec_id == "") {
        alert("請輸入帳號");
        return;
      }
      if (this.pwd == "") {
        alert("請輸入密碼");
        return;
      }

      if (this.isSubmit) return;
      this.isSubmit = true;
      console.log('trying login')
      try {
        var login = await this.checkLogin();
        console.log("login:", login);

        this.isLogin = true;
        // this.roro = login.Result.roro;
        // this.sales_branch_id = login.Result.branch_id;
        // this.sales_name = login.Result.name;
        this.$nextTick(() => {
          this.$cookies.set("twbLogin", {
            ec_id: this.ec_id,
            // roro: this.roro,
            // sales_branch_id: this.sales_branch_id,
            // sales_name: this.sales_name,
            // user_id: "",
            // strategyType: "",
            isLogin: true,
          });
          this.$router.push("myportfolio");
        });
      } catch (error) {
        this.isLogin = false;
        this.$api.handlerErr(error);
      } finally {
        this.isSubmit = false;
      }
    },
  }
}
</script>
