<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">SPP</b-navbar-brand>

      <b-navbar-toggle target="nav_collapse"/>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav id="nav">
          <router-link to="/">Home</router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="login != ''" right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em style="color:rgba(255, 255, 255, 0.8);">{{login}}</em>
            </template>
            <b-dropdown-item @click="signOut()" href="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-navbar-nav v-if="login == ''" id="nav">
            <router-link style="margin-right: 10px;" to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import axios from "axios";
import { mapState } from "vuex";

axios.defaults.baseURL = "/";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default {
  name: "navbar",
  components: {},
  methods: {
    signOut() {
      this.$store.commit("signOut")
      this.$router.push({ path: '/login' })
    }
  },
  computed: mapState(["login"]),
  data() {
    return {};
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  color: #ffffff;
}

#nav a.router-link-exact-active {
  color: white;
}
</style>