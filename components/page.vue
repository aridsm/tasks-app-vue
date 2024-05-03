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
          <span v-if="directoryName">{{ directoryName }} ({{ directoryCount }})</span>
        </section-title>
        <btn-add data-type="add-directory"> Adicionar tarefa </btn-add>
      </div>
      <div class="mb-6 flex items-center gap-1">
        <button title="Organizar por grid" class="grid place-items-center hover:bg-dark-text/[.1] w-10 h-10 rounded-full">
          <icon icon="fa-solid fa-grip" class="text-xl" />
        </button>
        <button title="Organizar por linhas"  class="grid place-items-center hover:bg-dark-text/[.1] w-10 h-10 rounded-full">
          <icon icon="fa-solid fa-bars" class="text-xl" />
        </button>
        <input-select v-model="sortBy" :items="items" clearable name="sort-by" class="w-[14rem] ml-auto" placeholder="Ordenar por" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { useDirectoriesStore } from "~/state/directories.store";
import directories from "./directories.vue";

export default defineComponent({
  components: { directories },
  setup() {
    const directoryStore = useDirectoriesStore();

    return { directoryStore };
  },
  props: {
    title: String,
  },
  data() {
    return {
      sortBy: null,
      items: [
        {
          id: 1,
          name: 'Data adicionada'
        },
        {
          id: 2,
          name: 'Ordem alfabética'
        }
      ]
    }
  },
  computed: {
    directoryName() {
      return this.directoryStore.selectedDirectory?.name;
    },
    directoryCount() {
      return this.directoryStore.selectedDirectory?.count;
    },
  },
});
</script>

<style></style>
