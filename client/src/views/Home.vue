<script setup lang="ts">
  import { onMounted } from 'vue';
  import Movie from '../components/Movie.vue';
  import { searchMovie, searchStore } from '../stores/search';
  import { IMovie } from '../interfaces/Movie';
  import NotFound from '../components/NotFound.vue';

  onMounted(() => {
    searchMovie();
  });
</script>

<template>
  <ul v-if="searchStore.movies.length > 0" class="movies">
    <li v-for="item in (searchStore.movies as IMovie[])">
      <Movie :key="item.id" :title="item.title" :id="item.id" :posterPath="item.poster_path" />
    </li>
  </ul>
  <NotFound v-else />
</template>

<style scoped>
  .movies {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
    padding-block: 10px;
    width: 1440px;
    margin-inline: auto;
    list-style: none;
  }

  @media (max-width: 1440px) {
    .movies {
      grid-template-columns: repeat(4, 1fr);
      width: 1280px;
    }
  }

  @media (max-width: 1280px) {
    .movies {
      width: 1024px;
    }
  }

  @media (max-width: 1024px) {
    .movies {
      width: 960px;
    }
  }

  @media (max-width: 960px) {
    .movies {
      grid-template-columns: repeat(2, 1fr);
      width: 768px;
    }
  }

  @media (max-width: 768px) {
    .movies {
      width: 640px;
    }
  }

  @media (max-width: 640px) {
    .movies {
      grid-template-columns: repeat(1, 1fr);
      width: 90vw;
    }
  }
</style>
