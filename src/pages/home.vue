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
    </div>
  </section>
</template>
