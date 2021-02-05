import Vue from 'vue'
import Vuex from 'vuex'
import data from './origin' // Vuex 原始資料

// https://github.com/maoberlehner/vuex-map-fields
import { getField, updateField } from 'vuex-map-fields'

Vue.use(Vuex)

// new一個倒進vuex
const newState = JSON.parse(JSON.stringify(data))

export default new Vuex.Store({
  strict: true,
  state: newState,
  getters: {
    getField
  },
  mutations: {
    updateField,
    reset (state) {
      const source = data
      Object.keys(source).forEach((key) => {
        state[key] = source[key]
      })
    }
  }
})
