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
    <ul
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
        @click="directoryStore.selectDirectoryHandler(directory)"
      >
        <span class="max-w-60"
          >{{ directory.name }} ({{ directory.count }})</span
        >
        <options-btn
          data-type="option-directory"
          @click.stop="() => openFormNewDirectory(directory)"
        />
      </li>
    </ul>
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

export default {
  setup() {
    const directoryStore = useDirectoriesStore();

    return { directoryStore };
  },
  data() {
    return {
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
    saveDirectoryHandler() {
      this.directoryStore.saveDirectoryHandler(this.form);
      this.modalDirectoryOpen = false;
    },
    deleteDirectoryHandler() {
      if (this.form.id) {
        this.directoryStore.deleteDirectoryHandler(this.form.id);
      }
      this.modalDirectoryOpen = false;
    },
  },
};
</script>

<style></style>
