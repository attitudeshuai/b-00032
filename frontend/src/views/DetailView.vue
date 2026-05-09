<template>
  <div class="detail-container" v-if="president">
    <div class="header-nav">
      <el-button @click="goBack" icon="ArrowLeft" circle plain></el-button>
      <span class="nav-title" @click="goBack">{{ t('detail.back') }}</span>
    </div>
    
    <div class="hero-section">
      <div class="hero-content">
        <div class="hero-image-wrapper">
          <el-image 
            :src="president.portrait" 
            class="hero-image" 
            fit="cover"
            :preview-src-list="[president.portrait]"
          >
            <template #error>
              <div class="image-slot">
                <el-icon><UserFilled /></el-icon>
              </div>
            </template>
          </el-image>
        </div>
        <div class="hero-info">
          <h1 class="president-name">{{ t(`presidents.${president.key}.name`) }}</h1>
          <div class="hero-tags">
            <el-tag size="large" effect="dark" class="term-tag">{{ formatTerm(president.term) }}</el-tag>
            <el-tag size="large" :type="getPartyType(president.party)" effect="light" class="party-tag">
              {{ t('parties.' + president.party) }}
            </el-tag>
          </div>
          <p class="hero-description">{{ t(`presidents.${president.key}.description`) }}</p>
        </div>
      </div>
    </div>

    <div class="main-content">
      <el-tabs v-model="activeTab" class="detail-tabs">
        <!-- Overview Tab -->
        <el-tab-pane :label="t('detail.biography')" name="overview">
          <el-row :gutter="40">
            <el-col :span="16" :xs="24">
              <div class="section-block">
                <h3 class="section-title">
                  <el-icon><notebook /></el-icon>
                  {{ t('detail.historyBackground') }}
                </h3>
                <div class="text-content">
                  <!-- Try to get background text, fallback to description if not available, or a generic placeholder -->
                  <p>{{ tm(`presidents.${president.key}.background`) || t(`presidents.${president.key}.description`) }}</p>
                </div>
              </div>

              <div class="section-block">
                 <h3 class="section-title">
                  <el-icon><trophy /></el-icon>
                  {{ t('detail.achievements') }}
                </h3>
                <ul class="achievements-list">
                  <li v-for="(item, index) in tm(`presidents.${president.key}.achievements`)" :key="index">
                    <el-icon class="list-icon"><Select /></el-icon>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </el-col>
            
            <el-col :span="8" :xs="24">
              <el-card class="info-card" shadow="hover">
                <template #header>
                  <div class="card-header">
                    <span>{{ t('detail.statistics') }}</span>
                  </div>
                </template>
                <el-descriptions direction="vertical" :column="1" border>
                  <el-descriptions-item :label="t('detail.term')">{{ formatTerm(president.term) }}</el-descriptions-item>
                  <el-descriptions-item :label="t('detail.party')">
                     <el-tag size="small" :type="getPartyType(president.party)">{{ t('parties.' + president.party) }}</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item :label="t('timeline.year')">{{ president.startYear }} - {{ president.endYear }}</el-descriptions-item>
                </el-descriptions>
                <div ref="chartRef" class="chart-container"></div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- Multimedia Tab -->
        <el-tab-pane :label="t('detail.multimedia')" name="media">
          <div v-if="president.gallery && president.gallery.length > 0" class="video-section">
            <div v-for="(media, index) in president.gallery" :key="index" class="video-wrapper">
              <div v-if="media.type === 'video'" class="video-container">
                <div v-if="!playingStates[index]" class="video-overlay" @click="playVideo(index)">
                  <el-image :src="president.portrait" class="video-cover" fit="cover" />
                  <div class="play-button-wrapper">
                    <el-icon class="play-icon"><VideoPlay /></el-icon>
                  </div>
                </div>
                <iframe 
                  v-else
                  :src="getAutoplayUrl(media.url)" 
                  scrolling="no" 
                  border="0" 
                  frameborder="no" 
                  framespacing="0" 
                  allowfullscreen="true"
                  allow="autoplay; encrypted-media"
                  class="gallery-video"
                  referrerpolicy="no-referrer"
                ></iframe>
              </div>
              <div class="caption" v-if="media.caption">{{ media.caption }}</div>
            </div>
          </div>
          <el-empty v-else :description="t('detail.videoPlaceholder')"></el-empty>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePresidentStore } from '@/stores/presidents';
import { useI18n } from 'vue-i18n';
import * as echarts from 'echarts';
import { VideoPlay, UserFilled, ArrowLeft, Notebook, Trophy, Select } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const store = usePresidentStore();
const { t, tm, locale } = useI18n();
const activeTab = ref('overview');
const playingStates = ref<Record<number, boolean>>({});

const goBack = () => {
  if (window.history.state && window.history.state.back) {
    router.back();
  } else {
    router.push('/');
  }
};

const formatTerm = (term: string) => {
  if (term.includes('Present')) {
    return term.replace('Present', t('common.present'));
  }
  return term;
};

const presidentId = computed(() => parseInt(route.params.id as string) + 1);
const president = computed(() => store.getPresidentById(presidentId.value));
const chartRef = ref<HTMLElement | null>(null);
let chart: echarts.ECharts | null = null;

const playVideo = (index: number) => {
  playingStates.value[index] = true;
};

const stopAllVideos = () => {
  playingStates.value = {};
};

// Compute gallery images for preview list
const galleryImages = computed(() => {
  if (!president.value?.gallery) return [];
  return president.value.gallery
    .filter(m => m.type === 'image')
    .map(m => m.url);
});

const getGalleryImageIndex = (url: string) => {
  return galleryImages.value.indexOf(url);
};

const getPartyType = (party: string) => {
  if (party === 'Republican') return 'danger';
  if (party === 'Democratic') return 'primary';
  return 'info';
};

const getAutoplayUrl = (url: string) => {
  // Ensure autoplay is 1, removing existing autoplay param if present
  const cleanUrl = url.replace(/([?&])autoplay=[^&]*(&|$)/, '$1').replace(/[?&]$/, '');
  const separator = cleanUrl.includes('?') ? '&' : '?';
  return `${cleanUrl}${separator}autoplay=1`;
};

const initChart = () => {
  if (chartRef.value && president.value) {
    if (chart) chart.dispose();
    chart = echarts.init(chartRef.value);
    const duration = president.value.endYear - president.value.startYear;
    
    const option = {
      title: { 
        text: t('detail.termDuration'),
        left: 'center',
        textStyle: { fontSize: 14 }
      },
      tooltip: {
        formatter: '{b}: {c} ' + t('timeline.year')
      },
      grid: { top: 40, bottom: 20, left: 30, right: 30, containLabel: true },
      xAxis: { type: 'category', data: [t('detail.term')], show: false },
      yAxis: { type: 'value', minInterval: 1 },
      series: [{
        name: t('detail.termDuration'),
        data: [duration],
        type: 'bar',
        itemStyle: { 
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ]),
          borderRadius: [5, 5, 0, 0]
        },
        label: { show: true, position: 'top' },
        barWidth: '40%'
      }]
    };
    chart.setOption(option);
  }
};

onMounted(() => {
  initChart();
  window.addEventListener('resize', () => chart?.resize());
});

watch(activeTab, (newTab) => {
  if (newTab === 'overview') {
    nextTick(() => {
      chart?.resize();
    });
  }
  if (newTab !== 'media') {
    stopAllVideos();
  }
});

watch(locale, () => {
  nextTick(() => {
    initChart();
  });
});

watch(president, () => {
  stopAllVideos();
  nextTick(() => {
    initChart();
  });
});

onBeforeUnmount(() => {
  stopAllVideos();
});
</script>

<style scoped>
.detail-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px;
  animation: fadeIn 0.5s ease;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  color: #606266;
  transition: color 0.3s;
}

.header-nav:hover {
  color: #409EFF;
}

.hero-section {
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  margin-bottom: 30px;
}

.hero-content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.hero-image-wrapper {
  flex-shrink: 0;
  width: 300px;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  border: 4px solid #fff;
}

.hero-image {
  width: 100%;
  height: 100%;
  transition: transform 0.3s;
}

.hero-image:hover {
  transform: scale(1.05);
}

.hero-info {
  flex: 1;
  padding-top: 10px;
}

.president-name {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 15px 0;
  color: #2c3e50;
  letter-spacing: -0.5px;
}

.hero-tags {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin: 0;
  max-width: 800px;
}

.main-content {
  background: #fff;
  border-radius: 12px;
  padding: 20px 30px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  min-height: 500px;
}

.section-block {
  margin-bottom: 30px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #303133;
  border-bottom: 2px solid #f0f2f5;
  padding-bottom: 10px;
}

.text-content {
  font-size: 1rem;
  line-height: 1.8;
  color: #606266;
  text-align: justify;
  white-space: pre-wrap;
}

.achievements-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.achievements-list li {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 1rem;
  line-height: 1.6;
  color: #606266;
  align-items: flex-start;
}

.list-icon {
  color: #67C23A;
  margin-top: 3px;
}

.info-card {
  height: 100%;
}

.chart-container {
  height: 250px;
  margin-top: 20px;
}

.video-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.video-wrapper {
  width: 100%;
  max-width: 800px;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  background: #000;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
}

.video-cover {
  width: 100%;
  height: 100%;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.video-overlay:hover .video-cover {
  opacity: 0.9;
}

.play-button-wrapper {
  position: absolute;
  z-index: 20;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.video-overlay:hover .play-button-wrapper {
  transform: scale(1.1);
  background-color: rgba(255, 0, 0, 0.8);
}

.play-icon {
  font-size: 48px;
  color: #fff;
}

.gallery-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}


.caption {
  padding: 10px;
  font-size: 0.9rem;
  color: #606266;
  text-align: center;
  background: #f9fafc;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .detail-container {
    padding: 4px;
  }

  .hero-section {
    padding: 20px 15px;
    margin-bottom: 10px;
  }

  .main-content {
    padding: 15px 10px;
    min-height: 200px;
  }

  .video-wrapper {
    margin-bottom: 10px;
  }

  .caption {
    padding: 8px 5px;
  }

  .hero-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
  }
  
  .hero-tags {
    justify-content: center;
  }
  
  .hero-image-wrapper {
    width: 240px;
    height: 320px;
  }
  
  .president-name {
    font-size: 2rem;
  }
  .play-button-wrapper {
    width: 60px;
    height: 60px;
  }

  .play-icon {
    font-size: 32px;
  }
}
</style>
