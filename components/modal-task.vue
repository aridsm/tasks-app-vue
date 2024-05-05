<template>
  <dialog-modal v-model="open" :title="title" card-classes="w-[32rem] p-2">
    <input-text
      v-model="formModel.name"
      name="name"
      label="Nome"
      :rules="rules.name"
      data-type="input-name"
    />
    <input-select
      v-model="formModel.directoryId"
      :items="directoryStore.directories"
      :rules="rules.directoryId"
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
    <input-checkbox
      v-if="formModel.id"
      v-model="formModel.completed"
      name="completed"
      label="Marcar como concluída"
      class="mt-4"
      data-type="input-completed"
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
      <btn color="base" flat @click="() => (open = false)" class="ml-auto px-4">
        Cancelar
      </btn>
      <btn data-type="save-task" @click="onSaveTask">
        {{ formModel?.id ? "Editar" : "Adicionar" }}
      </btn>
    </div>
  </dialog-modal>
</template>

<script lang="ts">
import { useDirectoriesStore } from "~/state/directories.store";
import { useTasksStore } from "~/state/tasks.store";
import type { Task, TaskFields } from "~/utils/interface/Tasks";
import * as yup from "yup";

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
    const taskStore = useTasksStore();
    const directoryStore = useDirectoriesStore();

    return { taskStore, directoryStore };
  },
  data() {
    return {
      rules: {
        name: yup.string().required("Campo obrigatório"),
        directoryId: yup
          .number()
          .min(1, "Campo obrigatório")
          .required("Campo obrigatório"),
      },
    };
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
    async onSaveTask() {
      const directoryValidated = await this.rules.directoryId.validate(
        this.formModel.directoryId
      );
      const nameValidated = await this.rules.name.validate(this.formModel.name);

      if (directoryValidated && nameValidated) {
        this.taskStore.saveTaskHandler(this.formModel);
        this.open = false;
      }
    },
    onDeleteTask() {
      this.taskStore.deleteTaskHandler(this.formModel.id!);
      this.open = false;
    },
  },
};
</script>
