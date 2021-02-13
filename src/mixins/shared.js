export default {
  methods: {
    toggleModal(name) {
      console.log("toggleModal name:",name);
      this.$refs[name].toggle = !this.$refs[name].toggle;
    }
  }
};
