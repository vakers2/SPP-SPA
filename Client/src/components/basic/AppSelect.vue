<template>
  <div>
    <select class="custom-select form-select" @change="handleChange">
        <option value="WTF" v-if="placeholder != ''">{{placeholder}}</option>      
        <option :value="option" v-for="(option, index) in options" v-bind:key="index">{{option}}</option>
    </select>
  </div>
</template>

<script>

export default {
  props: {
      options: Array,
      placeholder: {
        type: String,
        default: ""
      }
  },
  methods: {
    handleChange: function(event) {
      this.$emit("input", event.target.value);
    },
  }
};
</script>

<style>
</style>
