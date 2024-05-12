<template>
  <div class="max-w-[1420px] w-full mx-auto">
    <h1 v-if="title" class="text-2xl font-semibold -tracking-tight mb-6">
      {{ title }} ({{ tasks.length }})
    </h1>
    <directories :tasks="tasks" />

    <div
      class="border-t dark:border-t-dark-100 border-t-light-text/[.15] pt-6 mt-6"
    >
      <div class="mb-3 flex justify-between items-center">
        <section-title class="flex gap-3">
          Tarefas
          <span v-if="directoryName">
            <icon icon="fa-solid fa-chevron-right" />
          </span>
          <span v-if="directoryName"
            >{{ directoryName }} ({{ directoryCount() }})</span
          >
        </section-title>
        <btn-add data-type="add-directory" @click="addNewTaskHandler">
          Adicionar tarefa
        </btn-add>
      </div>
      <div class="mb-4 flex items-center gap-1">
        <button
          v-for="button in sortButtons"
          :key="button.id"
          :title="button.title"
          class="grid place-items-center hover:bg-dark-text/[.1] w-10 h-10 rounded-full"
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
          class="w-[18rem] ml-auto"
          placeholder="Ordenar por"
        />
      </div>
      <TransitionGroup
        name="list"
        tag="ul"
        class="grid gap-8"
        :class="{
          'grid-cols-3': tasksStore.arrangement === Arrangement.Grid,
          'grid-cols-1': tasksStore.arrangement === Arrangement.Grid,
        }"
      >
        <card-task v-for="task in filteredTasks" :key="task.id" :task="task" />
      </TransitionGroup>
      <p v-if="!filteredTasks.length" class="text-light-text/[.5] dark:text-dark-text">
        Nenhuma tarefa adicionada!
      </p>
    </div>
  </div>
  <modal-task v-model="modalTaskOpen" v-model:form="form" />
</template>

<script lang="ts">
import { useDirectoriesStore } from "~/state/directories.store";
import directories from "./directories.vue";
import { useTasksStore } from "~/state/tasks.store";
import { Arrangement } from "~/utils/enums/Arrangement";
import { SortByList, SortBy } from "~/utils/enums/SortBy";
import type { Task, TaskFields } from "~/utils/interface/Tasks";
import type { PropType } from "vue";

export default defineComponent({
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
      const directoryId = this.$route.query.directoryId

      if (directoryId) return this.tasks.filter(task => task.directoryId === Number(directoryId))
      return this.tasks
    },
    directoryName() {
      return this.directoryStore.selectedDirectory?.name;
    },
    directoryId() {
      return this.directoryStore.selectedDirectory?.id;
    },
    sortButtons: {
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
    directoryCount() {
      return this.directoryStore.getDirectoryCount(this.directoryId, this.tasks)
    },
  },
});
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}
</style>
