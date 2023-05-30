<script setup lang="ts"></script>

<template>
  <section class="container">
    <h2>Filme não encontrado...</h2>
    <RouterLink to="/">Clique aqui e procure novamente!</RouterLink>
  </section>
</template>

<style scoped>
  .container {
    width: 1440px;
    margin-inline: auto;
  }

  @media (max-width: 1440px) {
    .container {
      grid-template-columns: repeat(4, 1fr);
      width: 1280px;
    }
  }

  @media (max-width: 1280px) {
    .container {
      width: 1024px;
    }
  }

  @media (max-width: 1024px) {
    .container {
      width: 960px;
    }
  }

  @media (max-width: 960px) {
    .container {
      grid-template-columns: repeat(2, 1fr);
      width: 768px;
    }
  }

  @media (max-width: 768px) {
    .container {
      width: 640px;
    }
  }

  @media (max-width: 640px) {
    .container {
      grid-template-columns: repeat(1, 1fr);
      width: 90vw;
    }
  }
</style>
