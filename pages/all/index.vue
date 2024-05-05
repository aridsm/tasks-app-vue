<template>
  <page title="Todas as tarefas">
    <card v-for="task in dummyTasks" :key="task.id" class="w-full">
      <template #header>
        <div class="flex justify-between items-center text-sm">
          <span
            ><icon icon="fa-regular fa-folder-open" class="mr-1" />
            {{ task.directoryName }}</span
          >
          <span>{{ String(task.id).padStart(5, "0") }}</span>
        </div>
      </template>
        <div class="flex gap-4 justify-between items-start">
          <p class="text-lg font-semibold mb-2">{{ task.name }}</p>
          <options-btn data-type="option-task" />
        </div>
        <p class="text-light-light-text dark:text-dark-text mb-8">
          {{ task.description }}
        </p>
        <div class="mt-auto justify-between items-center flex">
          <div>
            <section-title>Data final sugerida</section-title>
            <span class="text-light-light-text dark:text-dark-text block mt-1">{{
              $dayjs(task.finalDate).format("DD/MM/YYYY")
            }}</span>
          </div>
          <div class="flex gap-4 items-center">
            <span v-if="new Date(task.finalDate).getTime() < todaysDateTime" title="Tarefa atrasada"><icon icon="fa-regular fa-clock" class="text-lg text-red-500" /></span>
            <button :title="!task.important ? 'Marcar como importante' : 'Importante'"><icon :icon="!task.important ?' fa-regular fa-star' : 'fa-solid fa-star'" class="text-lg" :class="{
              'text-yellow-500': task.important
            }" /></button>
          </div>
        </div>
    </card>
  </page>
</template>

<script lang="ts">
export default {
  data() {
    return {
      dummyTasks: [
        {
          id: 1,
          name: "Minha tarefinha",
          description:
            "Descrição dessa tarefa aqui pra ver como vai ficar depois... Só pra dar mais uma linha aí",
          important: true,
          finalDate: new Date('2020-08-08T03:00:00Z'),
          addedDate: new Date(),
          directoryId: 1,
          directoryName: "Tarefas Principais",
        },
        {
          id: 2,
          name: "Minha tarefinha 2",
          description:
            "Descrição dessa tarefa aqui pra ver como vai ficar depois...",
          important: false,
          finalDate:  new Date('2024-08-08T03:00:00Z'),
          addedDate: new Date(),
          directoryId: 1,
          directoryName: "Tarefas Principais",
        },
        {
          id: 2,
          name: "Minha tarefinha 2",
          description:
            "Descrição dessa tarefa aqui pra ver como vai ficar depois...",
          important: false,
          finalDate:  new Date('2024-08-08T03:00:00Z'),
          addedDate: new Date(),
          directoryId: 1,
          directoryName: "Tarefas Principais",
        },
        {
          id: 2,
          name: "Minha tarefinha 2",
          description:
            "Descrição dessa tarefa aqui pra ver como vai ficar depois...",
          important: false,
          finalDate:  new Date('2024-08-08T03:00:00Z'),
          addedDate: new Date(),
          directoryId: 1,
          directoryName: "Tarefas Principais",
        },
        {
          id: 2,
          name: "Minha tarefinha 2",
          description:
            "Descrição dessa tarefa aqui pra ver como vai ficar depois...",
          important: false,
          finalDate:  new Date('2024-08-08T03:00:00Z'),
          addedDate: new Date(),
          directoryId: 1,
          directoryName: "Tarefas Principais",
        },
        {
          id: 2,
          name: "Minha tarefinha 2",
          description:
            "Descrição dessa tarefa aqui pra ver como vai ficar depois...",
          important: false,
          finalDate:  new Date('2024-08-08T03:00:00Z'),
          addedDate: new Date(),
          directoryId: 1,
          directoryName: "Tarefas Principais",
        },
        {
          id: 2,
          name: "Minha tarefinha 2",
          description:
            "Descrição dessa tarefa aqui pra ver como vai ficar depois...",
          important: false,
          finalDate:  new Date('2024-08-08T03:00:00Z'),
          addedDate: new Date(),
          directoryId: 1,
          directoryName: "Tarefas Principais",
        },
      ],
    };
  },
  computed: {
    todaysDateTime() {
      return new Date().getTime()
    }
  }
};
</script>

<style></style>
