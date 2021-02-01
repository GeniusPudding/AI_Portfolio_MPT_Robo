<template>
  <header class='header'>
    <div class='container clearfix'>
      <div class='logo'>
        <a
          href='http://www.franklin.com.tw/'
          target='_blank'
          title='富蘭克林證券投顧'
        >
          <picture>
            <source
              media='(max-width: 991px)'
              srcset='
                https://event.franklin.com.tw/commonResources/images/logo2019.svg
              '
            />
            <img
              src='https://event.franklin.com.tw/commonResources/images/header-logo.png'
              alt='富蘭克林‧國民的基金'
            />
          </picture>
          <div class='logo-text'>富蘭克林‧國民的基金</div>
        </a>
      </div>

      <!--手機menu按鍵-->
      <div
        class='menuBtn'
        data-wow-delay='0.8s'
        :class='{ active: menuBtnActive }'
        @click='toggleMobileNavbar()'
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
export default {
  data () {
    return {
      menuBtnActive: false,
      navbarShow: false
    }
  },
  props: ['activeNumber'],
  methods: {
    toggleMobileNavbar () {
      this.menuBtnActive === false
        ? (this.menuBtnActive = true)
        : (this.menuBtnActive = false)
      this.navbarShow === false
        ? (this.navbarShow = true)
        : (this.navbarShow = false)
    },
    hideMobileNavbar () {
      this.menuBtnActive = false
      this.navbarShow = false
    }
  }
}
</script>
