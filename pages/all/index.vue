<template>
  <page title="Todas as tarefas">
    <card>
      <template #header> my header</template>
      mu body
    </card>
    <dialog-modal v-model="dialogOpen" title="Meu títulozinho">
      o conteúdooo
    </dialog-modal>
    <button @click="dialogOpen = true">clique</button>
  </page>
</template>

<script lang="ts">
import * as yup from "yup";

export default {
  data() {
    return {
      dialogOpen: true,
    };
  },
};
</script>

<style></style>
