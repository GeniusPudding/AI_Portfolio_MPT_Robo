<template>
  <article class="main">
    <div id="combination"></div>
    <section class="item combination">
      <div class="container">
        <h2 class="tit-type2" title="理財健檢報告">理財健檢報告</h2>

        <report></report>

        <!-- fix button -->
        <div class="btnArea">
          <div class="btn">
            <router-link to="/compare">返回投組</router-link>
          </div>
          <saveBtn></saveBtn>
        </div>
      </div>
    </section>

    <div id="reportset"></div>
    <section class="item reportset">
      <div class="container"></div>
    </section>
  </article>
</template>
<script>
import report from '../components/report'
import saveBtn from '../components/buttons/saveBtn'
export default {
  components: {report, saveBtn},

}
</script>
