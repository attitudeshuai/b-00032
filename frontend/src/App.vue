<template>
  <AppHeader />
  <div class="main-container">
    <router-view />
  </div>
  <AppFooter />
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
</script>