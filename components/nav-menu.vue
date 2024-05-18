<template>
  <nav class="flex flex-col pt-6">
    <NuxtLink
      v-for="link in links"
      :key="link.title"
      :to="{ path: link.to, query: { ...$route.query, directoryId } }"
      v-slot="{ isActive }"
      :title="link.title"
    >
      <span
        class="text-nowrap flex gap-6 items-center pl-4 pr-6 h-14 w-full border-l-4 border-l-transparent hover:bg-light-100/[.1] dark:hover:bg-dark-text/[.1]"
        :class="{
          'bg-light-100/[.1] dark:bg-white/[.05] border-l-4 border-l-white':
            isActive,
          'justify-center': !menuExpanded,
        }"
      >
        <icon :icon="link.icon" />
        <span v-if="menuExpanded">{{ link.title }}</span>
        <nav-menu-item v-if="menuExpanded" :count="link.count" />
      </span>
    </NuxtLink>
  </nav>
</template>

<script lang="ts">
import { useTasksStore } from "../state/tasks.store";

export default defineComponent({
  setup() {
    const taskStore = useTasksStore();

    return {
      taskStore,
    };
  },
  props: {
    menuExpanded: Boolean,
  },
  computed: {
    links() {
      return [
        {
          to: "/today",
          title: "Adicionadas hoje",
          icon: "fa-regular fa-calendar-days",
          count: this.taskStore.todaysTasks.length,
        },
        {
          to: "/all",
          title: "Todas as tarefas",
          icon: "fa-solid fa-layer-group",
          count: this.taskStore.tasks.length,
        },
        {
          to: "/completed",
          title: "Tarefas concluídas",
          icon: "fa-regular fa-circle-check",
          count: this.taskStore.completedTasks.length,
        },
        {
          to: "/late",
          title: "Tarefas atrasadas",
          icon: "fa-regular fa-clock",
          count: this.taskStore.lateTasks.length,
        },
        {
          to: "/important",
          title: "Importantes",
          icon: "fa-regular fa-star",
          count: this.taskStore.importantTasks.length,
        },
      ];
    },
    directoryId() {
      return this.$route.query.directoryId;
    },
  },
});
</script>

<style></style>
