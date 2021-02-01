import Vue from "vue";
import Vuex from "vuex";
import data from "./origin"; // Vuex 原始資料

// https://github.com/maoberlehner/vuex-map-fields
import { getField, updateField } from "vuex-map-fields";

Vue.use(Vuex);

// new一個倒進vuex
const newState = JSON.parse(JSON.stringify(data));

export default new Vuex.Store({
  strict: true,
  state: newState,
  getters: {
    getField,
  },
  mutations: {
    updateField,
    // setKey(state, data) {
    //   state["open_no"] = data;
    // },
    // updateData(state, data) {
    //   state[data.type] = data.val;
    // },
    // updateKYC(state, data) {
    //   state["KYC_DATA"][data.type] = data.val;
    // },
    reset(state) {
      const source = data;
      Object.keys(source).forEach((key) => {
        state[key] = source[key];
      });
    },
  },
  actions: {
    // handlerKYC({ state, commit }, data) {
    //   var oldData = state["KYC_DATA"][data.type].slice();
    //   if (oldData.indexOf(data.val) > -1) {
    //     oldData.splice(oldData.indexOf(data.val), 1);
    //   } else {
    //     oldData.push(data.val);
    //   }
    //   commit("updateKYC", {
    //     type: data.type,
    //     val: oldData
    //   });
    // }
  },
});
