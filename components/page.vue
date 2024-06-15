<template>
  <div class="w-full mx-auto">
    <h1
      v-if="title"
      class="text-xl sm:text-2xl font-semibold -tracking-tight mb-4 sm:mb-6"
    >
      {{ title }} ({{ tasks.length }})
      <span v-if="search">
        <icon
          icon="fa-solid fa-chevron-right"
          class="text-sm mr-3 ml-1 text-blue-light"
        />
      </span>
      <span v-if="search" class="text-blue-light">{{ search }} </span>
    </h1>
    <directories :tasks="tasks" />

    <div
      class="border-t dark:border-t-dark-100 border-t-light-text/[.15] pt-6 mt-6"
    >
      <div class="mb-3 flex gap-4 justify-between items-center">
        <section-title class="flex gap-3">
          Tarefas
          <span v-if="directoryName">
            <icon icon="fa-solid fa-chevron-right" />
          </span>
          <span v-if="directoryName" class="c break-all"
            >{{ directoryName }} ({{ directoryCount }})</span
          >
        </section-title>
        <btn-add
          class="whitespace-nowrap"
          data-type="add-task"
          @click="addNewTaskHandler"
        >
          Adicionar tarefa
        </btn-add>
      </div>
      <div class="mb-4 flex items-center gap-1">
        <button
          v-for="button in arrangementButtons"
          :key="button.id"
          :title="button.title"
          class="hidden sm:grid place-items-center hover:bg-dark-text/[.1] w-10 h-10 rounded-full"
          :class="{
            'text-light-text/[.5] dark:text-dark-text':
              tasksStore.arrangement !== button.arrangement,
            'dark:text-lilac text-blue-light':
              tasksStore.arrangement === button.arrangement,
          }"
          @click="tasksStore.setTasksArrangement(button.arrangement)"
        >
          <icon :icon="button.icon" class="text-xl" />
        </button>
        <input-select
          v-model="sortBy"
          :items="SortByList"
          clearable
          name="sort-by"
          class="w-52 sm:w-[18rem] ml-auto"
          placeholder="Ordenar por"
        />
      </div>
      <TransitionGroup
        name="list"
        tag="ul"
        class="grid gap-4 md:gap-6 lg:gap-8"
        :class="{
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3':
            tasksStore.arrangement === Arrangement.Grid,
          'grid-cols-1': tasksStore.arrangement === Arrangement.Grid,
        }"
      >
        <card-task v-for="task in filteredTasks" :key="task.id" :task="task" />
      </TransitionGroup>
      <p
        v-if="!filteredTasks.length"
        class="text-light-text/[.5] dark:text-dark-text text-center sm:text-start"
      >
        Nenhuma tarefa adicionada!
      </p>
    </div>
  </div>
  <modal-task v-model="modalTaskOpen" v-model:form="form" />
</template>

<script lang="ts">
import { useDirectoriesStore } from "../state/directories.store";
import directories from "./directories.vue";
import { useTasksStore } from "../state/tasks.store";
import { Arrangement } from "../utils/enums/Arrangement";
import { SortByList, SortBy } from "../utils/enums/SortBy";
import type { Task, TaskFields } from "../utils/interface/Tasks";
import type { PropType } from "vue";

export default {
  components: { directories },
  setup() {
    const directoryStore = useDirectoriesStore();
    const tasksStore = useTasksStore();

    return { directoryStore, tasksStore, SortByList, Arrangement };
  },
  props: {
    title: String,
    tasks: { type: Array as PropType<Task[]>, required: true },
  },
  data() {
    return {
      sortBy: null as unknown as SortBy,
      form: {} as TaskFields,
      modalTaskOpen: false,
    };
  },
  watch: {
    sortBy() {
      this.tasksStore.setTasksSort(this.sortBy);
    },
  },
  computed: {
    filteredTasks() {
      const directoryId = this.$route.query?.directoryId;
      let tasks = [...this.tasks];

      if (directoryId) {
        tasks = this.tasks.filter(
          (task) => task.directoryId === Number(directoryId)
        );
      }

      if (this.search) {
        tasks = tasks.filter((task) =>
          task.name.toLowerCase().includes(this.search.trim().toLowerCase())
        );
      }

      if (this.sortBy === SortBy.AddedFirst) {
        tasks = this.sortByAddedFirst(tasks);
      } else if (this.sortBy === SortBy.AddedLast) {
        tasks = this.sortByAddedLast(tasks);
      } else if (this.sortBy === SortBy.AscendingFinalDate) {
        tasks = this.sortByAscendingFinalDate(tasks);
      } else if (this.sortBy === SortBy.DescendingFinalDate) {
        tasks = this.sortByDescendingFinalDate(tasks);
      } else if (this.sortBy === SortBy.AlphaOrder) {
        tasks = this.sortByAlphaOrder(tasks);
      } else if (this.sortBy === SortBy.ReverseAlphaOrder) {
        tasks = this.sortByReverseAlphaOrder(tasks);
      }

      return tasks;
    },
    directoryName() {
      return this.directoryStore.selectedDirectory?.name;
    },
    directoryId() {
      return this.directoryStore.selectedDirectory?.id;
    },
    search(): string {
      return (this.$route.query?.search as string) || "";
    },
    directoryCount() {
      return this.directoryStore.getDirectoryCount(
        this.directoryId,
        this.tasks
      );
    },
    arrangementButtons: {
      get() {
        return [
          {
            id: 1,
            title: "Organizar por grid",
            icon: "fa-solid fa-grip",
            arrangement: Arrangement.Grid,
          },
          {
            id: 2,
            title: "Organizar por linha",
            icon: "fa-solid fa-bars",
            arrangement: Arrangement.Rows,
          },
        ];
      },
      set() {},
    },
  },
  methods: {
    addNewTaskHandler() {
      this.form = {
        name: "",
        description: "",
        directoryId: 0,
        finalDate: new Date(),
        important: false,
        completed: false,
      };

      this.modalTaskOpen = true;
    },
    sortByAddedFirst(tasks: Task[]) {
      return tasks.sort((a, b) => {
        const timeA = a.addedDate.getTime();
        const timeB = b.addedDate.getTime();

        if (timeA < timeB) {
          return -1;
        }

        if (timeA > timeB) {
          return 1;
        }

        return 0;
      });
    },
    sortByAddedLast(tasks: Task[]) {
      return tasks.sort((a, b) => {
        const timeA = a.addedDate.getTime();
        const timeB = b.addedDate.getTime();

        if (timeA > timeB) {
          return -1;
        }

        if (timeA < timeB) {
          return 1;
        }

        return 0;
      });
    },
    sortByAscendingFinalDate(tasks: Task[]) {
      return tasks.sort((a, b) => {
        const timeA = new Date(a.finalDate).getTime();
        const timeB = new Date(b.finalDate).getTime();

        if (timeA < timeB) {
          return -1;
        }

        if (timeA > timeB) {
          return 1;
        }

        return 0;
      });
    },
    sortByDescendingFinalDate(tasks: Task[]) {
      return tasks.sort((a, b) => {
        const timeA = new Date(a.finalDate).getTime();
        const timeB = new Date(b.finalDate).getTime();

        if (timeA > timeB) {
          return -1;
        }

        if (timeA < timeB) {
          return 1;
        }

        return 0;
      });
    },
    sortByAlphaOrder(tasks: Task[]) {
      return tasks.sort((a, b) => {

        if (a.name < b.name) {
          return -1;
        }

        if (a.name > b.name) {
          return 1;
        }

        return 0;
      });
    },
    sortByReverseAlphaOrder(tasks: Task[]) {
      return tasks.sort((a, b) => {

        if (a.name > b.name) {
          return -1;
        }

        if (a.name < b.name) {
          return 1;
        }

        return 0;
      });
    },
  },
};
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: relative;
}
</style>
