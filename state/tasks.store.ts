import type { Task, TaskFields } from "../utils/interface/Tasks";
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
      return state.tasks.filter((task: Task) => task.important);
    },
    tasksAddedToday(state) {
      return state.tasks.filter((task: Task) => task.important);
    },
    lateTasks(state) {
      return state.tasks.filter((task: Task) => task.important);
    },
    tasksDone(state) {
      return state.tasks.filter((task: Task) => task.important);
    },
  },
  actions: {
    saveTaskHandler(task: TaskFields) {
      if (!task.id) {
        const newTask = {
          ...task,
          id: new Date().getTime(),
          addedDate: new Date(),
        };
        this.tasks.push(newTask);
      } else {
        const taskIndex = this.tasks.findIndex((t) => t.id === task.id);

        if (taskIndex >= 0) {
          this.tasks.splice(taskIndex, 1, task as Task);
        }
      }
    },
    deleteTaskHandler(id: number) {
      const taskIndex = this.tasks.findIndex((t) => t.id === id);

      if (taskIndex >= 0) {
        this.tasks.splice(taskIndex, 1);
      }
    },
    setTasksArrangement(arrangement: Arrangement) {
      this.arrangement = arrangement;
    },
    setTasksSort(sortBy: SortBy) {
      this.sortBy = sortBy;
    },
    toggleImportant(task: Task) {
      const findTask = this.tasks.find(t => t.id === task.id)
      if (findTask) {
        findTask.important = !findTask.important
      }
    }
  },
});
