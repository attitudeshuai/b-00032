<template>
  <div class="home">
    <div class="hero">
      <h1>{{ t('home.title') }}</h1>
      <div class="controls">
        <el-input
          v-model="store.searchQuery"
          :placeholder="t('home.search')"
          prefix-icon="Search"
          class="search-input"
          clearable
        />
        <el-select v-model="store.partyFilter" :placeholder="t('home.filterParty')" clearable class="filter-select">
          <el-option
            v-for="party in store.allParties"
            :key="party"
            :label="t('parties.' + party)"
            :value="party"
          />
        </el-select>
      </div>
    </div>

    <div class="president-grid">
      <el-card
        v-for="president in store.filteredPresidents"
        :key="president.id"
        class="president-card"
        :body-style="{ padding: '0px' }"
        shadow="hover"
        @click="goToDetail(president.id)"
      >
        <div class="image-container">
          <el-image 
            :src="president.portrait" 
            class="image" 
            fit="cover"
            lazy
          >
            <template #error>
              <div class="image-slot">
                <el-icon><UserFilled /></el-icon>
              </div>
            </template>
          </el-image>
        </div>
        <div class="card-content">
          <h3>{{ t(`presidents.${president.key}.name`) }}</h3>
          <p class="term">{{ formatTerm(president.term) }}</p>
          <el-tag :type="getPartyType(president.party)" size="small">{{ t('parties.' + president.party) }}</el-tag>
          <div class="footer">
            <el-button type="primary" link>{{ t('home.readMore') }}</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePresidentStore } from '@/stores/presidents';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const store = usePresidentStore();
const router = useRouter();
const { t } = useI18n();

const formatTerm = (term: string) => {
  if (term.includes('Present')) {
    return term.replace('Present', t('common.present'));
  }
  return term;
};

const goToDetail = (id: number) => {
  router.push(`/president/${id}`);
};

const getPartyType = (party: string) => {
  if (party === 'Republican') return 'danger';
  if (party === 'Democratic') return 'primary';
  return 'info';
};
</script>

<style scoped>
.hero {
  text-align: center;
  margin-bottom: 40px;
}
.controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
}
.search-input {
  width: 300px;
  max-width: 100%;
}

.filter-select {
  width: 300px;
  max-width: 100%;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 1.5rem;
    margin: 10px 0;
  }
  
  .controls {
    flex-direction: column;
    align-items: stretch;
    padding: 0 20px;
  }
  
  .search-input {
    width: 100% !important;
  }
  
  .filter-select {
    width: 100% !important;
  }
}

.president-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
.president-card {
  cursor: pointer;
  transition: transform 0.3s;
}
.president-card:hover {
  transform: translateY(-5px);
}
.image-container {
  height: 280px;
  overflow: hidden;
  background-color: #f5f7fa;
}
.image {
  width: 100%;
  height: 100%;
  display: block;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 50px;
}
.card-content {
  padding: 14px;
}
.term {
  color: #666;
  font-size: 0.9rem;
  margin: 5px 0;
}
.footer {
  margin-top: 10px;
  text-align: right;
}
</style>