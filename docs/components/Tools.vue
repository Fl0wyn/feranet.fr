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
      <Badge type="tip" :text="item.items.length" style="margin-left: 0.2rem" />
    </h2>
    <div class="cards">
      <a
        v-for="app in item.items"
        :key="app.app"
        :href="app.url"
        target="_blank"
        class="app"
      >
        <div class="app-header">
          <span>{{ app.app }}</span>
          <img :src="`/assets/${app.img}`" :alt="app.app" width="24" />
        </div>
        <span class="detail">{{ app.detail }}</span>
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
  flex-direction: column;
  text-decoration: none;
  color: inherit;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app:hover {
  transform: scale(1.02);
  border: 1px solid var(--vp-c-brand-1);
}

.app img {
  background-color: var(--vp-c-bg-alt);
  padding: 2px;
  border-radius: 4px;
}

.detail {
  margin-top: 12px;
  font-size: 0.875rem;
  text-align: left;
  color: var(--vp-c-text-2);
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
