<template>
  <section>
    <div class="flex justify-between items-center mb-6">
    <section-title> Diretórios ({{ dummyDirectories.length }})</section-title>
    <btn-add>Adicionar diretório</btn-add>
  </div>
    <ul class="flex rounded-sm overflow-auto gap-1 pb-2">
      <li
        v-for="directory in dummyDirectories"
        :key="directory.id"
        :title="directory.name"
        class="py-3 pl-4 pr-3 bg-dark-200 flex items-center gap-3 hover:bg-dark-text/[.1] cursor-pointer text-nowrap"
        tabindex="0"
      >
        <span class="max-w-60 ">{{ directory.name }}</span>
        <options-btn />
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
export default {
  data() {
    return {
      dummyDirectories: [
        {
          id: 1,
          name: "Principal",
          default: true,
          count: 2,
        },
        {
          id: 2,
          name: "Tarefas de Casa",
          default: false,
          count: 15,
        },
        {
          id: 3,
          name: "Tarefas do trabs",
          default: false,
          count: 0,
        },
        {
          id: 3,
          name: "Tarefas do trabs",
          default: false,
          count: 0,
        },
        {
          id: 3,
          name: "Tarefas do trabs",
          default: false,
          count: 0,
        },
        {
          id: 3,
          name: "Tarefas do trabs",
          default: false,
          count: 0,
        },
        {
          id: 3,
          name: "Tarefas do trabs",
          default: false,
          count: 0,
        },
        {
          id: 3,
          name: "Tarefas do trabs",
          default: false,
          count: 0,
        },
        {
          id: 3,
          name: "Tarefas do trabs",
          default: false,
          count: 0,
        },
        {
          id: 3,
          name: "Tarefas do trabs",
          default: false,
          count: 0,
        },
        {
          id: 3,
          name: "Tarefas do trabs",
          default: false,
          count: 0,
        },
        {
          id: 3,
          name: "Tarefas do trabs",
          default: false,
          count: 0,
        },
        {
          id: 3,
          name: "Tarefas do trabs",
          default: false,
          count: 0,
        },
        {
          id: 3,
          name: "Tarefas do trabs",
          default: false,
          count: 0,
        },
        {
          id: 3,
          name: "Tarefas do trabs",
          default: false,
          count: 0,
        },
        {
          id: 3,
          name: "Tarefas do trabs",
          default: false,
          count: 0,
        },
        {
          id: 3,
          name: "Tarefas do trabs",
          default: false,
          count: 0,
        },
        {
          id: 3,
          name: "Tarefas do trabs",
          default: false,
          count: 0,
        },
      ],
    };
  },
};
</script>

<style>
</style>