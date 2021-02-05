
<template>
  <div id='app' v-cloak>
    <!-- <img src='./assets/logo.png'> -->
    <div id='top'></div>
    <mptHeader></mptHeader>
    <article class='main'>
      <router-view questionnaire="questionnaire"></router-view>
    </article>
    <mptFooter></mptFooter>
    <fixedRightBtns></fixedRightBtns>
    <topBtn></topBtn>
  </div>
</template>

<script>
/* eslint-disable */
// import { mapFields } from 'vuex-map-fields';
import mptHeader from './components/mptHeader';
import mptFooter from './components/mptFooter';
import fixedRightBtns from './components/buttons/fixedRightBtns';
import topBtn from './components/buttons/topBtn';
import front from './mixins/front'
import newQuestionnaire from './mixins/newQuestionnaire'
import slickFunction from './mixins/slickFunction'
import $ from 'jquery'
import 'animate.css'
import WOW from 'wow.js'

export default {
  name: 'App',
  mixins: [front, slickFunction, newQuestionnaire],
  components: { mptHeader, mptFooter, topBtn, fixedRightBtns},
  data() {
    return {
    name: '富蘭克林證券投顧',
    screenWidth: document.body.clientWidth,
    screenHeight: document.body.clientHeight,
    windowWidth: $(window).innerWidth(),
    windowHeight: $(window).innerHeight(),
    ieUseMask: true,
    thisPath: location.protocol + '//' + location.host,
    step: 1,
    // questionnaire: 0,
    q1: '',
    complete: false,
    planDetails: false,
    indexQaShow: [true, false, false, false]
  }},
  mounted () {
    // this.signature()
    this.addNoOpener()
    this.useJq()
    this.hideIeMask()
    this.showTarget()
    this.topBtn()
    // this.sameHeight('concept-item-text')
    this.scrollMagic()

    $(window).resize(() => {
      this.windowWidth = $(window).innerWidth()
      this.windowHeight = $(window).innerHeight()
      // this.sameHeight('concept-item-text')
    })
  },
  methods: {
    signature() {
      console.log(
        "%cMade by Captain%c2020/05",
        "color: #fff; border-radius: 5px; background: #1a4f9c; padding: 2px 10px; font-weight: bold;",
        "color: #000; border-radius: 5px; background: #ffde00; padding: 2px 10px; margin: 0px 5px;"
      );
    },
    toggleMobileNavbar() {
      this.menuBtnActive === false ? (this.menuBtnActive = true) : (this.menuBtnActive = false);
      this.navbarShow === false ? (this.navbarShow = true) : (this.navbarShow = false);
    },
    hideMobileNavbar() {
      this.menuBtnActive = false;
      this.navbarShow = false;
    },
    sameHeight(name) {
      let item = $("." + name),
        itemLeight = item.length,
        giftItemHeight = [];

      item.removeAttr("style");

      for (let n = 0; n < itemLeight; n++) {
        giftItemHeight[n] = item.eq(n).innerHeight();
      }
      let height = Math.max.apply(null, giftItemHeight);
      item.css("height", height);
    },
    addNoOpener() {
      // 資安用  target="_blank" 加 rel="nofollow me noopener noreferrer"
      var _linkHasTargetBlank = $('a[target="_blank"]');
      for (var n = 0; n < _linkHasTargetBlank.length; n++) {
        // 如果要連的網址跟這網站網域不同  加[rel="nofollow me noopener noreferrer"]
        _linkHasTargetBlank.eq(n).attr("href").indexOf(this.thisPath) ? _linkHasTargetBlank.eq(n).attr("rel", "nofollow me noopener noreferrer") : "";
      }
    },
    hideIeMask() {
      // ie用的遮罩
      setTimeout(() => {
        this.ieUseMask = false;
      }, 4000);
    },
    showTarget() {
      // 抓網址參數判斷要馬上顯示的區塊
      var url = location.href,
        i,
        openInfo = "";

      if (url.indexOf("?") != -1) {
        // 抓取網址參數判斷 --- Start
        function getUrlParams(url) {
          // 回傳網址參數Object
          var params = {};
          (url + "?")
            .split("?")[1]
            .split("&")
            .forEach(function (pair) {
              pair = (pair + "=").split("=").map(decodeURIComponent);
              if (pair[0].length) {
                params[pair[0]] = pair[1];
              }
            });
          return params;
        }

        var obj = getUrlParams(location.href);
        // 因為#hash會直接串在最後一個參數後面, 故需要取代處理
        if (Object.keys(obj).length && obj.hasOwnProperty("openInfo"))
          openInfo = obj.openInfo.indexOf("#") > -1 ? obj.openInfo.replace(location.hash, "") : obj.openInfo;
        // 抓取網址參數判斷 --- End

        if (this.$refs[openInfo] != undefined) {
          this.$refs[openInfo].toggle = true;
          if (openInfo == "q1" || openInfo == "q2" || openInfo == "q3" || openInfo == "q4") {
            setTimeout(function () {
              var targetOffset = $(".qa").offset().top;
              window.scrollTo(0, targetOffset);
            }, 500);
          }
          if (openInfo == "fund1" || openInfo == "fund2" || openInfo == "fund3" || openInfo == "fund4") {
            setTimeout(function () {
              var targetOffset = $("#recommend").offset().top;
              window.scrollTo(0, targetOffset - 100);
            }, 500);
          }
        }
        if (openInfo == "recommend") {
          setTimeout(function () {
            var targetOffset = $("#recommend").offset().top;
            window.scrollTo(0, targetOffset - 100);
            // console.log(openInfo, targetOffset);
          }, 500);
        }
        /*
				            例 /index.html?openInfo=q1
				        */
      }
    },
    topBtn() {
      $(window)
        .bind("scroll resize", function () {
          var $this = $(this);
          var $this_Top = $this.scrollTop();

          //當高度小於100時，關閉區塊
          if ($this_Top < 100) {
            $(".topBtn").stop().css({
              transform: "matrix(1, 0, 0, 1, 0, 400)",
              opacity: 0,
            });
          }
          if ($this_Top > 100) {
            $(".topBtn").stop().css({
              transform: "matrix(1, 0, 0, 1, 0, 0)",
              opacity: 1,
            });
          }
        })
        .scroll();
    },
    indexQa(index) {
      if (this.windowWidth >= 768) {
        this.$set(this.indexQaShow, 0, false);
        this.$set(this.indexQaShow, 1, false);
        this.$set(this.indexQaShow, 2, false);
        this.$set(this.indexQaShow, 3, false);
      }
      let x = this.indexQaShow[index] ? false : true;
      this.$set(this.indexQaShow, index, x);
    },

    //-------------------------------------scrollMagic
    scrollMagic() {
      // init controller
      var controller = new this.$scrollmagic.Controller();

      // banner --------------------------------------------------
      var bannerTimeLine = new TimelineMax();

      this.$scrollmagic.scene({
        triggerElement: ".banner",
        offset: 0,
      })
        .setTween(bannerTimeLine)
        .addTo(controller);

        bannerTimeLine
        .add(
          TweenMax.from(".banner-content", 0.5, {
            y: 100,
            opacity: 0,
          })
        )
        .add(
          TweenMax.from(".banner-kv", 0.5, {
            // y: 100,
            opacity: 0,
          })
        )
        .add(
          TweenMax.from(".banner-content .btn", 0.5, {
            y: 100,
            opacity: 0,
          })
        );

      TweenMax.fromTo(
        ".banner-content .btn i",
        1,
        {
          y: -10,
          opacity: 0,
        },
        {
          y: 5,
          ease: Linear.easeNone,
          repeat: -1,
          opacity: 1,
        }
      );

      // 特色 --------------------------------------------------
      var featuresTimeLine = new TimelineMax();

      this.$scrollmagic.scene({
        triggerElement: ".features",
        offset: -300,
      })
        .setTween(featuresTimeLine)
        // .addIndicators({name: "1 (duration: 0)"})
        .addTo(controller);

      featuresTimeLine
        .add(
          TweenMax.from(".features-content-robot", 0.3, {
            x: -50,
            opacity: 0,
          })
        )
        .add(
          TweenMax.from(".features .tit-type1", 0.4, {
            y: 100,
            opacity: 0,
          })
        )
        .add(
          TweenMax.from(".features-item:eq(0)", 0.2, {
            y: 100,
            opacity: 0,
          })
        )
        .add(
          TweenMax.from(".features-item:eq(1)", 0.2, {
            y: 100,
            opacity: 0,
          })
        )
        .add(
          TweenMax.from(".features-item:eq(2)", 0.2, {
            y: 100,
            opacity: 0,
          })
        )
        .add(
          TweenMax.from(".features-item:eq(3)", 0.2, {
            y: 100,
            opacity: 0,
          })
        );

      // 立即親身體驗 --------------------------------------------------
      var experienceTimeLine = new TimelineMax();
      this.$scrollmagic.scene({
        triggerElement: ".experience",
        offset: -100,
      })
        .setTween(experienceTimeLine)
        // .addIndicators({name: "1 (duration: 0)"})
        .addTo(controller);

      experienceTimeLine
        .add(
          TweenMax.from(".experience-robot", 0.4, {
            x: -50,
            opacity: 0,
          })
        )
        .add(
          TweenMax.from(".experience .tit-type1", 0.4, {
            y: 100,
            opacity: 0,
          })
        )
        .add(
          TweenMax.from(".experience-step", 0.4, {
            y: 100,
            opacity: 0,
          })
        );
    },

    //-------------------------------------送出問卷
    sendQuestionnaire() {
      this.step = 2;
      this.questionnaire++;
      setTimeout(() => {
        this.complete = true;
        this.step = 3;
        let pos = $("#experience-step").offset().top;
        $("html,body").animate(
          {
            scrollTop: pos,
          },
          1000
        );
      }, 6000);
    },

    //-------------------------------------使用jq區塊
    useJq() {
      //-------------------------------------錨點平滑滾動效果
      $('a[href*="#"]').click(function () {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
          var $target = $(this.hash);
          $target = ($target.length && $target) || $("[name=" + this.hash.slice(1) + "]");
          if ($target.length) {
            var targetOffset = $target.offset().top;
            $("html,body").animate(
              {
                scrollTop: targetOffset,
              },
              1000
            );
            return false;
          }
        }
      });

      new WOW().init();
    },

    //-------------------------------------播放聲音
    playVoice(hz) {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      (function () {
        if (!window.AudioContext) {
          console.log("當前瀏覽器不支援Web Audio API");
          return;
        }

        // 創建新的音頻上下文接口
        var audioCtx = new AudioContext();

        // 發出的聲音頻率數據，表現為音調的高低(赫茲Hz)
        var arrFrequency = [hz, hz];

        // 音調依次遞增或者遞減處理需要的參數
        var start = 0,
          direction = 1;

        // 當前頻率
        var frequency = arrFrequency[start];
        // 如果到頭，改變音調的變化規則（增減切換）
        if (!frequency) {
          direction = -1 * direction;
          start = start + 2 * direction;
          frequency = arrFrequency[start];
        }
        // 改變索引，下一次hover時候使用
        start = start + direction;

        // 創建一個OscillatorNode, 它表示一個週期性波形（振盪），基本上來說創造了一個音調
        var oscillator = audioCtx.createOscillator();
        // 創建一個GainNode,它可以控制音頻的總音量
        var gainNode = audioCtx.createGain();
        // 把音量，音調和終節點進行關聯
        oscillator.connect(gainNode);
        // audioCtx.destination返回AudioDestinationNode對象，表示當前audio context中所有節點的最終節點，一般表示音頻渲染設備
        gainNode.connect(audioCtx.destination);
        // 指定音調的類型，其他還有sine|square|triangle|sawtooth
        oscillator.type = "sine";
        // 設置當前播放聲音的頻率，也就是最終播放聲音的調調
        oscillator.frequency.value = frequency;
        // 當前時間設置音量為0
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        // 0.01秒後音量為1
        gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
        // 音調從當前時間開始播放
        oscillator.start(audioCtx.currentTime);
        // 1秒內聲音慢慢降低，是個不錯的停止聲音的方法
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
        // 1秒後完全停止聲音
        oscillator.stop(audioCtx.currentTime + 1);
      })();
    },
  },
  watch: {
    screenWidth(val) {
      this.screenWidth = val;
    },
    screenHeight(val) {
      this.screenHeight = val;
    },
    windowWidth(val) {
      this.windowWidth = val;
    },
    windowHeight(val) {
      this.windowHeight = val;
    },
  }
};
</script>

<style>
@import url("https://use.fontawesome.com/releases/v5.2.0/css/all.css");
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC:400,700&display=swap");
@import url("https://event.franklin.com.tw/commonResources/css/slick.css" );
@import url("./assets/css/animate-v4.0.0.css");
@import url('./assets/css/style.css'); 
@import url("./assets/css/element-ui.css");
/* #app { 
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
[v-cloak] {
  opacity: 0;
}
</style>
