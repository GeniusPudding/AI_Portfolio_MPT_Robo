<template>
  <transition name="modal">
    <div class="modal" v-if="toggle">
      <div class="modal-bg" @click="closeModal()" v-if="canClose == true"></div>
      <div class="modal-bg" v-if="canClose == false"></div>
      <div
        class="modal-container"
        :class="{ fixedHeight: isFixedHeight }"
        ref="modalContainer"
        id="modalContainer"
      >
        <div
          class="modal-close closeBtn"
          @click="closeModal()"
          v-if="canClose == true"
        >
          <i class="fa fa-times" aria-hidden="true"></i>
        </div>
        <div class="modal-container-infoArea">
          <slot name="infoArea"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: ["canClose"],
  data: function () {
    return {
      toggle: false,
      isFixedHeight: false,
    };
  },
  methods: {
    closeModal() {
      this.toggle = false;
    },
  },
};
</script>