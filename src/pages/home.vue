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
            <h3>富蘭克林理財帳戶請登入</h3>
            <div>
              <!-- 一般狀態 start -->
              <div class="formArea wow fadeInUp">
                <!-- 有錯誤時[.formArea-item]加[.error] -->
                <div class="formArea-item">
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
                    請確認您的帳號或身分證字號
                  </div>
                </div>
                <div class="formArea-item">
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
                  <div class="formArea-item-error">請確認您的密碼</div>
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
                  <a href="">忘記密碼?</a>
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
            <h3>沒有富蘭克林理財帳戶!?</h3>
            <div class="btnArea twoBtn">
              <div class="btn">
                <a
                  href="https://etrade.franklin.com.tw/Open/Entrance"
                  target="_blank"
                  title="立即開戶"
                >
                  立即開戶
                </a>
              </div>
              <div class="btn type2">
                <a title="搶先體驗" @click="openTaste"> 搶先體驗 </a>
              </div>
            </div>
          </div>
        </slot>
      </modal>
      <modal ref="tasteModal" :can-close="true" class="md">
        <slot slot="infoArea">
          <div class="alertModal step1">
            <h3>尚未開戶，體驗版</h3>
            <div>
              <!-- 一般狀態 start -->
              <div class="formArea wow fadeInUp">
                <div class="formArea-item">
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
                  <div class="formArea-item-error">請確認您的姓名</div>
                </div>
                <div class="formArea-item">
                  <div class="formArea-item-tit">
                    <label for="email"> Email </label>
                  </div>
                  <div class="formArea-item-input">
                    <input
                      type="email"
                      name=""
                      v-model="email"
                      id="email"
                      placeholder="請輸入您的Email"
                    />
                  </div>
                  <div class="formArea-item-error">請確認您的Email</div>
                </div>
                <div class="formArea-item">
                  <div class="formArea-item-tit">
                    <label for="phone"> 手機 </label>
                  </div>
                  <div class="formArea-item-input">
                    <input
                      type="tel"
                      name=""
                      v-model="cellphone"
                      id="phone"
                      placeholder="請輸入您的手機號碼"
                    />
                  </div>
                  <div class="formArea-item-error">請確認您的手機</div>
                </div>
              </div>
            </div>
            <div class="btnArea">
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
// import axios from "axios";
export default {
  data() {
    return {
      // IdNo: "",
      // isSubmit: false,
      // Passwd: "",
      // username: "",
      email: "",
      cellphone: ""
    };
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
      "username"
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
        email: this.email,
        cellphone: this.cellphone,
        username: this.username,
        client_ip: this.client_ip
      };
    }
  },
  mounted() {
    this.getIP();
  },
  methods: {
    openTaste() {
      this.toggleModal("member");
      this.toggleModal("tasteModal");
    },
    async getIP() {
      let res = await fetch("https://wt.franklin.com.tw/areas/myip/myip.aspx");
      this.client_ip = await res.text();
      console.log("this.client_ip:", this.client_ip);
    },
    // toggleModal(name) {
    //   console.log("test toggleModal:", name);
    //   this.$refs[name].toggle = !this.$refs[name].toggle;
    // },
    async tasteLogin() {
      if (this.isSubmit) return;
      this.isSubmit = true;
      // var url= 'http://10.20.1.7/www/auth'
      // var config = {
      //   method: 'post',

      //   headers:{
      //     'Content-Type' : 'application/json'
      //   },
      //   data: JSON.stringify(this.tasteData)
      // }
      // axios(url,config).then(res=>{
      //   console.log(JSON.stringify(res.data))
      // })
      try {
        var login = await this.$api.postWF09(
          "/auth",
          JSON.stringify(this.tasteData),
          {}
        );
        console.log("taste login:", login);
        this.isLogin = true;
        this.token = login.Result.token;
        console.log("this.token:", this.token);
        this.$nextTick(() => {
          this.$cookies.set("mptLogin", {
            IdNo: "taste",
            isLogin: true,
            token: this.token
          });
          this.$router.push("myportfolio");
        });
      } catch (error) {
        console.log("taste login error");
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
      if (this.IdNo === "") {
        alert("請輸入帳號");
        return;
      }
      if (this.Passwd === "") {
        alert("請輸入密碼");
        return;
      }

      if (this.isSubmit) return;
      this.isSubmit = true;
      console.log("trying login");
      try {
        var login = await this.ECLogin();
        console.log("login response:", login);
        // 等API確定再來接login.Result的內容到store
        if (login.Rtcode === "success") {
          //需要檢查後端回傳的登入狀態嗎?
        }

        this.isLogin = true;
        // this.user_id = ''
        this.isEC = true;
        this.BfNo = login.Result.BfNo;
        this.token = login.Result.Token;
        this.rr_value = login.Result.RiskType;
        console.log("EC token:", this.token);
        this.$nextTick(() => {
          this.$cookies.set("mptLogin", {
            IdNo: this.IdNo,
            isLogin: true,
            token: this.token
          });
          this.$router.push("myportfolio");
        });
      } catch (error) {
        console.log("login error");
        this.isLogin = false;
        this.$api.handlerErr(error);
      } finally {
        this.isSubmit = false;
      }
    }
  }
};
</script>
