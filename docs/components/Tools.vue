<script setup>
import { data } from "../data";
</script>

<template>
  <div v-for="item in data" :key="item.title" class="item">
    <h2 :id="item.title" tabindex="-1">
      {{ item.title }}
      <a
        class="header-anchor"
        :href="'#' + item.title"
        :aria-label="'Permalink to &quot;' + item.title + '&quot;'"
        >​</a
      >
    </h2>
    <div class="cards">
      <a
        v-for="app in item.items"
        :key="app.app"
        :href="app.url"
        target="_blank"
        class="app"
      >
        <span>{{ app.app }}</span>
        <img :src="`/assets/${app.img}`" :alt="app.app" width="24" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-bottom: 32px;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.app {
  flex: 1 1 calc(33.333% - 16px);
  box-sizing: border-box;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: inherit;
}

.app:hover {
  transform: scale(1.02);
  border: 1px solid var(--vp-c-brand-1);
}

.app img {
  margin-left: 8px;
  background-color: var(--vp-c-bg-alt);
  padding: 2px;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .app {
    flex: 1 1 calc(50% - 16px);
  }
}

@media (max-width: 480px) {
  .app {
    flex: 1 1 100%;
  }
}
</style>
