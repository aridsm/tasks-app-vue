<template>
  <div class="max-w-[1420px] w-full mx-auto">
    <h1 v-if="title" class="text-2xl font-semibold -tracking-tight mb-8">
      {{ title }}
    </h1>
    <directories />

    <div
      class="border-t dark:border-t-dark-100 border-t-light-text/[.1] pt-8 mt-8"
    >
      <div class="mb-3 flex justify-between items-center">
        <section-title class="flex gap-3">
          Tarefas
          <span v-if="directoryName">
            <icon icon="fa-solid fa-chevron-right" />
          </span>
          <span v-if="directoryName"
            >{{ directoryName }} ({{ directoryCount }})</span
          >
        </section-title>
        <btn-add data-type="add-directory"> Adicionar tarefa </btn-add>
      </div>
      <div class="mb-6 flex items-center gap-1">
        <button
          v-for="button in sortButtons"
          :key="button.id"
          :title="button.title"
          class="grid place-items-center hover:bg-dark-text/[.1] w-10 h-10 rounded-full "
          :class="{
            'text-light-text/[.5] dark:text-dark-text': tasksStore.arrangement !== button.arrangement,
            'dark:text-lilac text-blue-light': tasksStore.arrangement === button.arrangement,
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
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { useDirectoriesStore } from "~/state/directories.store";
import directories from "./directories.vue";
import { useTasksStore } from "~/state/tasks.store";
import { Arrangement } from "~/utils/enums/Arrangement";
import { SortByList, SortBy } from "~/utils/enums/SortBy";

export default defineComponent({
  components: { directories },
  setup() {
    const directoryStore = useDirectoriesStore();
    const tasksStore = useTasksStore();

    return { directoryStore, tasksStore, SortByList};
  },
  props: {
    title: String,
  },
  data() {
    return {
      sortBy: null as unknown as SortBy,
    };
  },
  watch: {
    sortBy() {
      this.tasksStore.setTasksSort(this.sortBy)
    }
  },
  computed: {
    directoryName() {
      return this.directoryStore.selectedDirectory?.name;
      
    },
    directoryCount() {
      return this.directoryStore.selectedDirectory?.count;
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
});
</script>

<style></style>
