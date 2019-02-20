import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  BootstrapVue,
  render: h => h(App)
}).$mount("#app");
