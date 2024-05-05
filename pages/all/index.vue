<template>
  <page title="Todas as tarefas">
  
   <card-task v-for="task in taskStore.tasks" :key="task.id" :task="task" />
   
   <p v-if="!taskStore.tasks.length" class="text-light-text/[.5] dark:text-dark-text">
      Nenhuma tarefa adicionada!
    </p>
  </page>
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
