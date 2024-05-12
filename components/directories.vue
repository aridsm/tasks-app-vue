<template>
  <section>
    <div class="flex justify-between items-center mb-4">
      <section-title>
        Diretórios ({{ directoryStore.directories.length }})</section-title
      >
      <btn-add data-type="add-directory" @click="() => openFormNewDirectory()">
        Adicionar diretório
      </btn-add>
    </div>
    <TransitionGroup
      name="list"
      tag="ul"
      v-if="directoryStore.directories.length"
      class="flex rounded-sm overflow-auto gap-2 pb-2"
    >
      <li
        v-for="directory in directoryStore.directories"
        :key="directory.id"
        :title="directory.name"
        class="py-3 pl-4 pr-3 border border-dark-text/[.2] dark:border-dark-text/[.1] flex items-center gap-3 cursor-pointer text-nowrap"
        :class="{
          'bg-blue-light dark:bg-lilac text-white':
            directoryStore.selectedDirectory?.id === directory.id,
          'bg-light-100 dark:bg-dark-200':
            directoryStore.selectedDirectory?.id !== directory.id,
        }"
        tabindex="0"
        data-type="item-directory"
        @click="directoryStore.selectDirectoryHandler(directory?.id)"
      >
        <span class="max-w-60"
          >{{ directory.name }} ({{
            directoryStore.getDirectoryCount(directory.id, tasks)
          }})</span
        >
        <options-btn
          data-type="option-directory"
          @click.stop="() => openFormNewDirectory(directory)"
        />
      </li>
    </TransitionGroup>
    <p v-else class="text-light-text/[.5] dark:text-dark-text">
      Nenhum diretório adicionado!
    </p>
  </section>

  <dialog-modal
    v-model="modalDirectoryOpen"
    :title="!form.id ? 'Adicionar novo diretório' : 'Editar diretório'"
    card-classes="w-[32rem] p-2"
  >
    <input-text
      v-model="form.name"
      :rules="nameRule"
      name="name"
      label="Nome"
      data-type="input-name"
    />
    <input-textarea
      v-model="form.description"
      name="description"
      label="Descrição"
      class="mt-4"
      data-type="input-description"
    />
    <div class="flex mt-4 gap-4">
      <btn
        v-if="form.id"
        color="red"
        flat
        class="flex gap-3 items-center"
        data-type="delete-directory"
        @click="deleteDirectoryHandler"
      >
        Excluir
        <icon icon="fa-regular fa-trash-can" class="text-lg -mt-1" />
      </btn>
      <btn
        color="base"
        flat
        @click="() => (modalDirectoryOpen = false)"
        class="ml-auto px-4"
        >Cancelar</btn
      >
      <btn data-type="save-directory" @click="saveDirectoryHandler">
        {{ form.id ? "Editar" : "Adicionar" }}
      </btn>
    </div>
  </dialog-modal>
</template>

<script lang="ts">
import type { Directory } from "../utils/interface/Directory";
import { useDirectoriesStore } from "../state/directories.store";
import * as yup from "yup";
import { useAlertStore } from "../state/alerts.store";
import type { Task } from "~/utils/interface/Tasks";

export default {
  setup() {
    const directoryStore = useDirectoriesStore();

    const alertStore = useAlertStore();

    return { directoryStore, alertStore };
  },
  props: {
    tasks: { type: Array as PropType<Task[]>, required: true },
  },
  data() {
    return {
      nameRule: yup.string().required("Campo obrigatório"),
      modalDirectoryOpen: false,
      form: {
        id: 0,
        name: "",
        description: "",
      } as Directory,
    };
  },
  methods: {
    openFormNewDirectory(directory?: Directory) {
      if (directory) {
        this.form = { ...directory };
      } else {
        this.form = {
          id: 0,
          name: "",
          description: "",
        };
      }

      this.modalDirectoryOpen = true;
    },
    async saveDirectoryHandler() {
      const nameValidated = await this.nameRule.validate(this.form.name);

      if (nameValidated) {
        await this.directoryStore
          .saveDirectoryHandler(this.form)
          .then(() => {
            if (this.form.id) {
              this.alertStore.show(
                `O diretório "${this.form.name}" foi editado!`
              );
            } else {
              this.alertStore.show(
                `O diretório "${this.form.name}" foi criado!`
              );
            }
          })
          .catch(() => {
            this.alertStore.show(
              `Já existe um diretório com o nome "${this.form.name}"!`
            );
          })
          .finally(() => {
            this.modalDirectoryOpen = false;
          });
      }
    },
    async deleteDirectoryHandler() {
      if (this.form.id) {
        await this.directoryStore
          .deleteDirectoryHandler(this.form.id)
          .then(() => {
            this.alertStore.show(
              `O diretório "${this.form.name}" foi deletado!`
            );
          })
          .finally(() => {
            this.modalDirectoryOpen = false;
          });
      }
    },
  },
  created() {
    const directoryId = this.$route.query.directoryId;
    if (directoryId) this.directoryStore.selectDirectoryHandler(Number(directoryId));
  },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}
</style>
