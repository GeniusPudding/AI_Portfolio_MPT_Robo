<template>
  <loading v-if="!isLoaded"/>
  <div v-else class="fund-item-area">
    <ul>
      <li class="thead">
        <ol class="tr">
          <li>類型</li>
          <li>市場</li>
          <li>基金名稱</li>
          <li>投資比重(%)</li>
          <li>參考市值</li>
          <li>&ensp;</li>
        </ol>
      </li>
      <li class="tbody">
        <ol
          class="tr"
          v-for="(fundItem, $index) in personalPortfolio"
          :key="$index"
        >
          <Fragment v-if="isEditableProp">
            <Fragment v-if="fundItem.name !== '' || !isCheckingEmpty">
              <li data-title="類型">
                <select
                  @change="changeFund($event, $index)" 
                  v-model="fundItem.type"
                >
                  <option
                    v-for="option in editAsset"
                    :value="option.name"
                    :key="option.code"
                    >{{ option.name }}</option
                  >
                </select>
              </li>
              <li data-title="市場">
                <select
                  @change="changeFund($event, $index)"
                  v-model="fundItem.market"
                  :disabled="cusMarket(fundItem).length == 0"
                >
                  <option
                    v-for="option in cusMarket(fundItem)"
                    :value="option.name"
                    :key="option.name"
                    >{{ option.name }}</option
                  >
                </select>
              </li>
              <li data-title="基金名稱">
                <select
                  v-model="fundItem.name"
                  @change="changeFund($event, $index)"
                  :disabled="cusFund(fundItem).length == 0"
                >
                  <option
                    v-for="option in cusFund(fundItem)"
                    :value="option.fund.name"
                    :key="option.fund.id"
                    >{{ `${option.fund.name}` }}</option
                  >
                </select>
              </li>
              <li data-title="投資比重(%)">
                <input
                  type="text"
                  disabled="disabled"
                  class="text-center isEdit"
                  :value="calcPercent($index)"
                />
              </li>

              <li data-title="參考市值">
                <input
                  type="number"
                  step="1000"
                  min="5000"
                  class="text-center"
                  @blur="calcBudget($event, $index)"
                  v-model.number="Math.round(investmentAmount[$index])"
                />
                元
              </li>
              <li data-title="">
                <a href="" class="btn" @click.prevent="deleteFund($index)"
                  >刪除</a
                >
              </li>
            </Fragment>
          </Fragment>
          <Fragment v-else>
            <li data-title="類型">{{ fundItem.type }}</li>
            <li data-title="市場">{{ fundItem.market }}</li>
            <li data-title="基金名稱">
              <p>
                {{ `${fundItem.fund_id} ${fundItem.name}` }}
              </p>
            </li>

            <li data-title="投資比重(%)">{{ calcPercent($index)}}</li>
            <li data-title="">
              {{ showFundAmount($index) }}元
            </li>
          </Fragment>
        </ol>
      </li>
      <li v-if="isEditableProp" class="more">
        <a href="" @click.prevent="addFund" class="btn" :class="{ balloon: isEmptyPortfolio }" balloon-data="Step 1 : 根據您的庫存設定您的基金組合。">新增基金</a>
        <a href="" @click.prevent="originFund" class="btn">原始庫存</a>
      </li>
    </ul>
  </div>
</template>
<script>
/* eslint-disable */
//抓後端資料, 只有在myportfolio自訂頁面可以有修改功能, v-for
import { mapState } from "vuex"
import { mapFields } from "vuex-map-fields"
import { Fragment } from "vue-fragment"
// import axios from "axios";
// import md5 from "blueimp-md5";
// import dayjs from "dayjs"
import loading from './includes/loading.vue'
// const today = dayjs(new Date()).format("YYYY-MM-DD");
export default {
  props: {
    isEditableProp: Boolean
  },
  data() {
    return {
      budget: 100000,
      fundID_map: {}, // name to fund_id
      isTesting: false,
      isDelete: false
    };
  },
  components: { Fragment,loading },
  computed: {
    ...mapState(["BfNo", "rr_value", "IdNo", "client_ip"]),
    ...mapFields([
      "isEditable",
      "fundPool",
      "investmentAmount",
      "token",
      "rr_param",
      "personalPortfolio",
      "isCheckingEmpty",
      "authorizationHeader",
      "initPorfolio",
      "initAmount",
      "isLoaded"
    ]),
    isEmptyPortfolio(){
      this.localLog('isEmptyPortfolio personalPortfolio:',this.personalPortfolio)
      return this.personalPortfolio.length == 0
    },
    header() {
      return {
        ...this.authorizationHeader,
        "Content-Type": "application/json",
        "x-ft-idno": this.IdNo,
        "x-ft-clientip": this.client_ip,
        "x-ft-apikey": "c6db7c09-3798-4ded-b851-c806f7066c2d"
      };
    },
    body() {
      return {
        ...this.rr_param,
        bfNo: this.BfNo
      };
    },
    editAsset() {
      if (!this.fundPool) return [];
      var asset = this.fundPool.map(obj => {
        return { code: obj.code, name: obj.type };
      });
      return asset;
    }
  },
  mounted() {
    this.isEditable = this.isEditableProp;
    this.localLog("fundlist mounted this.$route.name:", this.$route.name);
    if (this.token === "") {
      this.token = this.$cookies.get("mptLogin").token;
    }
    this.authorizationHeader = { Authorization: "Bearer " + this.token };
    // this.localLog('authorizationHeader:',this.authorizationHeader)
    this.rr_param = { rr_value: this.rr_value };
    if (this.$route.name === "myportfolio") {
      this.isCheckingEmpty = false;
      this.initList();
    } else {
      this.localLog("Debug personalPortfolio:", this.personalPortfolio);
    }
  },
  watch: {

    "this.rr_value": function() {
      this.localLog('rr_value:',this.rr_value)
    }
  },
  methods: {
    async getFundPool() {
      if (this.BfNo !== 0) {
        //EC customers
        return await this.$api.getEC(
          "/fundpool",
          { rr_value: 5},
          this.authorizationHeader
        );
      } else {
        return await this.$api.getWF09(
          "/fundpool",
          { rr_value: 5},
          this.authorizationHeader
        );
      }
    },
    async getInitPortfolio() {
      if (this.BfNo !== 0) {
        //EC customers
        let response = await this.$api.postEC("/init", this.body, this.header);
        this.localLog('response.Result.init:',response.Result.init)
        return response.Result.init;
      } else {//Do not need 'init' ?
        // let response = await this.$api.getWF09(
        //   "/init",
        //   this.rr_param,
        //   this.authorizationHeader
        // );
        // return response.Result.init.portfolio;
        return []
      }
    },
    async initList() {
      try {
        this.localLog('try')
        if (this.fundPool.length !== 0) return;
        this.localLog("init List");
        var pool = await this.getFundPool();

        this.fundPool = pool.Result.fundpool;
        this.localLog("testing fundPool:", this.fundPool);

        this.personalPortfolio = await this.getInitPortfolio();
        this.localLog("portfolio:", this.personalPortfolio);

        this.initBudget();
        this.initPorfolio = [...this.personalPortfolio];
        this.initAmount = [...this.investmentAmount];
      } catch (error) {
        this.localLog('catch')
        this.$api.handlerErr(error);
      } finally {
        this.localLog('finally')
        this.isLoaded = true;
      }
    },
    showFundAmount(index){
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'TWD',
        minimumFractionDigits: 0
      })
      let fcur = formatter.format(Math.round(this.investmentAmount[index])) 
      // this.localLog('fcur:',fcur)
      return fcur
    },
    changeFund(event, index) {
      this.localLog("changeFund event:", event)
      // this.localLog("changeFund index:", index)
      let name =  event.target.value
      // this.localLog("changeFund event.target.value:",name);
      if(this.fundID_map[name]){
        this.localLog("fundID_map :", this.fundID_map[name])
        this.personalPortfolio[index].fund_id = this.fundID_map[name]
      }

      // this.localLog("select fundItem.fund:", fundItem);
    },
    cusMarket(fundItem) {
      let defaultName = fundItem.name 
      let type = fundItem.type
      this.localLog('fundItem:',fundItem)
      this.localLog('this.fundPool:',this.fundPool)
      this.localLog('fundItem.type:',fundItem.type)
      if (!this.fundPool) return [];
      var marketType = this.fundPool.filter(obj => {
        this.localLog('obj type:',obj.type)
        return obj.type == type;
      })
      if (marketType.length <= 0) return []
      this.localLog('cusMarket:',marketType)
      marketType = marketType[0]
      
      let rrMarket = marketType.markets.filter(
        obj => obj.pool.some(
          fundobj => {
            return fundobj.rr <= this.rr_value || fundobj.fund.name == defaultName
          }
        )

      )

      return rrMarket
    },
    cusFund(fundItem) {
      var defaultName = fundItem.name 
      var key = fundItem.market;
      // this.localLog('key:',key)
      if (!this.fundPool || !key) return [];

      var type = fundItem.type;
      var marketType = this.fundPool.filter(obj => {
        return obj.type == type;
      })[0]

      // this.localLog('marketType:',marketType)
      var filteredMarket = [];
      if (marketType) {
        filteredMarket = marketType.markets.filter(obj => {
          return obj.name == key;
        });
      }
      this.localLog('filteredMarket:',filteredMarket)
      // this.localLog('filteredMarket[0].pool:',filteredMarket[0].pool)
      if (filteredMarket.length <= 0) return [];
      let rrPool = filteredMarket[0].pool.filter(obj => {
          if(!this.fundID_map[obj.fund.name]){
            this.fundID_map[obj.fund.name] = obj.fund.id
          }  

          return obj.rr <= this.rr_value || obj.fund.name == defaultName // except for matched rr value, add the one in the storage
      })
      this.localLog('rrPool:',rrPool)
      return rrPool
    },
    calcPercent(index) {
      // this.localLog('calcPercent')
      var data = [];
      this.investmentAmount.forEach((obj, key) => {
        var calcValue = (obj / this.sumEditBudget()) * 100
        data[key] = this.setPercentage(calcValue, 0, false)
      })
      var tempTotalPercent = data.reduce((a, b) => {
        return a + Number(b)
      }, 0);
      if (tempTotalPercent < 100) {
        data[data.length - 1] =
          data[data.length - 1] + (100 - tempTotalPercent)
      } else if (tempTotalPercent > 100) {
        let maxIndex = data.indexOf(Math.max(...data))
        data[maxIndex] =
          data[maxIndex] - (tempTotalPercent - 100)
      }
      // this.localLog('calcPercent data:',data)
      data.forEach((obj,key)=>{
        // this.localLog('data weight:',obj)
        this.personalPortfolio[key].weight = obj
      })
      return data[index] + '%'
    },
    initBudget() {
      if (this.BfNo === 0) {
        this.budget = Math.floor(this.budget / 1000) * 1000;
        if (this.budget < 50000) this.budget = 50000;
        if (this.budget > 30000000) this.budget = 30000000;
        this.$nextTick(() => {
          this.investmentAmount = this.personalPortfolio.map(
            fund =>
              (this.setPercentage(fund.weight, 0, false) * this.budget) / 100
          );
        });
      } else {
        //EC account
        this.budget = 0;
        this.personalPortfolio.forEach((obj, key) => {
          this.investmentAmount[key] = obj.MarketValue
          this.budget += obj.MarketValue
        })
        this.calcPercent()
      }
    },
    calcBudget(evt, index) {
      this.localLog("calcBudget:",evt)
      this.$nextTick(() => {
        var tempValue = Math.floor(evt.target.value / 1000) * 1000
        this.localLog('tempValue:',tempValue)
        this.personalPortfolio[index].MarketValue = tempValue
        this.investmentAmount[index] = tempValue
        this.sumEditBudget()
      });
    },
    sumEditBudget() {
      var sum = this.investmentAmount.reduce((a, b) => {
        return a + Number(b);
      }, 0);
      return sum == 0 ? this.budget : sum;
    },
    originFund() {
      this.personalPortfolio = [...this.initPorfolio];
      this.investmentAmount = [...this.initAmount];
    },
    async addFund() {
      this.localLog('add this.personalPortfolio.__ob__:',this.personalPortfolio.__ob__)
      let testPP =  JSON.parse(JSON.stringify(this.personalPortfolio))
      this.localLog('testPP:',testPP)
      if (testPP.length >= 10) {
        this.localLog('testPP.length:',testPP.length)
        alert("自訂基金最多為 10 組！");
        return;
      }
      this.localLog('test alert')
      this.personalPortfolio.push({
        MarketValue: 0,
        fund_id: "",
        market: "",
        name: "",
        type: "",
        weight: 0
      });
      this.investmentAmount.push(5000);
    },
    deleteFund(index) {
      this.isDelete = true;
      this.personalPortfolio.splice(index, 1);
      this.investmentAmount.splice(index, 1);
      this.$nextTick(() => {
        this.isDelete = false;
      });
    }
  }
};
</script>
