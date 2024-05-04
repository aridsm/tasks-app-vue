import type { Directory } from "~/utils/interface/Directory";
import { defineStore } from "pinia";

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
      } else {
        if (!nameAlreadyExists) {
          const newId = Math.random() * 1000;
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
      }
    },
  },
});
