import Vue from 'vue'
import Vuex from 'vuex'
import { login } from "../api/user"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowLoading: false,
    username: ""
  },
  mutations: {
    showLoading(state) {
      state.isShowLoading = true
    },
    hideLoading(state) {
      state.isShowLoading = false
    },
    setUsername(state, username) {
      state.username = username
    }
  },
  actions: {
    async toLogin({ commit }, username) {

      const res = await login(username)

      if (res.code === 0) {
        commit("setUsername", res.username)
      } else {
        return Promise.reject(res.data)
      }
    }
  },
  modules: {
  }
})
