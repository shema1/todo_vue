<template>
  <div>
    <Popup v-if="showPopup" @confirm="confirmChoice" />
    <div class="task-info">
      <div v-if="!$attrs.id" class="task-info__input">
        <label for="name">Input task name</label>
        <input type="text" name="name" v-model="taskName" />
        <button class="btn" @click="createTask">create</button>
      </div>
      <div v-if="$attrs.id" class="task-info__head">
        <router-link to="/">
          <span class="material-icons">
            arrow_back_ios
          </span>
        </router-link>
        <span v-if="!edit" class="task-info__name" @click="editTask">{{
          TASK.name
        }}</span>
        <div v-else class="task-info__edit">
          <input type="text" v-model="taskName" />
          <button class="btn " @click="updateTask">save</button>
          <button class="btn " @click="cancel">cancel</button>
        </div>
        <span class="material-icons" @click="openPopUp">delete</span>
      </div>
      <ul class="task-info__list">
        <Task
          v-for="task in SUBTASKS"
          :key="task.id"
          :taskData="task"
          :taskId="TASK.id"
          @test="openPopUp"
        />
      </ul>
      <div v-if="$attrs.id" class="task-info__input">
        <label for="subname">Input subtask name</label>
        <input type="text" name="subname" v-model="subName" />
        <button class="btn" @click="createSubTask">create</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import router from "../router/router";
import Task from "./Task";
import Popup from "./Popup";
export default {
  name: "TaskCreator",
  components: {
    Task,
    Popup,
  },
  computed: {
    ...mapGetters(["TASK", "TASKS", "SUBTASKS"]),
  },
  data() {
    return {
      taskName: "",
      subName: "",
      showPopup: false,
      edit: false,
    };
  },
  methods: {
    ...mapActions([
      "GET_TASKS",
      "GET_SUBTASKS",
      "GET_TASK",
      "UPDADATE_TASK",
      "CREATE_TASK",
      "CREATE_SUBTASK",
      "CLEAR_TASK",
      "DEL_TASK",
    ]),
    openPopUp() {
      this.showPopup = true;
    },

    editTask() {
      this.taskName = this.TASK.name;
      this.edit = true;
    },
    cancel() {
      this.edit = false;
    },

    confirmChoice(param) {
      console.log(this.TASK);
      if (!param) return (this.showPopup = false);
      this.deleteTask(this.TASK.id);
    },

    create() {
      let task = {
        name: this.taskName,
        events: [],
      };
      this.$emit("create", task);
      this.taskName = "";
    },

    createTask() {
      let task = {
        name: this.taskName,
      };
      this.taskName = "";
      this.CREATE_TASK(task);
    },
    updateTask() {
      let task = {
        ...this.TASK,
        name: this.taskName,
      };
      this.UPDADATE_TASK(task);
      this.edit = false;
    },
    deleteTask(id) {
      this.DEL_TASK(id);
      router.push({ path: `/` });
    },

    createSubTask() {
      let subTask = {
        parentTask: this.TASK.id,
        name: this.subName,
        status: false,
      };
      this.CREATE_SUBTASK(subTask);
      this.subName = "";
    },
  },
  mounted() {
    this.CLEAR_TASK();
    if (this.$attrs.id) {
      this.GET_TASK(this.$attrs.id.slice(1));
    }
    this.GET_TASKS();
    this.GET_SUBTASKS();
  },
};
</script>

<style lang="scss">
.task-info {
  margin: 0 auto;
  min-height: 300px;
  max-width: 500px;
  color: #fff;
  background-color: #ff6666;
  padding: 20px 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 2%;
  &__name {
    text-align: left;
    font-size: 32px;
    cursor: pointer;
  }
  &__input {
    font-size: 18px;
    margin-top: 15px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
  }
  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  input {
    border: none;
    margin-left: 15px;
    padding: 10px;
    margin: 10px 0;
  }
  label {
    width: 165px;
    margin-right: 15px;
  }
}
</style>
