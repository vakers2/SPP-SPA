<template>
    <div class="card-example">
        <div class="card">
            <div class="card-block">
                <i @click="deleteCard()" class="fas fa-times delete-icon"></i>
                <i @click="edit = !edit" class="fas fa-edit edit-icon"></i>
                <h4 class="card-title">
                    {{task.name || task.taskName}}
                </h4>
                <p class="card-text">
                    {{task.description}}
                </p>
            </div>
            <ul class="list-group list-group-flush">
                <li v-if="!edit" class="list-group-item">
                    {{task.status || task.progress}}
                </li>
                <li v-if="edit" class="list-group-item">
                    <app-select class="select" :options="statuses" v-model="progress"></app-select>
                </li>
                <li v-for="(file, index) in task.files" :key="index" class="list-group-item">
                    <a :href="file">{{file.split('/').pop()}}</a>
                </li>
            </ul>
            <div class="card-footer text-muted">
                {{getDate(task.date)}}
            </div>
        </div>
    </div>
</template>

<script>
import AppSelect from "@/components/basic/AppSelect.vue";
const statuses = ['Not started', 'In progress', 'Finished']

export default {
  components: {
    AppSelect
  },
  props: {
      task: Object
  },
  methods: {
    handleChange: function(event) {
      this.$emit("input", event.target.value)
    },
    getDate: function(date) {
        let dateObj = new Date(date)
        return dateObj.toLocaleDateString()
    },
    deleteCard: function() {
        this.$emit("delete", this.task._id)
    }
  },
  watch: {
      progress: function() {
        let id = this.task._id
        this.$emit('input', this.progress)
        this.$emit('edit', id)
      }
  },
  data() {
    return {
      edit: false,
      progress: '',
      statuses
    }
  }
};
</script>

<style scoped>
.card {
    width: 300px;
}

.container {
  margin-top: 30px;
  margin-bottom: 30px;
}

.card-example {
  max-width: 350px;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 10px;
}
.card-example .card-header {
  font-weight: 900;
  color: #ffffff;
  background: #20bc4c;
}

.card-block {
    padding: 5px 5px 5px 5px;
}

.card-title {
    text-align: center;
}

.list-group-flush .list-group-item {
    border-left: solid 1px rgba(0, 0, 0, 0.125);
}

.delete-icon {
    color: red;
    display: absolute;
    float: right;
    cursor: pointer;
}

.edit-icon {
    display: absolute;
    float: right;
    margin-right: 10px;
    cursor: pointer;
}

.select select {
    width: 200px !important;
}
</style>
