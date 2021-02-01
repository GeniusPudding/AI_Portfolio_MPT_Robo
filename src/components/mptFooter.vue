<template>
  <footer class='footer'>
    <div class='container'>
      <div class='footer-header clearfix'>
        <div class='footer-header-left'>
          <div class='footer-header-left-logo'>
            <a
              href='http://www.franklin.com.tw/'
              target='_blank'
              title='富蘭克林證券投顧'
            >
              <img
                src='https://event.franklin.com.tw/commonResources/images/footer-logo.png'
                alt='富蘭克林證券投顧'
              />
            </a>
          </div>
          <div class='footer-header-left-companyName'>
            富蘭克林證券投資顧問(股)公司
          </div>
          <div class='footer-header-left-idCode'>
            101年金管投顧新字第025號 | 富蘭克林證券投顧獨立經營管理
          </div>
        </div>
        <div class='footer-header-right'>
          <ul class='footer-header-right-socialMedia'>
            <li>
              <a
                href='https://www.facebook.com/franklin.taiwan/'
                target='_blank'
                title='粉絲團'
              >
                <i class='fab fa-facebook-square'></i>
              </a>
            </li>
            <li>
              <a
                href='http://line.naver.jp/ti/p/%40franklin'
                target='_blank'
                title='Line'
              >
                <i class='fab fa-line'></i>
              </a>
            </li>
            <li>
              <a
                href='https://www.youtube.com/user/franklin0800885888'
                target='_blank'
                title='youtube'
              >
                <i class='fab fa-youtube'></i>
              </a>
            </li>
          </ul>
          <div class='footer-header-right-phone'>
            <div class='footer-header-right-phone-tit'>國民理財專線：</div>
            <div class='footer-header-right-phone-phone'>
              <a href='tel:0800-885-888' title='國民理財專線'> 0800-885-888 </a>
            </div>
          </div>
          <div class='footer-header-right-address'>
            106台北市大安區忠孝東路四段87號8樓
          </div>
          <div class='footer-header-right-telAndFax'>
            電話: (02)2781-0088 傳真: (02)2781-7788
          </div>
        </div>
      </div>
      <mptFooterWarning></mptFooterWarning>
      <div class='copyright'>
        <div>版權所有富蘭克林證券投顧 FRANKLIN TEMPLETON INVESTMENTS</div>
      </div>
    </div>
  </footer>
</template>

<script>
import mptFooterWarning from './mptFooterWarning'
export default {
  components: {
    mptFooterWarning
  }
}
</script>
