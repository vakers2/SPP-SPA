<template>
  <div class="home">
    <app-select v-model="task" class="inline" :options="tasks"></app-select>
    <app-select v-model="progress" class="inline" :options="statuses"></app-select>
    <div class="center">
      <date-picker :input-class="'form-control'" class="form-group center" :value="state.date"></date-picker>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AppSelect from "@/components/basic/AppSelect.vue";
import DatePicker from "vuejs-datepicker";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

const tasks = ['Sleep', 'Do labs', 'Watch anime']
const statuses = ['Not started', 'In progress', 'Finished']

export default {
  name: "home",
  components: {
    AppSelect,
    DatePicker,
    Dropzone
  },
  data() {
    return {
      tasks,
      statuses,
      task: 'Sleep',
      progress: 'Not started',
      state: {
        date: new Date(2019, 1,  16)
      }
    }
  }
};
</script>

<style>
.inline {
  display: inline;
  margin-left: 10px;
}

.center {
  text-align: inherit;
}

div.center {
  width: 300px;
  margin: auto;
}

</style>

