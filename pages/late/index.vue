<template>
    <page title="Tarefas atrasadas" :tasks="taskStore.lateTasks" />
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
  