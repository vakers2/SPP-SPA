import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: "",
    token: ""
  },
  mutations: {
    logIn (state, login, token) {
      state.login = login
      state.token = token
    }
  },
  actions: {}
});
