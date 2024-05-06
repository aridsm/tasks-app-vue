<template>
  <li class="w-full h-full">
  <modal-task v-model="modalTaskOpen" v-model:form="form" title="Editar tarefa" />
  <card class="w-full h-full">
    <template #header>
      <div class="flex justify-between items-center text-xs">
        <span
          ><icon icon="fa-regular fa-folder-open" class="mr-1" />
          {{ task.directoryName }}</span
        >
        <span>{{ String(task.id).padStart(5, "0") }}</span>
      </div>
    </template>
    <div class="flex gap-4 justify-between items-start">
      <p class="text-base font-semibold mb-2">{{ task.name }}</p>
      <options-btn
        data-type="option-task"
        @click="() => selectTaskHandler(task)"
      />
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
        <span
          v-if="new Date(task.finalDate).getTime() < todaysDateTime "
          title="Tarefa atrasada"
          ><icon icon="fa-regular fa-clock" class="text-lg text-red-500"
        /></span>
        <button
          :title="!task.important ? 'Marcar como importante' : 'Importante'"
          @click="() => taskStore.toggleImportant(task)"
        >
          <icon
            :icon="!task.important ? ' fa-regular fa-star' : 'fa-solid fa-star'"
            class="text-lg"
            :class="{
              'text-yellow-500': task.important,
            }"
          />
        </button>
      </div>
    </div>
  </card>
  </li>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { useTasksStore } from "~/state/tasks.store";
import type { Task, TaskFields } from "~/utils/interface/Tasks";

export default {
  setup() {
    const taskStore = useTasksStore();

    return { taskStore };
  },
  props: {
    task: {type: Object as PropType<Task>, required: true}
  },
  data() {
    return {
      form: {} as TaskFields,
      modalTaskOpen: false,
    };
  },
  computed: {
    todaysDateTime() {
      return new Date().getTime();
    },
  },
  methods: {
    selectTaskHandler(task: Task) {
      this.form = { ...task };
      this.modalTaskOpen = true;
    },
  },
};
</script>

<style></style>
