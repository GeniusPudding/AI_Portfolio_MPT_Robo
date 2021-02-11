<template>
  <div class="fund-item-area">
    <ul>
      <li class="thead">
        <ol class="tr">
          <li>類型</li>
          <li>市場</li>
          <li>基金名稱</li>
          <li>投資比重</li>
          <li>投資金額</li>
          <li>&ensp;</li>
        </ol>
      </li>
      <li class="tbody">
        <ol class="tr" v-for="(fundItem, $index) in personalPortfolio" :key="$index">
          <li v-if="fundItem.fund.basic.name!==''||!isCheckingEmpty" data-title="類型">
            <select  v-model="fundItem.fund.asset_type" @change="clearLipperID($index)">
              <option v-for="option in editAsset"
               :value="option"  
               :key="option.code">{{option.name}}</option>
            </select> 
          </li>
          <li v-if="fundItem.fund.basic.name!==''||!isCheckingEmpty" data-title="市場">
            <select v-model="fundItem.fund.market"
                @change="clearLipperID($index)"
                :disabled="cusMarket(fundItem.fund.asset_type).length == 0">
              <option v-for="option in cusMarket(fundItem.fund.asset_type)" 
                  :value="{
                    CustomClassification: option.CustomClassification,
                    name: option.market
                  }"
                  :key="option.CustomClassification">{{ option.market }}</option>
            </select> 
          </li>
          <li v-if="fundItem.fund.basic.name!==''||!isCheckingEmpty" data-title="基金名稱">
            <select v-model="fundItem.fund.basic"
                @change="setLipperID($index)"
                :disabled="cusFund($index, fundItem.fund.market).length == 0">
              <option v-for="option in cusFund($index, fundItem.fund.market)" 
                  :value="{
                    name: option.FundName,
                    LipperID: option.LipperID,
                    oid: option.OID,
                    bank_oid: option.bank_oid
                  }"
                  :key="option.FundName">{{ `${option.bank_oid} ${option.FundName}` }}</option>
            </select> 
          </li>
          <li v-if="fundItem.fund.basic.name!==''||!isCheckingEmpty" data-title="投資比重">
            <input type="text" disabled="disabled" class="text-center isEdit" :value="calcPercent()[$index]"/>
            %
          </li>
          <li v-if="fundItem.fund.basic.name!==''||!isCheckingEmpty" data-title="投資金額">
            <input type="number" step="1000" :disabled="!isEditable" min="5000" class="text-center" @blur="calcBudget($event, $index)" v-model.number="investmentAmount[$index]"/>
            元            
          </li>
          <li v-if="isEditable&&(fundItem.fund.basic.name!==''||!isCheckingEmpty)" data-title=""><a href="" class="btn" @click.prevent="deleteFund($index)">刪除</a></li>
        </ol>

      </li>
      <li v-if="isEditable" class="more">
        <a href="" @click.prevent="addFund" class="btn">新增基金</a>
      </li>
    </ul>
  </div>
</template>
<script>
/* eslint-disable */
//抓後端資料, 只有在myportfolio自訂頁面可以有修改功能, v-for
import { mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import { Fragment } from 'vue-fragment'
export default {
  data () {
    return {
      isTesting: false,
      isDelete: false,
      isSubmit: false,
      percent: 10,
      fund_types: {'債券':['公債型', '高收益債券型', '新興市場債券型', '投資等級公司債券型'],'股票':[],'其它':[]}
    }
  },
  components: { Fragment },
  computed: {
    ...mapState(['user_id']),
    ...mapFields(['isEditable', 'fundPool', 'investmentAmount', 'personalPortfolio', 'budget','isCheckingEmpty']),
    editAsset () {
      if (!this.fundPool) return []
      var asset = this.fundPool.map((obj) => {
        return { code: obj.Code, name: obj.Name }
      })
      return asset
    }
  },
  mounted (){
    console.log('fundlist mounted this.$route.name:', this.$route.name)
    if (this.$route.name === "myportfolio"){
      this.isEditable = true
      this.isCheckingEmpty = false
      this.initList() 
    } else {
      this.isCheckingEmpty = true
      console.log('Debug personalPortfolio:', this.personalPortfolio)
      this.isEditable = false
    }
    
  },
  methods: {
    setPercentage(val, quantile, isSign) {
      return this.$parent.setPercentage(val, quantile, isSign);
    },
    async initList () {
      if (this.isSubmit) return;
      this.isSubmit = true;
      //呼叫GET /api​/twb​/fundpool 取得 基金池, 呼叫GET /api/twb/portfolio/search 取得客戶預設投組
      // this.personalPortfolio = await this.$api.query('/api/twb/portfolio/search', this.user_id)
      // this.fundPool = await this.$api.query('/api​/twb​/fundpool')

      var pool = await this.$api.query('/fundpool')
      console.log("pool:", pool)
      this.fundPool = pool.Result
      // var portfolio = await this.$api.query('/portfolio/search', this.user_id)
      // console.log("portfolio:", portfolio)
      // this.personalPortfolio = portfolio.Result;
      this.personalPortfolio = [
        {
          fund: {
            asset_type: { code: "02", name: "債券" },
            basic: {
              LipperID: "60045700",
              bank_oid: "A813",
              name: "富蘭克林坦伯頓全球投資系列-公司債基金 A 月配息 美元",
              oid: "0825",
            },
            market: { CustomClassification: "09", name: "高收益債券型" },
          },
          weight: 40
        },
        {
          fund: {
            asset_type: { code: "02", name: "債券" },
            basic: {
            LipperID: "60045700",
            bank_oid: "A813",
            name: "富蘭克林坦伯頓全球投資系列-公司債基金 A 月配息 美元",
            oid: "0825",
            },
            market: { CustomClassification: "09", name: "高收益債券型" },
          },
          weight: 60
        },
      ]
      this.investmentAmount = [10000,15000]
      this.$nextTick(() => {
        // this.personalPortfolio = JSON.parse(JSON.stringify(this.portData || []));
        this.cusBudget();
      });

    },
    clearLipperID (index) {
      if (this.personalPortfolio[index].fund.basic.LipperID) this.personalPortfolio[index].fund.basic.LipperID = "";
    },
    cusMarket (key) {
      if (!this.fundPool) return [];
      var market = this.fundPool.filter((obj) => {
        return obj.Code == key.code
      })
      if (market.length <= 0) return []
      return market[0].Markets
    },
    cusFund (index, key) {
      if (!this.fundPool || !key) return []
      
      var type = this.personalPortfolio[index].fund.asset_type.code
      var market = this.fundPool.filter((obj) => {
        return obj.Code == type
      })[0]
      var fund = []
      if (market) {
        fund = market.Markets.filter((obj) => {
          return obj.CustomClassification == key.CustomClassification
        })
      }
      if (fund.length <= 0) return []
      return fund[0].Funds
    },
    calcPercent() {
      var data = [];
      this.investmentAmount.forEach((obj, key) => {
        var calcValue = (obj / this.sumEditBudget()) * 100;
        data[key] = this.setPercentage(calcValue, 0, false);
      });
      var tempTotalPercent = data.reduce((a, b) => {
        return a + Number(b);
      }, 0);
      if (tempTotalPercent < 100) {
        data[data.length - 1] = data[data.length - 1] + (100 - tempTotalPercent);
      } else if (tempTotalPercent > 100) {
        data[data.length - 1] = data[data.length - 1] - (tempTotalPercent - 100);
      }
      return data;
    },
    cusBudget () {
      this.budget = Math.floor(this.budget / 1000) * 1000;
      if (this.budget < 50000) this.budget = 50000;
      if (this.budget > 30000000) this.budget = 30000000;
      this.$nextTick(() => {
        this.personalPortfolio.forEach((obj, key) => {
          this.investmentAmount[key] = (this.budget * this.setPercentage(obj.weight, 0, false)) / 100;
        });
      });
    },
    calcBudget(evt, index) {
      // console.log("value:", evt.target.value, "index:", index);
      this.$nextTick(() => {
        var tempValue = Math.floor(evt.target.value / 1000) * 1000;
        this.investmentAmount[index] = tempValue;
        this.sumEditBudget();
      });
    },
    sumEditBudget() {
      var sum = this.investmentAmount.reduce((a, b) => {
        return a + Number(b);
      }, 0);
      // console.log("sum:", sum);
      return sum == 0 ? this.budget : sum;
    },
    addFund () {
      // 需同時修改'personalPortfolio', 'investmentAmount' , 看一下後端傳來的資料結構
      if (this.personalPortfolio.length >= 5) {
        alert("自訂基金最多為 5 組！");
        return;
      }
      this.personalPortfolio.push({
        fund: {
          asset_type: { code: "", name: "" },
          basic: {
            LipperID: "",
            bank_oid: "",
            name: "",
            oid: "",
          },
          market: { CustomClassification: "", name: "" },
        },
        weight: 0,
      });
      this.investmentAmount.push(5000)
    },
    deleteFund (index) {
      // 需同時修改'personalPortfolio', 'investmentAmount'
      // if (this.personalPortfolio.length <= 3) {
      //   alert("自訂基金最少為 3 組！");
      //   return;
      // }
      this.isDelete = true;
      this.personalPortfolio.splice(index, 1);
      this.investmentAmount.splice(index, 1);
      this.$nextTick(() => {
        this.isDelete = false;
      });
    },

    async setLipperID (index) {
      if (this.isDelete) return;
      var type = this.personalPortfolio[index].fund.asset_type;
      var market = this.personalPortfolio[index].fund.market;
      var fund = this.personalPortfolio[index].fund.basic;
      var filter1, filter2, filter3;

      await new Promise((resolve) => {
        filter1 = this.fundPool.filter((obj) => {
          return obj.Code == type.code;
        });

        // console.log("filter1:", filter1);
        resolve();
      });

      await new Promise((resolve) => {
        if (filter1 && filter1.length > 0) {
          // console.log("market:", market, "fund:", fund);
          filter2 = filter1[0].Markets.filter((obj) => {
            return obj.CustomClassification == market.CustomClassification;
          });
          // console.log("filter2:", filter2);
        }
        resolve();
      });

      await new Promise((resolve) => {
        if (filter2 && filter2.length > 0) {
          filter3 = filter2[0].Funds.filter((obj) => {
            return obj.bank_oid == fund.bank_oid;
          });
          console.log("filter3:", filter3);

          this.$nextTick(() => {
            this.personalPortfolio[index].fund.basic.LipperID = filter3[0].LipperID || "";
          });
        }
        resolve();
      });
    }

  }
}
</script>