import type { Task, TaskFields } from "../utils/interface/Tasks";
import { defineStore } from "pinia";
import { Arrangement } from "../utils/enums/Arrangement";
import type { SortBy } from "../utils/enums/SortBy";
import dayjs from "dayjs";
import { useDirectoriesStore } from "./directories.store";
import type { Directory } from "../utils/interface/Directory";
import * as localStorageUtil from "../utils/localStorage";

const LOCAL_STORAGE_KEY = "takss";

function getDirectoryName(directoryId: number) {
  const directoryStore = useDirectoriesStore();

  const directory: Directory | undefined = directoryStore.directories.find(
    (d) => d.id === directoryId
  );

  return directory?.name || undefined;
}

export const useTasksStore = defineStore("TasksStore", {
  state: () => ({
    tasks: [] as Task[],
    arrangement: Arrangement.Grid as Arrangement,
    sortBy: null as SortBy | null,
  }),
  getters: {
    importantTasks(state) {
      return state.tasks.filter((task: Task) => task.important);
    },
    todaysTasks(state) {
      return state.tasks.filter((task: Task) => {
        const todaysDate = dayjs(new Date()).format("DD/MM/YYYY");
        const taskDate = dayjs(task.addedDate).format("DD/MM/YYYY");
        return todaysDate === taskDate;
      });
    },
    lateTasks(state) {
      return state.tasks.filter((task: Task) => {
        return dayjs(dayjs(new Date()).format("YYYY-MM-DD")).isAfter(
          dayjs(task.finalDate).format("YYYY-MM-DD")
        );
      });
    },
    completedTasks(state) {
      return state.tasks.filter((task: Task) => task.completed);
    },
  },
  actions: {
    async saveTaskHandler(task: TaskFields) {
      if (!task.id) {
        const newTask = {
          ...task,
          directoryName: getDirectoryName(task.directoryId),
          id: new Date().getTime(),
          addedDate: new Date(),
        };
        this.tasks.push(newTask);

        localStorageUtil.setToLocalStorage(LOCAL_STORAGE_KEY, newTask);
        return Promise.resolve(task);
      } else {
        const taskIndex = this.tasks.findIndex((t) => t.id === task.id);

        if (taskIndex >= 0) {
          const editedTask = {
            ...(task as Task),
            directoryName: getDirectoryName(task.directoryId),
          };
          this.tasks.splice(taskIndex, 1, editedTask);

          localStorageUtil.setToLocalStorage(LOCAL_STORAGE_KEY, editedTask);
          return Promise.resolve(task);
        }
      }
    },
    deleteTaskHandler(id: number) {
      const task = this.tasks.find((t) => t.id === id);

      if (task) {
        this.tasks.splice(this.tasks.indexOf(task), 1);
        localStorageUtil.removeFromLocalStorage(LOCAL_STORAGE_KEY, id);

        return Promise.resolve(id);
      }

      return Promise.reject(id);
    },
    setTasksArrangement(arrangement: Arrangement) {
      this.arrangement = arrangement;
    },
    setTasksSort(sortBy: SortBy) {
      this.sortBy = sortBy;
    },
    toggleImportant(task: Task) {
      const findTask = this.tasks.find((t) => t.id === task.id);
      if (findTask) {
        findTask.important = !findTask.important;
      }
    },
    updateDirectoryName(directory: Directory) {
      this.tasks = this.tasks.map((task) => {
        if (task.directoryId === directory.id) {
          task.directoryName = directory.name;
        }
        return task;
      });

      localStorageUtil.setArrayToLocalStorage(LOCAL_STORAGE_KEY, this.tasks);
    },
    checkTaskIsLate(date: Date | string) {
      return dayjs(dayjs(new Date()).format("YYYY-MM-DD")).isAfter(
        dayjs(date).format("YYYY-MM-DD")
      );
    },
    clearAllTasks() {
      this.tasks = [];
      localStorageUtil.clearFromLocalStorage(LOCAL_STORAGE_KEY);
      this.sortBy = null;
    },
    getTasksFromLocalStorage() {
      this.tasks =
        localStorageUtil.getFromLocalStorage(LOCAL_STORAGE_KEY) || [];
    },
  },
});
