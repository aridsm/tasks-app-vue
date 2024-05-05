<template>
  <dialog-modal v-model="open" :title="title" card-classes="w-[32rem] p-2">
    <input-text
      v-model="formModel.name"
      name="name"
      label="Nome"
      data-type="input-name"
    />
    <input-select
      v-model="formModel.directoryId"
      :items="[]"
      name="directory"
      class="mt-4 mb-4"
      label="Diretório"
      data-type="input-directory"
    />
    <input-date
      v-model="formModel.finalDate"
      name="finalDate"
      label="Data final sugerida"
      data-type="input-finalDate"
    />
    <input-textarea
      v-model="formModel.description"
      name="description"
      label="Descrição"
      class="mt-4 max-h-60"
      data-type="input-description"
    />
    <input-checkbox
      v-model="formModel.important"
      name="important"
      label="Marcar como importante"
      class="mt-4"
      data-type="input-important"
    />
    <div class="flex mt-4 gap-4">
      <btn
        v-if="formModel.id"
        color="red"
        flat
        class="flex gap-3 items-center"
        data-type="delete-task"
        @click="onDeleteTask"
      >
        Excluir
        <icon icon="fa-regular fa-trash-can" class="text-lg -mt-1" />
      </btn>
      <btn
        color="base"
        flat
        @click="() => (open = false)"
        class="ml-auto px-4"
      >
        Cancelar
      </btn>
      <btn data-type="save-task" 
        @click="onSaveTask">
        {{ formModel?.id ? "Editar" : "Adicionar" }}
      </btn>
    </div>
  </dialog-modal>
</template>

<script lang="ts">
import { useTasksStore } from "~/state/tasks.store";
import type { Task, TaskFields } from "~/utils/interface/Tasks";

export default {
  props: {
    modelValue: { type: Boolean, required: true },
    form: {
      type: Object as PropType<TaskFields>,
      required: true,
    },
    title: { type: String, default: "Adicionar tarefa" },
  },
  setup() {
    const taskStore = useTasksStore()

    return { taskStore }
  },
  emits: ["update:modelValue", "update:form"],
  computed: {
    open: {
      get() {
        return this.modelValue;
      },
      set(value: string | number) {
        this.$emit("update:modelValue", value);
      },
    },
    formModel: {
      get() {
        return this.form;
      },
      set(value: Partial<Task>) {
        this.$emit("update:form", value);
      },
    },
  },
  methods: {
    onSaveTask() {
      this.taskStore.saveTaskHandler(this.formModel)
      this.open = false
    },
    onDeleteTask() {
      this.taskStore.deleteTaskHandler(this.formModel.id!)
      this.open = false
    }
  }
};
</script>
