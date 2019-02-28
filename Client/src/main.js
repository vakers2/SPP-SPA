import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import VueSocketIO from "vue-socket.io";

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(BootstrapVue);
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:3000",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

new Vue({
  router,
  store,
  BootstrapVue,
  render: h => h(App)
}).$mount("#app");
