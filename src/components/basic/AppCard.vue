<template>
    <div class="card-example">
        <div class="card">
            <div class="card-block">
                <h4 class="card-title">
                    {{task.taskName}}
                </h4>
                <p class="card-text">
                    {{task.description}}
                </p>
            </div>
            <ul class="list-group list-group-flush">
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

export default {
  props: {
      task: Object
  },
  methods: {
    handleChange: function(event) {
      this.$emit("input", event.target.value);
    },
    getDate: function(date) {
        let dateObj = new Date(date)
        return dateObj.toLocaleDateString()
    }
  }
};
</script>

<style scoped>

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

/* .list-group-flush .list-group-item {
    border-left: solid 1px rgba(0, 0, 0, 0.125);
} */
</style>
