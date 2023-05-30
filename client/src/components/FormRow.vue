<script setup lang="ts">
  interface Props {
    type: string;
    name: string;
    labelText: string;
    modelValue: string;
  }

  defineProps<Props>();
  defineEmits(['update:modelValue']);
</script>

<template>
  <div class="form-row">
    <label :for="name">{{ labelText }}</label>
    <input
      :type="type"
      :name="name"
      v-bind:aria-valuetext="modelValue"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      required
      class="movie-input" />
  </div>
</template>

<style scoped>
  .form-row {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .movie-input {
    width: 100%;
    background-color: #333;
    border: none;
    border-radius: 10px;
    padding: 6px 10px;
    color: white;
    outline: none;
  }
</style>
