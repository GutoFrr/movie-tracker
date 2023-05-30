<script setup lang="ts">
  import { searchMovie, searchStore } from '../stores/search';
</script>

<template>
  <nav class="navbar">
    <RouterLink class="logo" to="/">Movie Tracker</RouterLink>
    <div class="search-container">
      <form class="search-form" role="search" @submit.prevent="searchMovie">
        <input
          type="search"
          name="query"
          class="search"
          placeholder="Pesquisar..."
          v-model="searchStore.search" />
      </form>
    </div>
  </nav>
</template>

<style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1e1e1e;
    padding-block: 12px;
    width: 1440px;
    margin-inline: auto;
  }

  .logo {
    text-decoration: none;
    color: white;
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: 0.6px;
  }

  .search-form {
    width: 300px;
    height: 43px;
    display: flex;
    align-items: center;
  }

  .search {
    background-color: #333;
    border-radius: 11px;
    font: 15px system-ui;
    border: transparent;
    outline: none;
    color: #fff;
    height: 100%;
    width: 100%;
    padding: 6px 9px;
  }

  @media (max-width: 1440px) {
    .navbar {
      grid-template-columns: repeat(4, 1fr);
      width: 1280px;
    }
  }

  @media (max-width: 1280px) {
    .navbar {
      width: 1024px;
    }
  }

  @media (max-width: 1024px) {
    .navbar {
      width: 960px;
    }
  }

  @media (max-width: 960px) {
    .navbar {
      grid-template-columns: repeat(2, 1fr);
      width: 768px;
    }
  }

  @media (max-width: 768px) {
    .navbar {
      width: 640px;
    }
  }

  @media (max-width: 640px) {
    .search-form {
      width: 90vw;
    }
    .navbar {
      grid-template-columns: repeat(1, 1fr);
      width: 90vw;
    }
  }
</style>
