<template>
  <page title="Adicionadas hoje" :tasks="taskStore.importantTasks" />
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
