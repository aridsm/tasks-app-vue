<template>
  <div class="bg-dark-100 relative h-screen py-6 border-t-8 border-t-lilac flex flex-col transition-all"
  :class="{
    'w-80': menuExpanded,
    'w-20': !menuExpanded,
  }">
  
  <button class="absolute top-3 -right-6 p-2 rounded-r-md bg-dark-100" title="Minimizar menu" @click="changeMenuWidthHandler"><icon :class="{
    'rotate-180': !menuExpanded
  }" icon="fa-solid fa-chevron-left" /></button>
  <logo class="mx-5" :show-name="menuExpanded" />
  <btn class="mt-6 " :class="{'mx-6': menuExpanded, 'mx-4': !menuExpanded}">
    <span v-if="menuExpanded">Adicionar tarefa</span>
    <icon v-else icon="fa-solid fa-plus" />
  </btn>

  <nav-menu class="overflow-hidden" :menuExpanded="menuExpanded" />

  <div class="mt-auto px-6 flex flex-col">
    <button class="flex gap-6 items-center py-4 text-nowrap" 
    title="Limpar tudo"
    :class="{
      'justify-center':!menuExpanded
    }"
  >
      <icon icon="fa-solid fa-broom" />
      <span v-if="menuExpanded">Limpar tudo</span>
    </button>
    <span class="mt-6 text-nowrap" :class="{'opacity-0': !menuExpanded}">Feito por <a href="https://github.com/aridsm" target="_blank" class="text-lilac">Ariane Morelato</a></span>
  </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      menuExpanded: true
    }
  },
  methods: {
    changeMenuWidthHandler() {
      this.menuExpanded = !this.menuExpanded
    }
  }
})
</script>

<style>

</style>