import type { Directory } from "../utils/interface/Directory";
import { defineStore } from "pinia";
import { useTasksStore } from "./tasks.store";
import type { Task } from "~/utils/interface/Tasks";


const LOCAL_STORAGE_KEY = 'directories'

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

            setToLocalStorage(LOCAL_STORAGE_KEY, directory)
            return Promise.resolve(directory);
          }

          tasksStore.updateDirectoryName(directory);

          return Promise.reject(directory);
        }
      } else {
        if (!nameAlreadyExists) {
          const newId = new Date().getTime();

          const newDirectory = {
            ...directory,
            id: newId,
          }
          this.directories.push(newDirectory);

          setToLocalStorage(LOCAL_STORAGE_KEY, newDirectory)

          return Promise.resolve(newDirectory);
        }

        return Promise.reject(directory);
      }

      return Promise.reject(directory);
    },
    selectDirectoryHandler(id: number) {
      const router = useRouter();
      const route = useRoute();

      const directory = this.directories.find((dir) => dir.id === id);

      this.selectedDirectory =
        directory && directory.id === this.selectedDirectory?.id
          ? null
          : directory;

      router.push({
        query: {
          ...route.query,
          directoryId: this.selectedDirectory
            ? this.selectedDirectory.id
            : undefined,
        },
      });
    },
    async deleteDirectoryHandler(id: number) {
      const index = this.directories.findIndex((d) => d.id === id);

      if (index >= 0) {
        this.directories.splice(index, 1);
        removeFromLocalStorage(LOCAL_STORAGE_KEY, id)

        if (id === this.selectedDirectory?.id) {
          this.selectedDirectory = null;
        }
        return Promise.resolve(id);
      }
      return Promise.reject(id);
    },
    getDirectoryCount(directoryId: number | undefined, tasks: Task[]) {
      const directory = this.directories.find((dir) => dir.id === directoryId);

      let directoryCount = 0;

      if (directory) {
        const directoryTasks = tasks.filter(
          (task) => task.directoryId === directoryId
        );
        directoryCount = directoryTasks.length;
      }

      return directoryCount;
    },
    clearAllDirectories() {
      this.directories = [];
      this.selectedDirectory = null;
      clearFromLocalStorage(LOCAL_STORAGE_KEY)
    },
    getDirectoriesFromLocalStorage() {
     this.directories = getFromLocalStorage(LOCAL_STORAGE_KEY) || []
    }
  },
});
