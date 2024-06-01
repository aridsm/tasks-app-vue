<template>
  <div class="flex w-screen">
    <sidebar-menu />
    <div
      class="flex-1 min-w-0 px-2 sm:pr-6 md:pl-28 lg:px-12 py-4 pb-20 md:pb-8 lg:pb-12 lg:pt-8 flex flex-col h-screen overflow-scroll "
    >
      <main class="max-w-[1300px] w-full mx-auto">
        <div
          class="grid grid-cols-3 sm:grid-cols-2 items-center gap-4 lg:gap-6 mb-4 md:mb-8"
        >
          <logo showName class="md:hidden" />

          <input-text
            v-model="search"
            name="search"
            placeholder="Pesquisar..."
            icon="fa-solid fa-magnifying-glass"
            class="input-search col-span-3 md:col-span-1"
            @blur="onSearch"
            @enter="onSearch"
          />
          <div
            class="flex items-center gap-4 lg:gap-6 user-header col-start-2 col-span-2 row-start-1"
          >
            <span class="hidden md:block">{{ todaysDate }}</span>
            <button
              class="flex gap-3 items-center sm:hidden ml-auto"
              :title="
                modeIsLight ? 'Mudar para modo escuro' : 'Mudar para modo claro'
              "
              @click="changeColorModeHandler"
            >
              <div
                class="w-10 h-6 px-1 bg-light-text/[.1] bg-light-text dark:bg-dark-100 rounded-full flex items-center"
              >
                <div
                  class="w-4 h-4 bg-light-text dark:bg-white rounded-full"
                  :class="{
                    'ml-auto': !modeIsLight,
                  }"
                ></div>
              </div>
            </button>
            <div class="flex gap-4 lg:gap-6 sm:ml-auto items-center">
              <p>user2949</p>
              <user-img class="rounded-full h-8 w-8 sm:w-12 sm:h-12" />
              <icon icon="fa-regular fa-bell"></icon>
            </div>
          </div>
        </div>
        <NuxtPage />
      </main>
    </div>
    <alerts />
    <confirmation/>
  </div>
</template>

<script lang="ts">
import { useColorModeStore } from "./state/colorMode.store";
import { months, daysWeek } from "./utils/dateUtils";
import dayjs from "dayjs";
import { ColorMode } from "./utils/enums/ColorMode";
import { useTasksStore } from "./state/tasks.store";
import { useDirectoriesStore } from "./state/directories.store";

export default {
  setup() {
    const colorModeStore = useColorModeStore();
    const directories = useDirectoriesStore()
    const tasks = useTasksStore()
    return { dayjs, colorModeStore, directories, tasks };
  },
  data() {
    return {
      search: "" as string,
    };
  },
  computed: {
    todaysDate() {
      const todaysDate = new Date();
      const month = this.dayjs(todaysDate).month();
      const date = this.dayjs(todaysDate).date();
      const day = this.dayjs(todaysDate).day();

      return `${daysWeek[day as number].fullName}, ${date} de ${
        months[month as number]
      }`;
    },
    modeIsLight() {
      return this.colorModeStore?.currentMode === ColorMode.Light;
    },
  },
  methods: {
    onSearch(search: string) {
      this.$router.push({
        query: { ...this.$route.query, search: search || undefined },
      });
    },
    changeColorModeHandler() {
      this.colorModeStore.switchColorModeHandler();
    },
  },
  created() {
    const searchQuery = this.$route.query.search;

    if (searchQuery) this.search = searchQuery as string;
  },
  beforeMount() {
    this.directories.getDirectoriesFromLocalStorage()
    this.tasks.getTasksFromLocalStorage()
  }
};
</script>

<style scoped>
.input-search {
  flex: 2;
}

.user-header {
  flex: 3;
}
</style>
