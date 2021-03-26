<template>
  <header class="header">
    <div class="container clearfix">
      <div class="logo">
        <a
          href="http://www.franklin.com.tw/"
          target="_blank"
          title="富蘭克林證券投顧"
        >
          <picture>
            <source
              media="(max-width: 991px)"
              srcset="
                https://event.franklin.com.tw/commonResources/images/logo2019.svg
              "
            />
            <img
              src="https://event.franklin.com.tw/commonResources/images/header-logo.png"
              alt="富蘭克林‧國民的基金"
            />
          </picture>
          <div class="logo-text">富蘭克林‧國民的基金</div>
        </a>
      </div>
      <nav class="navBar" v-if="$route.name !== 'home'" :class="{ show: navbarShow }">
        <ul>
          <li>Hi, {{username}} 您的風險屬性</li>
          <li v-if="isEditable">
            <select v-model="rr_value" @change="changeRR($event)">
              <option>5</option>
              <option>4</option>
              <option>3</option>
            </select>
          </li>
          <li v-else>{{risk_map[rr_value]}}</li>
        </ul>
      </nav>
      <!--手機menu按鍵-->
      <div
        class="menuBtn"
        data-wow-delay="0.8s"
        :class="{ active: menuBtnActive }"
        @click="toggleMobileNavbar()"
      >
        <span> </span>
        <span> </span>
        <span> </span>
        <span> </span>
        <span> </span>
      </div>
    </div>
  </header>
</template>
<script>
import { mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'
export default {
  data () {
    return {
      options: '',
      selectName: '',
      menuBtnActive: false, //這兩個啥意思?
      navbarShow: false, //這兩個啥意思?
      risk_map: {
        5:'積極',
        4:'穩健',
        3:'保守'
      },
      risk_inv_map: {
        '積極':5,
        '穩健':4,
        '保守':3
      }
    }
  },
  computed: {
    ...mapState(['isEditable','username']),
    ...mapFields(['risk_prop', 'rr_value' ,'rr_param'])
  },
  props: ['activeNumber'],

  mounted () {
    console.log('header mounted $route:',this.$route.name)
    if(this.$route.name !== 'home'){
      this.navbarShow = true
    }
  },
  methods: {
    changeRR (event) {
      console.log('changeRR:',event.target)
      
      this.rr_value = event.target.value//this.risk_inv_map[event.target.value]
      console.log('changeRR value:',this.rr_value)

      this.$forceUpdate()// why?
      this.rr_param = {"rr_value": this.rr_value}
      console.log('action rr_param:',this.rr_param)
    },
    toggleMobileNavbar () {
      // console.log('toggleMobileNavbar:')
      this.menuBtnActive === false
        ? (this.menuBtnActive = true)
        : (this.menuBtnActive = false)
      this.navbarShow === false
        ? (this.navbarShow = true)
        : (this.navbarShow = false)
    },
    hideMobileNavbar() {
      this.menuBtnActive = false
      this.navbarShow = false
    }
  },
}
</script>
