<template>
  <page title="Todas as tarefas" :tasks="taskStore.tasks" />
</template>

<script lang="ts">
import { useTasksStore } from "~/state/tasks.store";

export default {
  setup() {
    const taskStore = useTasksStore();

    return { taskStore };
  },
};
</script>

<style></style>
