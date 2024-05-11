import type { Task, TaskFields } from "../utils/interface/Tasks";
import { defineStore } from "pinia";
import { Arrangement } from "../utils/enums/Arrangement";
import type { SortBy } from "../utils/enums/SortBy";
import dayjs from "dayjs";
import { useDirectoriesStore } from "./directories.store";
import type { Directory } from "../utils/interface/Directory";

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
    sortBy: null as unknown as SortBy,
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
        const finalDate = new Date(task.finalDate).getTime()
        const todaysDateTime = new Date().getTime()

        return finalDate < todaysDateTime
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
        return Promise.resolve(task);
      } else {
        const taskIndex = this.tasks.findIndex((t) => t.id === task.id);

        if (taskIndex >= 0) {
          this.tasks.splice(taskIndex, 1, {
            ...(task as Task),
            directoryName: getDirectoryName(task.directoryId),
          });
          return Promise.resolve(task);
        }
      }
    },
    deleteTaskHandler(id: number) {
      const taskIndex = this.tasks.findIndex((t) => t.id === id);

      if (taskIndex >= 0) {
        this.tasks.splice(taskIndex, 1);

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
    },
  },
});
