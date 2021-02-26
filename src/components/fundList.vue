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
          <Fragment v-if="isEditableProp">
          <Fragment v-if="fundItem.name!==''||!isCheckingEmpty">
          <li data-title="類型">
            <select  v-model="fundItem.type" @change="changeFund(fundItem)">
              <option v-for="option in editAsset"
               :value="option.name"  
               :key="option.code">{{option.name}}</option>
            </select> 
          </li>
          <li data-title="市場">
            <select v-model="fundItem.market"
                @change="changeFund(fundItem)"
                :disabled="cusMarket(fundItem.type).length == 0">
              <option v-for="option in cusMarket(fundItem.type)" 
                  :value="option.name"
                  :key="option.name">{{ option.name }}</option>
            </select> 
          </li>
          <li data-title="基金名稱">
            <select v-model="fundItem.name"
                @change="changeFund(fundItem)"
                :disabled="cusFund(fundItem).length == 0">
              <option v-for="option in cusFund(fundItem)" 
                  :value="option.fund.name"
                  :key="option.fund.id">{{ `${option.fund.name}` }}</option>
            </select> 
          </li>
          <li data-title="投資比重">
            <input type="text" disabled="disabled" class="text-center isEdit" :value="calcPercent()[$index]"/>
            %
          </li>
          
          <li data-title="投資金額">
            <input type="number" step="1000" min="5000" class="text-center" @blur="calcBudget($event, $index)" v-model.number="investmentAmount[$index]"/>
            元            
          </li>
          <li data-title=""><a href="" class="btn" @click.prevent="deleteFund($index)">刪除</a></li>
          </Fragment>
          </Fragment>
          <Fragment v-else>
          <li data-title="類型">{{fundItem.type}}</li>
          <li data-title="市場">{{fundItem.market}}</li>
          <li data-title="基金名稱">
            <p>
              {{`${fundItem.fund_id} ${fundItem.name}`}}
            </p>  
          <li data-title="投資比重">{{calcPercent()[$index]}}</li>
          <li data-title="投資金額">{{Math.round(investmentAmount[$index])}}元</li>
          </Fragment>
        </ol>

      </li>
      <li v-if="isEditableProp" class="more">
        <a href="" @click.prevent="addFund" class="btn">新增基金</a>  
        <a href="" @click.prevent="originFund" class="btn">原始庫存</a>
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
import axios from 'axios'
import md5 from 'blueimp-md5'
import dayjs from 'dayjs'
const today = dayjs(new Date()).format('YYYY-MM-DD')
export default {
  props: {
    isEditableProp : Boolean
  },
  data () {
    return {
      isTesting: false,
      isDelete: false,
      isSubmit: false,
      // rr_param: {},
      // authorizationHeader : {}
    }
  },
  components: { Fragment },
  computed: {
    ...mapState(['user_id', 'BfNo','rr_value', 'IdNo', 'client_ip']),
    ...mapFields(['isEditable', 'fundPool', 'investmentAmount', 'token', 'rr_param',
    'personalPortfolio', 'budget','isCheckingEmpty', 'authorizationHeader',
    'initPorfolio', 'initAmount', 'recommendedSource']),
    header () {
      return  {
        ...this.authorizationHeader,
        "Content-Type": "application/json",
        "x-ft-idno": this.IdNo,
        "x-ft-clientip": this.client_ip,
        "x-ft-apikey": "c6db7c09-3798-4ded-b851-c806f7066c2d"
      }
    },
    body () {
      return  {
        ...this.rr_param,
        "bfNo": this.BfNo        
      }
    },   
    editAsset () {
      if (!this.fundPool) return []
      var asset = this.fundPool.map((obj) => {
        return { code: obj.code, name: obj.type }
      })
      return asset
    }
  },
  mounted (){
    this.isEditable = this.isEditableProp
    console.log('fundlist mounted this.$route.name:', this.$route.name)
    if(this.token===''){
      this.token =  this.$cookies.get('mptLogin').token
    }
    this.authorizationHeader = {"Authorization": 'Bearer '+this.token}
    // console.log('authorizationHeader:',this.authorizationHeader)
    this.rr_param = {"rr_value": this.rr_value }
    if (this.$route.name === "myportfolio"){
      this.isCheckingEmpty = false
      this.initList() 
    } else {
      console.log('Debug personalPortfolio:', this.personalPortfolio)
    }
    
  },
  watch: {
    '$store.state.personalPortfolio': function() {
      let p = this.$store.state.personalPortfolio
      console.log('this.$store.state.personalPortfolio:',p)
      if(p.length>2){
        this.recommendedSource = 'mpt'
        console.log('personalPortfolio MPT')  
      }else{
        this.recommendedSource = 'tv'
        console.log('personalPortfolio TV')  
      } 
    }
  },
  methods: {
    async getFundPool(){
      if(this.BfNo!==0){//EC customers
        return await this.$api.getEC('/fundpool',this.rr_param,this.authorizationHeader)
      }else{
        return await this.$api.getWF09('/fundpool',this.rr_param,this.authorizationHeader)
      }   
    },
    async getInitPortfolio () {
      if(this.BfNo!==0){//EC customers
        let response = await this.$api.postEC('/init',this.body,this.header)
        // console.log('response.Result.init.:',response.Result.init)
        return response.Result.init
      }else{
        let response = await this.$api.getWF09('/init',this.rr_param,this.authorizationHeader)
        return response.Result.init.portfolio
      }  
    },
    async initList () {
      if (this.isSubmit) return
      this.isSubmit = true;
      if (this.fundPool.length !== 0) return
      console.log("init List")
      var pool = await this.getFundPool()
      
      this.fundPool = pool.Result.fundpool
      console.log("testing fundPool:", this.fundPool)

      // let config = {
      //   method: 'get',

      //   headers:{
      //     'Authorization' : md5(`${today} Franklin`)
      //   },
      // }
      // var originfundPool = await axios('https://www.jlf.com.tw/api/twb/fundpool',config)
      // this.fundPool = originfundPool//.data.Result
      // console.log("origin fundPool:", originfundPool)
      // console.log("origin res:", this.fundPool.data.Result)
      this.personalPortfolio = await this.getInitPortfolio()
      console.log("portfolio:", this.personalPortfolio)

      this.cusBudget();
      this.initPorfolio = [...this.personalPortfolio]
      this.initAmount = [...this.investmentAmount]
      this.$nextTick(() => {
        
        this.isSubmit = false
        });

    },
    changeFund (fundItem) {
      console.log('select fundItem:',fundItem)
    },
    cusMarket (key) {
      // console.log('key:',key)
      if (!this.fundPool) return [];
      var market = this.fundPool.filter((obj) => {
        return obj.type == key
      })
      // console.log('cusMarket:',market)
      // console.log('cusMarket markets:',market[0].markets)
      if (market.length <= 0) return []
      return market[0].markets
    },
    cusFund (fundItem) {
      var key = fundItem.market
      // console.log('key:',key)
      if (!this.fundPool || !key) return []
      
      var type = fundItem.type
      var market = this.fundPool.filter((obj) => {
        return obj.type == type
      })[0]
      // console.log('market:',market)
      var filteredMarket = []
      if (market) {
        filteredMarket = market.markets.filter((obj) => {
          return obj.name == key
        })
      } 
      // console.log('filteredMarket:',filteredMarket)
      // console.log('filteredMarket[0].pool:',filteredMarket[0].pool)
      if (filteredMarket.length <= 0) return []
      return filteredMarket[0].pool
    },
    calcPercent() {
      // console.log('calcPercent')
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
      // console.log('calcPercent data:',data)
      return data;
    },
    cusBudget () {
      if(this.BfNo===0){
        this.budget = Math.floor(this.budget / 1000) * 1000;
        if (this.budget < 50000) this.budget = 50000;
        if (this.budget > 30000000) this.budget = 30000000;
        this.$nextTick(() => {
          this.investmentAmount = this.personalPortfolio.map(fund=>this.setPercentage(fund.weight, 0, false)*this.budget/100)
        });
      }else{//EC account
        this.budget = 0
        
        this.personalPortfolio.forEach((obj, key) => {
          // console.log('obj.MarketValue:',obj.MarketValue)
          this.investmentAmount[key] = obj.MarketValue
          this.budget += obj.MarketValue
        });
        this.personalPortfolio.forEach((obj, key) => {
          obj.weight = this.calcPercent()[key]
          console.log('obj.weight:',obj.weight)
        });
      }

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
      return sum == 0 ? this.budget : sum;
    },
    originFund () {
      this.personalPortfolio = [...this.initPorfolio]
      this.investmentAmount = [...this.initAmount]
    },
    addFund () {
      if (this.personalPortfolio.length >= 5) {
        alert("自訂基金最多為 5 組！");
        return;
      }
      this.personalPortfolio.push({
        fund_id: '',
        market: '',
        name:　'',
        type: '',
        // weight: 0,
      });
      this.investmentAmount.push(5000)
    },
    deleteFund (index) {
      this.isDelete = true;
      this.personalPortfolio.splice(index, 1)
      this.investmentAmount.splice(index, 1)
      this.$nextTick(() => {
        this.isDelete = false
      })
    }

  }
}
</script>