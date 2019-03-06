<template>
  <div class="home">
    <div>
      <input @click="showCreateTaskDiv" type="button" :value="'Create task ▼'" class="btn btn-primary" style="margin-bottom: 10px;"/>
      <app-select style="width: 300px; margin: auto;" placeholder="Filter" v-model="filter" :options="statuses"></app-select>
    </div>
    <div class="create-container" ref="createTaskDiv" style="display: none; opacity: 0">
      <input v-model="newTask" placeholder="Task" class="form-control input-control placement" type="text" id="task">
      <app-select v-model="progress" class="placement" :options="statuses"></app-select>
      <div class="center">
        <textarea v-model="description" placeholder="Description" class="form-control text-area" />
        <date-picker :input-class="'form-control'" class="form-group center" :value="state.date"></date-picker>
      </div>
      <dropzone @vdropzone-success="getFile" ref="dropzone" id="dropzone" :options="dropzoneOptions" :useCustomSlot="true" class="center">Drop files here</dropzone>
      <input @click="sendTask" value="Submit" type="button" class="btn btn-primary placement"/>
    </div>
    <div class="container">
      <app-card v-model="editStatus" @edit="edit" @delete="deleteCard" class="card-container" :task="task" v-for="(task, index) in tasks" :key="index"></app-card>
    </div>
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

import { mapState } from "vuex";

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
  beforeMount() {
    if (this.login == "") {
      this.$router.push({ path: '/login' })
    }
  },
  mounted: function() {
    if (this.login != "") {
      axios.defaults.headers.common['x-access-token'] = this.token
      axios.post('http://localhost:4000/graphql', {
          query: `query ($userId: String!) {
                    getCards(userId:$userId) {
                      _id
                      name
                      description
                      status
                      date
                    }
                  }`,
          variables: {
            "userId": this.id
          }
        })
        .then(response => {
          if (response.data.message != "No cards") {
            this.tasks = this.allTasks = response.data.data.getCards
          }
        }).catch((err) => {
          this.$store.commit("signOut")
          this.$router.push({ path: '/login' })
        })
      }
  },
  computed: mapState(["login", "token", "id"]),
  methods: {
    validate() {
      return this.newTask != ''
    },
    sendTask() {
      if (this.validate()) {
        let task = {}
        task.taskName = this.newTask
        task.date = this.state.date
        task.description = this.description
        task.progress = this.progress
        if (task.progress == '') {
          task.progress = 'Not started'
        }
        task.files = this.files
        task.username = this.login
        axios.post('http://localhost:4000/graphql', {
          query: `mutation ($userId: String!, $name: String!, $description: String, $status: String!, $date: String) {
                  createCard(input: {userId: $userId, name: $name, description: $description, status: $status, date: $date}) {
                    _id
                    name
                    description
                    status
                    date
                  }
                }`,
          variables: {
            "userId": this.id,
            "name": this.newTask,
            "status": this.progress,
            "description": this.description,
            "date": this.state.date
          }
        })
          .then(response => {
            task._id = response.data.data.createCard._id
            this.files = []
            this.newTask = ''
            this.progress = ''
            this.description = ''
            this.state.date = new Date(2019, 1, 20)
            this.$refs.dropzone.removeAllFiles()
          })
        this.tasks.push(task)
      }
    },
    getFile(file, response) {
      this.files.push(response)
    },
    showCreateTaskDiv() {
      var ref = this.$refs.createTaskDiv
      if (ref.style.opacity == "1")  {
        ref.style.display = "none"
        ref.style.opacity = "0"
      } else {
        ref.style.opacity = "1"
        ref.style.display = "block"}
    },
    deleteCard(cardId){
      axios.post('http://localhost:4000/graphql', {
        query: `mutation ($id: String!, $userId: String!) {
                  removeCard(id: $id, userId: $userId)
                }`,
        variables: {
          "id": cardId,
          "userId": this.id
        }
      }).then(res => {
        for(var i = this.tasks.length - 1; i >= 0; i--) {
          if(this.tasks[i]._id === cardId) {
            this.tasks.splice(i, 1);
          }
        }
      })
    },
    edit(id) {
      for (var i = this.allTasks.length - 1; i >= 0; i--) {
        if(this.allTasks[i]._id === id) {
          this.allTasks[i].status = this.editStatus
        }
      }
      this.tasks = this.allTasks;
      axios.post('http://localhost:4000/graphql', {
        query: `mutation ($id: String!, $newStatus: String!) {
                  updateCard(id: $id, newStatus: $newStatus)
                }
                `,
        variables: {
          "id": id,
          "newStatus": this.editStatus
        }
      })
    }
  },
  watch: {
    filter: function() {
      this.tasks = this.allTasks.filter(task => task.progress == this.filter)
      if (this.filter == 'WTF') {
        this.tasks = this.allTasks
      }
    }
  },
  data() {
    return {
      allTasks: [],
      tasks: [],
      files: [],
      editStatus: "",
      statuses,
      newTask: '',
      description: '',
      filter: '',
      progress: 'Not started',
      state: {
        date: new Date(2019, 1, 16)
      },
      dropzoneOptions: {
          url: 'http://localhost:3000/task/files?username=' + this.login,
          thumbnailWidth: 100,
          method: 'post'
      }
    }
  }
};
</script>

<style>
.home {
  margin-top: 30px;
}

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
  background-color: #f6fbff;
  transition: all 2s ease-out;
}

.card-container {
  display: inline-flex;
}

</style>

