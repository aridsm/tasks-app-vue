import type { Directory } from "../utils/interface/Directory";
import { defineStore } from "pinia";
import { useTasksStore } from "./tasks.store";
import type { Task } from "~/utils/interface/Tasks";

export const useDirectoriesStore = defineStore("DirectoriesStore", {
  state: () => ({
    directories: [] as Directory[],
    selectedDirectory: null as Directory | null | undefined,
  }),
  actions: {
    async saveDirectoryHandler(directory: Directory) {
      const tasksStore = useTasksStore();

      const nameAlreadyExists = this.directories.find(
        (dir) =>
          dir.name.trim() === directory.name.trim() && dir.id !== directory.id
      );

      if (directory.id) {
        const index = this.directories.findIndex((d) => d.id === directory.id);
        if (index >= 0) {
          if (!nameAlreadyExists) {
            this.directories.splice(index, 1, directory);
            tasksStore.updateDirectoryName(directory);
            return Promise.resolve(directory);
          }

          tasksStore.updateDirectoryName(directory);

          return Promise.reject(directory);
        }
      } else {
        if (!nameAlreadyExists) {
          const newId = new Date().getTime();
          this.directories.push({
            ...directory,
            id: newId,
          });

          return Promise.resolve(directory);
        }

        return Promise.reject(directory);
      }
    },
    selectDirectoryHandler(id: number) {
      const router = useRouter()

      const directory = this.directories.find(dir => dir.id === id)

      this.selectedDirectory =
      directory && directory.id === this.selectedDirectory?.id ? null : directory;

        router.push({query: {
          directoryId: this.selectedDirectory ? this.selectedDirectory.id : undefined
        }})
    },
    async deleteDirectoryHandler(id: number) {
      const index = this.directories.findIndex((d) => d.id === id);

      if (index >= 0) {
        this.directories.splice(index, 1);

        if (id === this.selectedDirectory?.id) {
          this.selectedDirectory = null;
        }
        return Promise.resolve(id);
      }
      return Promise.reject(id);
    },
    getDirectoryCount(directoryId: number | undefined, tasks: Task[]) {
      const directory = this.directories.find(dir => dir.id === directoryId)

      let directoryCount = 0

      if (directory) {
        // const taskStore = useTasksStore()
        const directoryTasks = tasks.filter(task => task.directoryId === directoryId)
        directoryCount = directoryTasks.length
      }

      return directoryCount
    }
  },
});
