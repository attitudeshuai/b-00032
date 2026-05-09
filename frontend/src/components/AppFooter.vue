<template>
  <footer class="app-footer">
    <div class="footer-content">
      <p>&copy; {{ currentYear }} {{ t('footer.copyright') }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t } = useI18n();
const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.app-footer {
  background-color: var(--el-bg-color-overlay);
  border-top: 1px solid var(--el-border-color-light);
  padding: 20px;
  text-align: center;
  /* Ensure it doesn't shrink if space is tight */
  flex-shrink: 0;
}

.footer-content {
  color: var(--el-text-color-regular);
  font-size: 14px;
}
</style>