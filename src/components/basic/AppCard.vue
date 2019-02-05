<template>
    <div class="card-example">
        <div class="card">
            <div class="card-block">
                <h4 class="card-title">
                    Card-title
                </h4>
                <p class="card-text">
                    This is the description of a card
                </p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    Thing one
                </li>
                <li class="list-group-item">
                    Thing two 
                </li>
                <li class="list-group-item">
                    Thing three
                </li>
            </ul>
            <div class="card-footer text-muted">
                2 days ago
            </div>
        </div>
    </div>
</template>

<script>

export default {
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
</style>
