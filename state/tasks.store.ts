import type { Task } from "../utils/interface/Tasks";
import { defineStore } from "pinia";
import { Arrangement } from "../utils/enums/Arrangement";
import type { SortBy } from "../utils/enums/SortBy";

export const useTasksStore = defineStore("TasksStore", {
  state: () => ({
    tasks: [] as Task[],
    arrangement: Arrangement.Grid as Arrangement,
    sortBy: null as unknown as SortBy,
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
        
    },
    setTasksArrangement(arrangement: Arrangement) {
      this.arrangement = arrangement
    },
    setTasksSort(sortBy: SortBy) {
      this.sortBy = sortBy
    }
  }
});
