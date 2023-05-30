<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { deleteReview, editReview } from '../stores/reviews';
  import FormRow from './FormRow.vue';

  interface Props {
    item: {
      review: string;
      user: string;
      id: string;
    };
  }
  const props = defineProps<Props>();
  const { item } = props;

  const review = reactive({ review: item.review, user: item.user });
  const isEditing = ref(false);

  function handleSubmit() {
    editReview(item.id, review.user, review.review);
    isEditing.value = false;
  }
</script>

<template>
  <div v-if="!isEditing" class="review-card">
    <p><strong>Avaliação: </strong>{{ review.review }}</p>
    <p><strong>Usuário: </strong>{{ review.user }}</p>
    <div class="review-btns">
      <button class="edit-btn" type="button" @click="isEditing = true">Editar</button>
      <button class="delete-btn" type="button" @click="() => deleteReview(item.id)">Deletar</button>
    </div>
  </div>
  <form v-else-if="isEditing" class="review-card" @submit.prevent="handleSubmit">
    <FormRow type="text" name="review" labelText="Avaliação" v-model="review.review" />
    <FormRow type="text" name="user" labelText="Usuário" v-model="review.user" />
    <div class="review-btns">
      <button class="edit-btn" type="submit">Enviar</button>
      <button class="delete-btn" type="button" @click="isEditing = false">Cancelar</button>
    </div>
  </form>
</template>

<style scoped>
  .review-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: #151515;
    padding: 20px;
    border-radius: 4px;
  }

  .review-btns {
    display: flex;
    gap: 4px;
  }

  .edit-btn {
    padding-inline: 8px;
    background-color: #2c4165;
    border: none;
    padding: 4px 10px;
    color: white;
    border-radius: 4px;
    box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.2);
    font-weight: 500;
    text-transform: uppercase;
    cursor: pointer;
  }

  .delete-btn {
    padding-inline: 8px;
    background-color: #ab4b6e;
    border: none;
    padding: 4px 10px;
    color: white;
    border-radius: 4px;
    box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.2);
    font-weight: 500;
    text-transform: uppercase;
    cursor: pointer;
  }
</style>
