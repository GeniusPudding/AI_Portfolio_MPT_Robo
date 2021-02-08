import apiList from "./interface";

const install = (Vue) => {
  if (install.installed) return;
  install.installed = true;

  Object.defineProperties(Vue.prototype, {
    $api: {
      // USE >> this.$api
      get() {
        console.log('apiList:',apiList)
        return apiList;
      },
    },
  });
};

export default install;
