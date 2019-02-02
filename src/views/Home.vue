<template>
  <div class="home">
    <app-select v-model="task" class="inline" :options="tasks"></app-select>
    <app-select v-model="progress" class="inline" :options="statuses"></app-select>
    <div class="center">
      <date-picker :input-class="'form-control'" class="form-group center" :value="state.date"></date-picker>
    </div>
    <dropzone ref="dropzone" id="dropzone" :options="dropzoneOptions" :useCustomSlot="true" class="center">Drop files here</dropzone>
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
      },
      dropzoneOptions: {
          url: 'http://localhost:8080/files',
          thumbnailWidth: 100,
          method: 'post'
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
  margin-bottom: 10px;
}

</style>

