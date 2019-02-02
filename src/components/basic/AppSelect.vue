<template>
  <div>
    <select class="custom-select form-select" @change="handleChange">
        <option :value="option" v-for="(option, index) in options" v-bind:key="index">{{option}}</option>
    </select>
  </div>
</template>

<script>

export default {
  name: "select",
  props: {
      options: Array
  },
  methods: {
    handleChange: function(event) {
      this.$emit("input", event.target.value);
    },
  }
};
</script>

<style>
.form-select {
	width: 200px !important;
	margin-bottom: 10px;
}
</style>
