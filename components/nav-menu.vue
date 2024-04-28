<template>
  <nav class="flex flex-col pt-6">
    <NuxtLink v-for="link in links" :key="link.title"
      :to="link.to"
      v-slot="{ isActive }"
      :title="link.title"
      >
      <span class="text-nowrap flex gap-6 items-center pl-4 pr-6 h-14 w-full border-l-4 border-l-transparent hover:bg-light-100/[.1] dark:hover:bg-dark-text/[.1]" 
      :class="{
        'bg-light-100/[.1] dark:bg-white/[.05] border-l-4 border-l-white': isActive,
        'justify-center':!menuExpanded
      }">
        <icon :icon="link.icon" />
        <span v-if="menuExpanded">{{ link.title }}</span>
        <span v-if="menuExpanded" class="ml-auto">{{ link.count }}</span>
      </span>
    </NuxtLink>
  </nav>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    menuExpanded: Boolean
  },
  data() {
    return {
      links: [
        {
          to: '/today',
          title: 'Adicionadas hoje',
          icon: 'fa-regular fa-calendar-days',
          count: 0
        },
        {
          to: '/all',
          title: 'Todas as tarefas',
          icon: 'fa-solid fa-layer-group',
          count: 0
        },
        {
          to: '/done',
          title: 'Tarefas concluídas',
          icon: 'fa-regular fa-circle-check',
          count: 0
        },
        {
          to: '/late',
          title: 'Tarefas atrasadas',
          icon: 'fa-regular fa-clock',
          count: 0
        },
        {
          to: '/favorite',
          title: 'Favoritadas',
          icon: 'fa-regular fa-star',
          count: 0
        }
      ]
    }
  }
})
</script>

<style>

</style>