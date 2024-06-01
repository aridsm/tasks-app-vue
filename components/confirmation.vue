<template>
  <dialog-modal v-model="confirmationStore.showConfirmation" :z-index="9999999">
    <div class="flex flex-col items-center gap-8 w-72 -mt-8">
      <icon
        icon="fa-solid fa-triangle-exclamation"
        class="text-4xl text-red-500 dark:text-dark-100"
      />

      <p class="text-center">
        {{confirmationStore.message}}
      </p>
      <btn 
        data-type="btn-confirmation" color="base" @click="confirmationStore.action">Confirmar</btn>
    </div>
  </dialog-modal>
</template>

<script lang="ts">
import { useConfirmation } from '../state/confirmation.store';

export default {
  setup() {
    
    const confirmationStore = useConfirmation()

    return { confirmationStore }
  },
};
</script>
