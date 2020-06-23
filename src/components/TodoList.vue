<template>
  <div class="todolist" v-if="name">
    <div class="head">
      <h1 class="head__title">
        Todo List
      </h1>
      <router-link :to="{ name: 'task' }">
        <button class="head__btn">add item</button>
      </router-link>
    </div>
    <ul class="tasks">
      <Task v-for="task in TASKS"
       :key="task.id" 
       :taskData="task" />
    </ul>
  </div>
</template>
<script>

import Task from "./Task";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "TodoList",
  components: {
    Task,
  },
  computed: {
    ...mapGetters(["TASKS"]),
  },
  data() {
    return {
      name: true,
    };
  },
  methods: {
    ...mapActions(["GET_TASKS"]),
  },
  mounted() {
    this.GET_TASKS();
  },
};
</script>

<style lang="scss">
.todolist {
  margin: 0 auto;
  max-width: 500px;
  color: #fff;
  background-color: #ff6666;
  padding: 20px 25px;
  margin-top: 2%;
}
.head {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #fff;
  &__title {
    text-align: left;
    font-size: 32px;
  }

  &__btn {
    cursor: pointer;
    outline: none;
    align-self: center;
    color: #fff;
    font-weight: 700;
    width: 110px;
    border: 1px solid #fff;
    text-transform: uppercase;
    padding: 10px 0;
    background-color: transparent;
  }
}

.btn {
  cursor: pointer;
  outline: none;
  align-self: center;
  color: #fff;
  font-weight: 700;
  width: 110px;
  border: 1px solid #fff;
  text-transform: uppercase;
  padding: 10px 0;
  background-color: transparent;
}
</style>
