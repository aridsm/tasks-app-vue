<template>
  <page title="Tarefas concluídas" :tasks="taskStore.completedTasks" />
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
