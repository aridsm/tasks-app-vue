<template>
  <div class="flex flex-col">
    <label v-if="label" class="input-label" :for="name">{{ label }}</label>
    <Field
      v-model="value"
      :name="name"
      :id="name"
      :rules="rules"
      v-slot="{ field, errorMessage }"
      class="flex flex-col"
      validateOnInput
      validateOnMount
    >
      <div class="relative">
        <input
          v-bind="field"
          :type="type"
          class="x-input w-full"
          :class="{
            'input-icon': icon,
          }"
          :placeholder="placeholder"
          @input="(e: Event) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
          @blur="(e: Event) => $emit('blur', (e.target as HTMLInputElement).value)"
          @keypress.enter="(e: Event) => $emit('enter', (e.target as HTMLInputElement).value)"
        />
        <icon v-if="icon" :icon="icon" class="absolute right-4 top-4" />
      </div>
      <text-error>{{ errorMessage }}</text-error>
    </Field>
  </div>
</template>

<script lang="ts">
type types = "text" | "number" | "password";

export default {
  props: {
    modelValue: {
      type: undefined as any as PropType<string | number>,
      required: true,
    },
    name: { type: String, required: true },
    type: { type: String as PropType<types>, default: "text" },
    rules: { type: Object as any, default: undefined },
    placeholder: { type: String, default: "Digite..." },
    label: { type: String },
    icon: { type: String },
  },
  emits: ["update:modelValue", "blur", "enter"],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value: string | number) {
        this.$emit('update:modelValue', value)
      }
    }
  }
};
</script>

<style scoped>
.input-icon {
  padding-right: 46px !important;
}
</style>
