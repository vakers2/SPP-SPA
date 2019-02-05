<template>
  <div class="home">
    <input v-model="task" placeholder="Task" class="form-control input-control placement" type="text" id="task">
    <app-select v-model="progress" class="placement" :options="statuses"></app-select>
    <div class="center">
      <textarea v-model="description" placeholder="Description" class="form-control text-area" />
      <date-picker :input-class="'form-control'" class="form-group center" :value="state.date"></date-picker>
    </div>
    <dropzone ref="dropzone" id="dropzone" :options="dropzoneOptions" :useCustomSlot="true" class="center">Drop files here</dropzone>
    <app-card></app-card>
  </div>
</template>

<script>
import Dropzone from 'vue2-dropzone'
// @ is an alias to /src
import AppSelect from "@/components/basic/AppSelect.vue";
import DatePicker from "vuejs-datepicker";
import AppCard from "@/components/basic/AppCard.vue"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'vue2-dropzone/dist/vue2Dropzone.min.css'

import axios from 'axios'

axios.defaults.baseURL = '/'
axios.defaults.headers.post['Content-Type'] = 'application/json'

const statuses = ['Not started', 'In progress', 'Finished']

export default {
  name: "home",
  components: {
    AppSelect,
    DatePicker,
    AppCard,
    Dropzone
  },
  methods: {
  },
  data() {
    return {
      statuses,
      task: '',
      description: '',
      progress: 'Not started',
      state: {
        date: new Date(2019, 1, 16)
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

.placement {
  width: 300px;
  margin: 10px auto;
}

.container-anime {
  margin-bottom: 10px;
}

.text-area {
  min-height: 150px;
  margin-bottom: 10px;
}

</style>

