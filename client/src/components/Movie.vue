<script setup lang="ts">
  const imgPath = import.meta.env.VITE_IMG_PATH;

  defineProps<{ title: string; id: number; posterPath: string }>();
</script>

<template>
  <div class="movie">
    <img :src="imgPath + posterPath" :alt="title" class="thumbnail" />
    <h2>{{ title }}</h2>
    <RouterLink :to="'/movie/' + id + '/' + title" class="button">
      <p>Ver avaliações</p>
    </RouterLink>
  </div>
</template>

<style scoped>
  .movie {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    gap: 10px;
    border-radius: 19px;
    padding: 15px;
    text-align: center;
    background-color: #151515;
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.2);
  }

  .thumbnail {
    width: 100%;
    border-radius: 19px;
    object-fit: cover;
    transition-delay: 0.1s;
    transition: all 0.3s;
  }

  .button {
    background-color: #0c0c0c;
    padding: 8px 20px;
    border: transparent;
    border-radius: 6px;
    box-shadow: 0 2px 12px 1px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    text-decoration: none;
  }

  .button > p {
    font-size: 18px;
    text-decoration: none;
    font-weight: 600;
    color: #797979;
  }
</style>
