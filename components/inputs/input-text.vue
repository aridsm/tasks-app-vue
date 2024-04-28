<template>
  <div class="flex flex-col">
    <label v-if="label" class="input-label" :for="name" >{{ label }}</label>
    <Field :name="name" :id="name" :rules="rules" v-slot="{ field, errorMessage }" class="flex flex-col" validateOnInput>
      <input v-bind="field" :type="type" class="x-input" :placeholder="placeholder" @input="(e: Event) => $emit('update:modelValue', (e.target as HTMLInputElement).value)" />
      <text-error>{{ errorMessage }}</text-error>
    </Field>
  </div>
</template>

<script lang="ts">
type types = "text" | "number" | "password";

export default defineComponent({
  props: {
    modelValue: {type: undefined as any as PropType<string | number>, required: true},
    type: { type: String as PropType<types>, default: "text" },
    name: { type: String, required: true },
    rules: { type: Object as any, default: undefined },
    placeholder: { type: String, default: 'Digite...' },
    label: { type: String },
  },
  emits: ['update:modelValue'],
  data() {
    return {};
  },
});
</script>

<style>
</style>