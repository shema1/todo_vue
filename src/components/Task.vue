<template>
  <li v-if="taskId == taskData.parentTask" class="tasks__item">
    <div v-if="taskData.parentTask" class="tasks__status">
      <span v-if="status" class="material-icons " @click="toggleStatus">
        check_circle_outline
      </span>
      <span v-else class="material-icons" @click="toggleStatus">
        panorama_fish_eye
      </span>
    </div>
    <span
      class="tasks__name "
      :class="status ? ' tasks__name_done ' : ''"
      v-if="!edit"
      title="double-click to edit"
      @dblclick="editSubtask"
    >
      {{ taskData.name }}
    </span>
    <div v-if="edit" class="tasks__edit-block">
      <input type="text" v-model="subtaskName" />
      <button class="btn " @click="updateSubTask()">save</button>
      <button class="btn " @click="cancel()">cancel</button>
    </div>
    <div class="tasks__control">
      <span
        v-if="taskId"
        class="material-icons  "
        @click="delSubTask(taskData.id)"
      >
        delete
      </span>
      <router-link v-if="!taskId" :to="`/task:${taskData.id}`">
        <span class="tasks__edit material-icons">
          edit
        </span>
      </router-link>
    </div>
  </li>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Task",
  data() {
    return {
      edit: false,
      subtaskName: this.taskData.name,
      status: this.taskData.status,
    };
  },
  props: {
    taskData: {
      type: Object,
      default() {
        return {
          name: "",
          events: [],
        };
      },
    },
    taskId: {
      type: String,
    },
  },
  methods: {
    ...mapActions(["DEL_SUBTASK", "UPDADATE_SUBTASK"]),

    editSubtask() {
      this.edit = true;
    },
    cancel() {
      this.edit = false;
    },

    delSubTask(id) {
      this.DEL_SUBTASK(id);
    },

    toggleStatus() {
      this.status = !this.status;
      this.updateSubTask();
    },

    updateSubTask() {
      let newSubtask = {
        ...this.taskData,
        status: this.status,
        name: this.subtaskName,
      };
      this.UPDADATE_SUBTASK(newSubtask);
      this.edit = false;
    },
  },
};
</script>

<style lang="scss">
.tasks {
  &__item {
    font-size: 25px;
    text-align: left;
    padding: 20px 10px;
    margin-top: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    align-items: center;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  &__info {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  &__edit {
    margin-right: 10px;
    cursor: pointer;
  }
  &__name {
    cursor: pointer;
    text-overflow: ellipsis;
    max-width: 200px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    &_done {
      text-decoration: line-through;
      opacity: 0.5;
    }
  }

  &__control {
    cursor: pointer;
  }
}
.tasks-list {
  margin-top: 15px;
  background-color: #ff6666;

  &__item {
    font-size: 18px;
    padding: 10px 10px 10px 25px;
    display: flex;
    justify-content: space-between;
  }
  &__status {
    border: none;
    width: 20px;
    height: 20px;
  }
  &__item:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
