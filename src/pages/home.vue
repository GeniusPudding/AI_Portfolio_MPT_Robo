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
              @click="initModal"
            >
              立即進行資產檢測 <i class="fas fa-angle-right"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="banner-type2-kv wow animate__animated animate__fadeIn">
        <img
          src="../assets/images/kv-aperture.png"
          alt=""
          class="banner-type2-kv-bg"
        />
        <img
          src="../assets/images/kv-1.png"
          alt="你的投資神隊友"
          class="banner-type2-kv-img"
        />
      </div>
      <modal ref="member" :can-close="true" class="md">
        <slot slot="infoArea">
          <div class="alertModal step1">
            <h3>富蘭克林 國民E帳戶 登入</h3>
            <div>
              <!-- 一般狀態 start -->
              <div class="formArea wow fadeInUp">
                <!-- 有錯誤時[.formArea-item]加[.error] -->
                <div class="formArea-item" :class="{ error: inputAccountNameNull }">
                  <div class="formArea-item-tit">
                    <label for="id"> 帳號 </label>
                  </div>
                  <div class="formArea-item-input">
                    <input
                      type="text"
                      v-model="IdNo"
                      @keyup.enter="next"
                      autocomplete="off"
                      name=""
                      placeholder="請輸入Email或身分證字號"
                    />
                  </div>
                  <div class="formArea-item-error">
                    請輸入您的帳號或身分證字號
                  </div>
                </div>
                <div class="formArea-item" :class="{ error: inputPasswordNull }">
                  <div class="formArea-item-tit">
                    <label for="password"> 密碼 </label>
                  </div>
                  <div class="formArea-item-input">
                    <input
                      type="password"
                      v-model="Passwd"
                      @keyup.enter="next"
                      autocomplete="off"
                      name=""
                      placeholder="請輸密碼"
                    />
                  </div>
                  <div class="formArea-item-error">請輸入您的密碼</div>
                </div>
                <!-- <div class='formArea-item'>
                <div class='formArea-item-tit'>
                  <label for='repassword'>
                    驗證碼
                  </label>
                </div>
                <div class='formArea-item-input'>
                  <input type='password' name='' id='repassword'  placeholder='請輸驗證碼'/>
                </div>
                <div class='formArea-item-error'>
                  請確認您的驗證碼
                </div>
              </div> -->
                <div class="btnArea">
                  <a href="https://etrade.franklin.com.tw/Home/GetLoginPwdHint">忘記密碼?</a>
                  <div class="btn">
                    <a
                      href=""
                      :class="isSubmit ? 'disabled' : ''"
                      :disabled="isSubmit"
                      @click.prevent="!isSubmit ? next() : null"
                      title="登入"
                    >
                      登入 <i class="fas fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <!-- 一般狀態 end -->
            </div>
            <hr>
            <h3>沒有國民E帳戶!?</h3>
            <div class="btnArea twoBtn">
              <div class="btn">
                <a
                  href="https://etrade.franklin.com.tw/Open/OpenOnlineAuthenticated"
                  target="_blank"
                  title="立即開戶"
                >
                  立即開戶
                </a>
              </div>
              <div class="btn type2">
                <a title="搶先體驗" @click="switchTaste"> 搶先體驗 </a>
              </div>
            </div>
          </div>
        </slot>
      </modal>
      <modal ref="tasteModal" :can-close="true" class="md">
        <slot slot="infoArea">
          <div class="alertModal step1">
            <h3>理財健檢報告將透過您留存的聯絡方式寄送給您。</h3>
            <div>
              <!-- 一般狀態 start -->
              <div class="formArea wow fadeInUp">
                <div class="formArea-item" :class="{ error: inputTasteNameNull }">
                  <div class="formArea-item-tit">
                    <label for="name"> 姓名 </label>
                  </div>
                  <div class="formArea-item-input">
                    <input
                      type="text"
                      name=""
                      v-model="username"
                      id="name"
                      placeholder="請輸入您的姓名"
                    />
                  </div>
                  <div class="formArea-item-error">請輸入您的姓名</div>
                </div>
                <div class="formArea-item" :class="{ error: invalidEmail }">
                  <div class="formArea-item-tit">
                    <label for="email"> Email </label>
                  </div>
                  <div class="formArea-item-input">
                    <input
                      type="email"
                      name=""
                      v-model="vmodelEmail"
                      id="email"
                      placeholder="請輸入您的Email"
                    />
                  </div>
                  <div class="formArea-item-error">請確認您的Email格式</div>
                </div>
                <div class="formArea-item" :class="{ error: invalidPhone }">
                  <div class="formArea-item-tit">
                    <label for="phone"> 手機 </label>
                  </div>
                  <div class="formArea-item-input">
                    <input
                      type="tel"
                      name=""          
                      v-model="vmodelCellphone"
                      id="phone"
                      placeholder="請輸入您的手機號碼"
                    />
                  </div>
                  <div class="formArea-item-error">請確認您的手機號碼格式</div>
                </div>
              </div>
            </div>
            <div class="btnArea twoBtn">
              <div class="btn">
                <a title="返回" @click="switchTaste"> 返回 </a>
              </div>
              <div class="btn type2">
                <a title="前往體驗" @click="tasteLogin"> 前往體驗 </a>
              </div>
            </div>
          </div>
        </slot>
      </modal>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
import modal from "../components/modal";
import md5 from "blueimp-md5";
import { required, minLength, between } from 'vuelidate/lib/validators'
// import axios from "axios";
export default {
  data() {
    return {

      vmodelEmail: "",
      vmodelCellphone: "",
      inputAccountNameNull: false,
      inputPasswordNull: false,
      inputTasteNameNull: false,
      firstTyped: [false,false,false,false,false], // record five
      invalidEmail: false,
      invalidPhone: false
    };
  },
validations: {
    username: {
      required,
      minLength: minLength(4)
    },
  },
  components: {
    modal
  },
  computed: {
    ...mapState(["questionnaire"]),
    ...mapFields([
      "isLogin",
      "isSubmit",
      "isEC",
      "user_id",
      "BfNo",
      "token",
      "IdNo",
      "Passwd",
      "client_ip",
      "rr_value",
      "username",
      "Gid"
    ]),
    ECheaders() {
      return {
        "x-ft-idno": this.loginData.IdNo,
        "X-ft-clientip": this.client_ip,
        "x-ft-apikey": "c6db7c09-3798-4ded-b851-c806f7066c2d",
        "Content-Type": "application/json"
        // app:4750b422-8dec-4162-a855-5afe9626a4b7, web: c6db7c09-3798-4ded-b851-c806f7066c2d
      };
    },
    loginData() {
      return {
        IdNo: this.IdNo,
        Passwd: md5(this.Passwd)
      };
    },
    tasteData() {
      return {
        email: this.vmodelEmail,
        cellphone: this.vmodelCellphone,
        username: this.username,
        client_ip: this.client_ip
      };
    },
    // invalidEmail(){
    //   return !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.vmodelEmail)
    // },
    // invalidPhone(){
    //   return this.firstTyped[4] ? (!/09[0-9]{8}$/.test(this.vmodelCellphone)) : false
    //  }
  },
  mounted() {
    this.getIP();
    // if (this.IdNo){
    //   this.inputAccountNameNull = false
    // }
    // if (this.Passwd){
    //   this.inputPasswordNull = false
    // }
    // if (this.username){
    //   this.inputTasteNameNull = false
    // }
  },
  watch:{
    IdNo: function() {
      if (!this.firstTyped[0]){
        this.firstTyped[0] = true
        return
      }
      if (this.IdNo && this.inputAccountNameNull){
        this.switchAccountNameNull()
      }else if(!this.IdNo && !this.inputAccountNameNull){
        this.switchAccountNameNull()
      }
    },
    Passwd: function() {
      if (!this.firstTyped[1]){
        this.firstTyped[1] = true
        return
      }
      if (this.Passwd && this.inputPasswordNull){
        this.switchPasswordNull()
      }else if(!this.Passwd && !this.inputPasswordNull){
        this.switchPasswordNull()
      }
    },
    username: function() {
      if (!this.firstTyped[2]){
        this.firstTyped[2] = true
        return
      }
      this.localLog('watching username after fisrtTyped')
      if (this.username && this.inputTasteNameNull){
        this.switchTasteNameNull()
      }else if(!this.username && !this.inputTasteNameNull){
        this.switchTasteNameNull()
      }
    },
    vmodelEmail: function() {
      if (!this.firstTyped[3]){
        this.firstTyped[3] = true
      }
      this.invalidEmail = !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.vmodelEmail)
    },
    vmodelCellphone: function() {
      if (!this.firstTyped[4]){
        this.firstTyped[4] = true
      }
      this.invalidPhone =  !/09[0-9]{8}$/.test(this.vmodelCellphone)
    }

  },
  methods: {
    firstType(index){
      this.firstTyped[index] = true
      this.localLog('firstTyped:',firstTyped)
    },
    switchAccountNameNull(){
      this.inputAccountNameNull = !this.inputAccountNameNull
    },
    switchPasswordNull(){
      this.inputPasswordNull = !this.inputPasswordNull
    },
    switchTasteNameNull(){
      this.inputTasteNameNull = !this.inputTasteNameNull
    },
    initObserveInput(){
      this.inputAccountNameNull = false
      this.inputPasswordNull = false
      this.inputTasteNameNull = false
      this.invalidEmail = false
      this.invalidPhone = false
      this.firstTyped = [false,false,false,false,false]
    },
    initModal () {
      this.initObserveInput()
      this.localLog('initModal firstTyped:',this.firstTyped)
      this.toggleModal('member')
    },
    switchTaste() {
      this.initObserveInput()

      this.toggleModal("member");
      this.toggleModal("tasteModal");
    },
    async getIP() {
      let res = await fetch("https://wt.franklin.com.tw/areas/myip/myip.aspx");
      this.client_ip = await res.text();
      if(this.client_ip==''){
        this.client_ip = '210.65.139.185'
      }
      this.localLog("this.client_ip:", this.client_ip);
    },

    async tasteLogin() {
      if ( this.inputTasteNameNull || this.invalidEmail || this.invalidPhone) return
      if (!this.username || !this.vmodelEmail || !this.vmodelCellphone){
        //if login without any input && no brower's auto-save info
        this.inputTasteNameNull = !this.username
        this.invalidEmail = !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.vmodelEmail)
        this.invalidPhone = !/09[0-9]{8}$/.test(this.vmodelCellphone)
        return
      }

      if (this.isSubmit) return
      this.isSubmit = true
      // var url= 'http://10.20.1.7/www/auth'
      // var config = {
      //   method: 'post',

      //   headers:{
      //     'Content-Type' : 'application/json'
      //   },
      //   data: JSON.stringify(this.tasteData)
      // }
      // axios(url,config).then(res=>{
      //   this.localLog(JSON.stringify(res.data))
      // })
      try {
        var login = await this.$api.postWF09(
          "/auth",
          JSON.stringify(this.tasteData),
          {}
        );
        this.localLog("taste login:", login);
        this.isLogin = true;
        this.token = login.Result.token;
        this.localLog("this.token:", this.token);
        this.$nextTick(() => {
          this.$cookies.set("mptLogin", {
            IdNo: "taste",
            isLogin: true,
            token: this.token
          });
          this.$router.push("myportfolio");
        });
      } catch (error) {
        this.localLog("taste login error:",error);
        this.isLogin = false;
        this.$api.handlerErr(error);
      } finally {
        this.isSubmit = false;
      }
    },

    async ECLogin() {
      // const ECheaders = {
      //   "x-ft-idno": this.loginData.IdNo,
      //   "X-ft-clientip": this.client_ip,
      //   "x-ft-apikey": "c6db7c09-3798-4ded-b851-c806f7066c2d",
      //   "Content-Type": "application/json"
      //   // app:4750b422-8dec-4162-a855-5afe9626a4b7, web: c6db7c09-3798-4ded-b851-c806f7066c2d
      // };
      return this.$api.postEC("/auth", this.loginData, this.ECheaders);
    },
    async next() {
      if (this.inputAccountNameNull || this.inputPasswordNull ) return
      if (!this.IdNo || !this.Passwd){
        //if login without any input && no brower's auto-save info
        this.inputAccountNameNull = !this.IdNo
        this.inputPasswordNull = !this.Passwd
        return
      }
      if (this.isSubmit) return;
      this.isSubmit = true;
      this.localLog("trying login");
      try {
        var login = await this.ECLogin();
        this.localLog("login response:", login);
        // 等API確定再來接login.Result的內容到store
        if (login.Rtcode === "success") {
          //需要檢查後端回傳的登入狀態嗎?
        }

        this.isLogin = true
        // this.user_id = ''
        this.isEC = true
        this.BfNo = login.Result.BfNo
        this.Gid = login.Result.Gid
        this.token = login.Result.Token
        this.rr_value = login.Result.RiskType
        this.localLog("EC token:", this.token)
        this.$nextTick(() => {
          this.$cookies.set("mptLogin", {
            IdNo: this.IdNo,
            isLogin: true,
            token: this.token
          })
          this.$router.push("myportfolio");
        })
      } catch (error) {
        this.localLog("login error:",error)
        this.isLogin = false
        this.$api.handlerErr(error)
      } finally {
        this.isSubmit = false
      }
    }
  }
};
</script>
