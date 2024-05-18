<template>
  <header
    class="bg-blue-light dark:bg-dark-200 text-white relative h-screen py-6 border-r border-r-dark-text/[.1] border-t-8 border-t-blue-light dark:border-t-lilac flex flex-col transition-all"
    data-type="container"
    :class="{
      'w-72': menuExpanded,
      'w-20': !menuExpanded,
    }"
  >
    <button
      class="absolute top-3 -right-6 w-6 h-10 pr-1 grid place-items-center rounded-r-full bg-blue-light dark:bg-dark-200 dark:hover:bg-lilac border border-dark-text/[.1] border-l-transparent"
      :title="menuExpanded ? 'Minimizar menu' : 'Maximizar menu'"
      data-type="expand"
      @click="changeMenuWidthHandler"
    >
      <icon
        :class="{
          'rotate-180': !menuExpanded,
        }"
        icon="fa-solid fa-chevron-left"
      />
    </button>
    <logo class="px-5" :show-name="menuExpanded" />
    <btn
      class="mt-6 btn-add-new"
      :class="{ 'mx-6': menuExpanded, 'mx-4': !menuExpanded }"
      @click="addNewTaskHandler"
    >
      <span v-if="menuExpanded">Adicionar tarefa</span>
      <icon v-else icon="fa-solid fa-plus" />
    </btn>

    <nav-menu class="overflow-hidden" :menuExpanded="menuExpanded" />

    <div
      class="mt-auto flex flex-col"
      :class="{
        'px-6': menuExpanded,
        'px-4 items-center': !menuExpanded,
      }"
    >
      <button
        class="h-14 flex gap-3 items-center"
        :title="
          modeIsLight ? 'Mudar para modo escuro' : 'Mudar para modo claro'
        "
        @click="changeColorModeHandler"
      >
        <div
          class="w-10 h-6 px-1 bg-light-100/[.2] dark:bg-dark-300 rounded-full flex items-center"
        >
          <div
            class="w-4 h-4 bg-light-100 rounded-full"
            :class="{
              'ml-auto': !modeIsLight,
            }"
          ></div>
        </div>
        <icon
          v-show="menuExpanded"
          :icon="modeIsLight ? 'fa-regular fa-sun' : 'fa-solid fa-moon'"
          class="text-sm"
        ></icon>
      </button>
      <button
        class="flex gap-6 items-center h-14 text-nowrap"
        title="Limpar tudo"
        data-type="clear-all"
        :class="{
          'justify-center': !menuExpanded,
        }"
        @click="clearAll"
      >
        <icon icon="fa-solid fa-broom" />
        <span v-if="menuExpanded">Limpar tudo</span>
      </button>
      <span class="h-14 text-nowrap flex items-center">
        <a
          href="https://github.com/aridsm"
          target="_blank"
          class="text-white dark:text-dark-text flex gap-2 items-center"
        >
          <span :class="{ 'hidden': !menuExpanded }">Feito por Ariane Morelato</span>
          <icon icon="fa-brands fa-github" class="text-lg"/>
        </a>
      </span>
    </div>
  </header>
  <modal-task v-model="modalTaskOpen" v-model:form="form" />
</template>

<script lang="ts">
import type { TaskFields } from "~/utils/interface/Tasks";
import { useColorModeStore } from "../state/colorMode.store";
import { ColorMode } from "../utils/enums/ColorMode";
import { useTasksStore } from "~/state/tasks.store";
import { useDirectoriesStore } from "~/state/directories.store";

export default {
  setup() {
    const colorModeStore = useColorModeStore();
    const taskStore = useTasksStore();
    const directoriesStore = useDirectoriesStore();

    return { colorModeStore, taskStore, directoriesStore};
  },
  data() {
    return {
      menuExpanded: true,
      form: {} as TaskFields,
      modalTaskOpen: false
    };
  },
  computed: {
    modeIsLight() {
      return this.colorModeStore?.currentMode === ColorMode.Light;
    },
  },
  methods: {
    changeMenuWidthHandler() {
      this.menuExpanded = !this.menuExpanded;
    },
    changeColorModeHandler() {
      this.colorModeStore.switchColorModeHandler();
    },
    addNewTaskHandler() {
      this.form = {
        name: "",
        description: "",
        directoryId: 0,
        finalDate: new Date(),
        important: false,
        completed: false
      };

      this.modalTaskOpen = true;
    },
    clearAll() {
      this.directoriesStore.clearAllDirectories()
      this.taskStore.clearAllTasks()
    }
  },
};
</script>

<style scoped>
.btn-add-new {
  @apply bg-light-100 text-blue-light dark:text-white dark:bg-lilac px-2
}
</style>
