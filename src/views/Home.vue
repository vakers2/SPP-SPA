<template>
  <div class="home">
    <input @click="showCreateTaskDiv" type="button" :value="'Create task ' + CreateDivArrow" class="btn btn-primary"/>
    <div class="create-container" ref="createTaskDiv" style="display: none">
      <input v-model="newTask" placeholder="Task" class="form-control input-control placement" type="text" id="task">
      <app-select v-model="progress" class="placement" :options="statuses"></app-select>
      <div class="center">
        <textarea v-model="description" placeholder="Description" class="form-control text-area" />
        <date-picker :input-class="'form-control'" class="form-group center" :value="state.date"></date-picker>
      </div>
      <dropzone @vdropzone-success="getFile" ref="dropzone" id="dropzone" :options="dropzoneOptions" :useCustomSlot="true" class="center">Drop files here</dropzone>
      <input @click="sendTask" value="Submit" type="button" class="btn btn-primary placement"/>
    </div>

    <app-card :task="task" v-for="(task, index) in tasks" :key="index"></app-card>
  </div>
</template>

<script>
import Dropzone from 'vue2-dropzone'
// @ is an alias to /src
import AppSelect from "@/components/basic/AppSelect.vue";
import DatePicker from "vuejs-datepicker";
import AppCard from "@/components/basic/AppCard.vue"
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown';

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
    Dropzone,
    bDropdown
  },
  created: function() {
    axios.get('http://localhost:3000/getTasks')
      .then(response => {
        this.tasks = response.data
      })
  },
  computed: {
    CreateDivArrow: function() {
      let ref = this.$refs.createTaskDiv
      if (ref.style.display == "block")  {
        return '▲'
      } else {
        return '▼' }
    }
  },
  methods: {
    sendTask() {
      let task = {}
      task.taskName = this.newTask
      task.date = this.state.date
      task.description = this.description
      task.progress = this.progress
      task.files = this.files
      this.tasks.push(task)
      axios.post('http://localhost:3000/task', this.tasks, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          this.files = []
          this.newTask = ''
          this.progress = ''
          this.description = ''
          this.state.date = new Date(2019, 1, 16)
          this.$refs.dropzone.removeAllFiles()
        })
    },
    getFile(file, response) {
      this.files.push(response)
    },
    showCreateTaskDiv() {
      var ref = this.$refs.createTaskDiv
      if (ref.style.display == "block")  {
        ref.style.display = "none"
      } else {
        ref.style.display = "block" }
    }
  },
  data() {
    return {
      tasks: [],
      files: [],
      statuses,
      newTask: '',
      description: '',
      progress: 'Not started',
      state: {
        date: new Date(2019, 1, 16)
      },
      dropzoneOptions: {
          url: 'http://localhost:3000/files',
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

.create-container {
  width: 350px;
  margin: 10px auto;
  border: solid 2px rgba(0, 0, 0, 0.250);
  background-color: #F8F8F8;
  transition: all 2s ease-out;
}

</style>

