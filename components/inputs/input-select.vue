<template>
  <div :ref="`select-${name}`" class="flex flex-col relative">
    <label v-if="label" class="input-label" :for="name">{{ label }}</label>
    <Field
      v-model="value"
      :id="name"
      :rules="rules"
      v-slot="{ errorMessage }"
      :name="name"
      validateOnMount
      class="flex flex-col"
    >
      <button
        class="x-input flex justify-between items-center"
        data-type="button-select-item"
        @click="openItemsListHandler"
      >
        <span v-if="!objectItem?.id" class="text-dark-text">{{
          placeholder
        }}</span>
        <p>{{ objectItem.name }}</p>
        <div class="flex items-center gap-2">
          <div
            v-show="clearable && modelValue"
            data-type="button-clearable"
            class="text-dark-text grid place-items-center w-5 h-5 rounded-full hover:bg-dark-text/[.1] dark:hover:bg-dark-100 hover:text-"
            @click.stop="clearModelValueHandler"
          >
            <icon icon="fa-solid fa-xmark" />
          </div>
          <icon
            icon="fa-solid fa-chevron-down"
            class="transition"
            :class="{
              'rotate-90': itemsShown,
            }"
          />
        </div>
      </button>
      <text-error>{{ errorMessage }}</text-error>
    </Field>

    <div
      v-if="itemsShown"
      class="bg-light-100 dark:bg-dark-200 absolute left-0 max-w-80 w-max min-w-full z-50 items-select p-2"
    >
      <input-text v-model="search" name="search-select" class="mb-2" placeholder="Pesquisar..."/>
      <ul  v-if="filteredItems.length" class="max-h-56 overflow-auto" data-type="items-list">
        <li
          v-for="item in filteredItems"
          :key="item.id"
          class="p-3 hover:bg-gray-100 dark:hover:bg-dark-100 cursor-pointer"
          data-type="items-list-item"
          @click="selectItemHandler(item)"
        >
          {{ item.name }}
        </li>
      </ul>
      <p v-else class="mt-4 mb-2 text-center">Nenhum item encontrado!</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Field } from "vee-validate";
interface Item {
  [key: string]: any;
  id: number;
  name: string;
}

export default {
  props: {
    modelValue: { type: Number as PropType<number | null>, required: true },
    name: { type: String, required: true },
    items: { type: Array as PropType<Item[]>, required: true },
    rules: { type: Object as any, default: undefined },
    placeholder: { type: String, default: "Selecione..." },
    label: { type: String },
    clearable: { type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
  components: { Field },
  data() {
    return {
      itemsShown: false,
      mappedItems: {} as Map<number, Item>,
      objectItem: {} as Item,
      search: ''
    };
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value: string | number) {
        this.$emit("update:modelValue", value);
      },
    },
    filteredItems() {
      return this.items.filter(item => item.name.trim().toLowerCase().includes(this.search.trim().toLowerCase()))
    }
  },
  methods: {
    selectItemHandler(item: Item) {
      this.objectItem = item;
      this.$emit("update:modelValue", item.id);
      this.itemsShown = false;
    },
    clearModelValueHandler() {
      this.objectItem = {} as Item;
      this.$emit("update:modelValue", null);
    },
    openItemsListHandler() {
      this.itemsShown = true;
    },
    checkClickOutsideHandler(e: MouseEvent) {
      const container = this.$refs[`select-${this.name}`] as HTMLDivElement;

      if (container && e.target) {
        if (
          e.target !== container &&
          !container.contains(e.target as HTMLElement)
        ) {
          this.itemsShown = false;
        }
      }
    },
    getModelValueItem() {
      const item = this.modelValue
        ? this.mappedItems.get(this.modelValue)
        : null;
      if (item) {
        this.objectItem = item;
      }
    },
  },
  mounted() {
    this.mappedItems = new Map(this.items.map((item: Item) => [item.id, item]));
    this.getModelValueItem();
    window.addEventListener("click", this.checkClickOutsideHandler);
  },
  beforeUnmount() {
    window.removeEventListener("click", this.checkClickOutsideHandler);
  },
};
</script>

<style scoped>
.items-select {
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08);
  top: calc(100% + 5px);
}
</style>
