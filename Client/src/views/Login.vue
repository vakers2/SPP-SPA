<template>
  <v-container>
    <v-layout row class="text-xs-center">
      <v-container style="position: relative;top: 13%;" class="text-xs-center">
        <v-card class="login-card" flat>
          <v-card-title primary-title>
            <h4 v-if="login">Login</h4>
            <h4 v-if="!login">Register</h4>
          </v-card-title>
          <v-form>
            <v-text-field v-model="username" prepend-icon="person" name="Username" label="Username"></v-text-field>
            <v-text-field
              v-model="password"
              prepend-icon="lock"
              name="Password"
              label="Password"
              type="password"
            ></v-text-field>
            <v-card-actions>
              <v-btn
                @click="signup()"
                style="background-color: #007bff;"
                class="btn btn-primary"
                large
                block
              >{{LoginLabel}}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import axios from "axios";

axios.defaults.baseURL = "/";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default {
  name: "login",
  components: {},
  computed: {
    LoginLabel() {
      return this.login ? "Log in" : "Sign up";
    },
    getUrl() {
      return this.$route.path;
    }
  },
  watch: {
    getUrl: function() {
      Object.assign(this.$data, this.$options.data.apply(this));
    }
  },
  props: {
    login: Boolean
  },
  methods: {
    signup: function() {
      if (
        this.username != "" &&
        this.password != "" &&
        this.password.length >= 6
      ) {
        let username = this.username;
        let password = this.password;
        if (this.login) {
          axios.post(
              "http://localhost:3000/login",
              { username, password },
              {
                headers: {
                  "Content-Type": "application/json"
                }
              }
            )
            .then(res => {
              if (res.data.status == "success") {
                let token = res.data.token;
                this.$store.commit("logIn", { username, token });
                this.$router.push({ path: "/board" });
              }
            })
            .catch(error => {
              alert(error);
            });
        } else {
          axios.post(
              "http://localhost:3000/signup",
              { username, password },
              {
                headers: {
                  "Content-Type": "application/json"
                }
              }
            )
            .then(res => {
              axios.post(
                  "http://localhost:3000/login",
                  { username, password },
                  {
                    headers: {
                      "Content-Type": "application/json"
                    }
                  }
                )
                .then(res => {
                  if (res.data.status == "success") {
                    let token = res.data.token;
                    this.$store.commit("logIn", { username, token });
                    this.$router.push({ path: "/board" });
                  }
                })
                .catch(error => {
                  alert(error);
                });
            });
        }
      }
    }
  },
  data() {
    return {
      username: "",
      password: ""
    };
  }
};
</script>

<style>
.container {
  width: 500px;
}

.login-card {
  border: solid 1px black !important;
  padding: 10px !important;
}
</style>

