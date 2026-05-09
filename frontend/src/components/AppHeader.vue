<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    :ellipsis="false"
    router
    class="header-menu"
  >
    <div class="logo" @click="router.push('/')">{{ t('app.title') }}</div>
    <div class="flex-grow" />
    <el-menu-item index="/">{{ t('nav.home') }}</el-menu-item>
    <el-menu-item index="/timeline">{{ t('nav.timeline') }}</el-menu-item>
    <el-menu-item index="/mindmap">{{ t('nav.mindmap') }}</el-menu-item>
    <div class="lang-switch">
      <el-dropdown @command="handleLanguageChange">
        <span class="el-dropdown-link">
          {{ currentLangLabel }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
            <el-dropdown-item command="fr">Français</el-dropdown-item>
            <el-dropdown-item command="de">Deutsch</el-dropdown-item>
            <el-dropdown-item command="ru">Русский</el-dropdown-item>
            <el-dropdown-item command="ko">한국어</el-dropdown-item>
            <el-dropdown-item command="ja">日本語</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ArrowDown } from '@element-plus/icons-vue';

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const activeIndex = computed(() => route.path);

const languageMap: Record<string, string> = {
  zh: '中文',
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  ru: 'Русский',
  ko: '한국어',
  ja: '日本語'
};

const currentLangLabel = computed(() => languageMap[locale.value] || 'Language');

const handleLanguageChange = (lang: string) => {
  locale.value = lang;
};
</script>

<style scoped>
.header-menu {
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: var(--el-menu-bg-color);
}
.logo {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #409eff;
  margin-right: 20px;
  cursor: pointer;
}
.flex-grow {
  flex-grow: 1;
}
.lang-switch {
  display: flex;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  color: var(--el-text-color-primary);
  outline: none;
}

@media (max-width: 768px) {
  .header-menu {
    padding: 0 8px;
  }
  .logo {
    font-size: 1rem;
    margin-right: 8px;
  }
  :deep(.el-menu-item) {
    padding: 0 8px;
  }
}
</style>