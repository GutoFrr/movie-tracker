<script setup lang="ts">
  import { onMounted } from 'vue';
  import CreateReview from '../components/CreateReview.vue';
  import Review from '../components/Review.vue';
  import { useRoute } from 'vue-router';
  import { getReviews, reviewStore } from '../stores/reviews.ts';

  const route = useRoute();

  onMounted(() => {
    getReviews(route.params.id);
  });
</script>

<template>
  <section class="container">
    <h3>Avaliações de:</h3>
    <h1 class="title">{{ $route.params.title }}</h1>

    <ul v-if="reviewStore.reviews.length > 0" class="reviews">
      <li v-for="item in reviewStore.reviews">
        <Review :item="item" />
      </li>
    </ul>

    <h2 v-else>Sem avaliações...</h2>

    <CreateReview />
  </section>
</template>

<style scoped>
  .container {
    width: 1440px;
    margin-inline: auto;
  }

  .title {
    font-size: 42px;
  }

  .reviews {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 1440px;
    gap: 12px;
    margin-bottom: 20px;
    list-style: none;
  }

  @media (max-width: 1440px) {
    .container {
      grid-template-columns: repeat(4, 1fr);
      width: 1280px;
    }

    .reviews {
      grid-template-columns: repeat(4, 1fr);
      width: 1280px;
    }
  }

  @media (max-width: 1280px) {
    .container {
      width: 1024px;
    }

    .reviews {
      width: 1024px;
    }
  }

  @media (max-width: 1024px) {
    .container {
      width: 960px;
    }

    .reviews {
      width: 960px;
    }
  }

  @media (max-width: 960px) {
    .container {
      grid-template-columns: repeat(2, 1fr);
      width: 768px;
    }

    .reviews {
      grid-template-columns: repeat(2, 1fr);
      width: 768px;
    }
  }

  @media (max-width: 768px) {
    .container {
      width: 640px;
    }

    .reviews {
      width: 640px;
    }
  }

  @media (max-width: 640px) {
    .container {
      grid-template-columns: repeat(1, 1fr);
      width: 90vw;
    }

    .reviews {
      grid-template-columns: repeat(1, 1fr);
      width: 90vw;
    }

    .movie-form {
      width: 90vw;
    }
  }
</style>
