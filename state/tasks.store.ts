import type { Task } from "~/utils/interface/Tasks";
import { defineStore } from "pinia";

export const useTasksStore = defineStore("TasksStore", {
  state: () => ({
    tasks: [] as Task[],
  }),
  getters: {
    importantTasks(state) {
        return state.tasks.filter((task: Task) => task.important)
    },
    tasksAddedToday(state) {
        return state.tasks.filter((task: Task) => task.important)
    },   
    lateTasks(state) {
        return state.tasks.filter((task: Task) => task.important)
    },
    tasksDone(state) {
        return state.tasks.filter((task: Task) => task.important)
    },
  },
  actions: {
    addNewTask() {
        
    }
  }
});
