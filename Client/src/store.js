import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    login: "",
    token: "",
    id: ""
  },
  mutations: {
    logIn(state, data) {
      state.login = data.username;
      state.token = data.token;
      state.id = data.id;
    },
    signOut(state) {
      state.login = "";
      state.token = "";
      state.id = "";
    }
  },
  actions: {}
});
