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
      validateOnMount
    >
      <textarea
        v-bind="field"
        class="x-input"
        :placeholder="placeholder"
        :rows="rows"
        @input="(e: Event) => $emit('update:modelValue', (e.target as HTMLTextAreaElement).value)"
      />
      <text-error>{{ errorMessage }}</text-error>
    </Field>
  </div>
</template>

<script lang="ts">

export default defineComponent({
  props: {
    modelValue: { type: String, required: true },
    name: { type: String, required: true },
    rules: { type: Object as any, default: undefined },
    placeholder: { type: String, default: "Digite..." },
    rows: { type: Number, default: 3 },
    label: { type: String },
  },
  emits: ["update:modelValue"],
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
});
</script>

<style></style>
