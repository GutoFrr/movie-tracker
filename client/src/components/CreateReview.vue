<script setup lang="ts">
  import FormRow from '../components/FormRow.vue';
  import { createReview, reviewStore } from '../stores/reviews.ts';
</script>

<template>
  <form class="movie-form" @submit.prevent="createReview($route.params.id)">
    <p>Nova Avaliação</p>
    <FormRow type="text" name="review" labelText="Avaliação" v-model="reviewStore.review" />
    <FormRow type="text" name="user" labelText="Usuário" v-model="reviewStore.user" />
    <button class="submit-btn" type="submit" :disabled="reviewStore.loading">Enviar</button>
  </form>
</template>

<style scoped>
  .movie-form {
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: #151515;
    padding: 15px;
    border-radius: 4px;
    margin-inline: auto;
  }

  .submit-btn {
    border: none;
    padding: 8px 20px;
    color: white;
    background-color: #254e53;
    border-radius: 4px;
    box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.2);
    font-weight: 500;
    text-transform: uppercase;
    cursor: pointer;
  }

  .submit-btn:disabled {
    cursor: default;
    background-color: rgb(20, 68, 75)
  }
</style>
