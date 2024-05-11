import type { Directory } from "~/utils/interface/Directory";
import { defineStore } from "pinia";
import { useTasksStore } from "./tasks.store";

export const useDirectoriesStore = defineStore("DirectoriesStore", {
  state: () => ({
    directories: [] as Directory[],
    selectedDirectory: null as Directory | null,
  }),
  actions: {
    saveDirectoryHandler(directory: Directory) {
      const nameAlreadyExists = this.directories.find(
        (dir) => dir.name.trim() === directory.name.trim() && dir.id !== directory.id
      );

      if (directory.id) {
        const index = this.directories.findIndex((d) => d.id === directory.id);
        if (index >= 0) {
          if (!nameAlreadyExists) {
            this.directories.splice(index, 1, directory);
          }
        }
        const tasksStore = useTasksStore()

        tasksStore.updateDirectoryName(directory)
        
      } else {
        if (!nameAlreadyExists) {
          const newId = new Date().getTime();
          this.directories.push({
            ...directory,
            id: newId,
            count: 0,
          });
        }
      }
    },
    selectDirectoryHandler(directory: Directory) {
      this.selectedDirectory =
        directory.id === this.selectedDirectory?.id ? null : directory;
    },
    deleteDirectoryHandler(id: number) {
      const index = this.directories.findIndex((d) => d.id === id);

      if (index >= 0) {
        this.directories.splice(index, 1);

        if (id === this.selectedDirectory?.id) {
          this.selectedDirectory = null
        }
      }
    },
  },
});
