<template>
  <div id="app">
    <navbar></navbar>
    <router-view />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' rel="stylesheet">
  </div>
</template>

<script>
  import 'vuetify/dist/vuetify.min.css'
  import Navbar from '@/views/Navbar.vue'

  export default {
  components: {
    Navbar
  },
  data() {
    return {
      
    }
  }
};
</script>

<style>

</style>
