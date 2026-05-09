<template>
  <div class="timeline-view">
    <h2>{{ t('nav.timeline') }}</h2>
    <div ref="timelineChart" class="timeline-chart"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts';
import { usePresidentStore } from '@/stores/presidents';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const store = usePresidentStore();
const { t, tm, locale } = useI18n();
const timelineChart = ref<HTMLElement | null>(null);
let chart: echarts.ECharts | null = null;

const renderChart = () => {
  if (!chart) return;

  const presidents = [...store.presidents].reverse();
  // Calculate height based on number of presidents to avoid squeezing
  const chartHeight = Math.max(800, presidents.length * 40);
  if (timelineChart.value) {
    timelineChart.value.style.height = `${chartHeight}px`;
    chart.resize();
  }

  // Define Party Colors
  const partyColors: Record<string, string> = {
    'Republican': '#E81B23', // Standard GOP Red
    'Democratic': '#00AEF3', // Standard Dem Blue
    'Democratic-Republican': '#008000', // Green
    'Federalist': '#EA650D', // Orange
    'Whig': '#F0C862', // Gold/Yellow
    'Independent': '#999999' // Grey
  };

  const getPartyColor = (party: string) => partyColors[party] || '#999999';

  // Group data by party
  const parties = [...new Set(presidents.map(p => p.party))];
  const series = parties.map(party => {
    const partyData = presidents
      .map((p, index) => {
        if (p.party !== party) return null;
        
        // Get achievements safely
        const achievementsRaw = tm(`presidents.${p.key}.achievements`) as any;
        const achievements: string[] = Array.isArray(achievementsRaw) ? achievementsRaw : [];
        
        return {
          name: t(`presidents.${p.key}.name`),
          value: [
            index,
            p.startYear,
            p.endYear,
            p.term
          ],
          // Extra data for tooltip
          description: t(`presidents.${p.key}.description`),
          achievements: achievements,
          party: t(`parties.${p.party}`),
          id: p.id,
          itemStyle: {
            color: getPartyColor(p.party)
          }
        };
      })
      .filter(item => item !== null);

    return {
      name: t(`parties.${party}`),
      type: 'custom',
      renderItem: function (params: any, api: any) {
        const categoryIndex = api.value(0);
        const start = api.coord([api.value(1), categoryIndex]);
        const end = api.coord([api.value(2), categoryIndex]);
        const height = api.size([0, 1])[1] * 0.6; // Slightly thinner for cleaner look
        
        const rectShape = echarts.graphic.clipRectByRect({
          x: start[0],
          y: start[1] - height / 2,
          width: end[0] - start[0],
          height: height
        }, {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height
        });

        return rectShape && {
          type: 'rect',
          transition: ['shape'],
          shape: {
            ...rectShape,
            r: 4
          },
          style: api.style()
        };
      },
      itemStyle: {
        opacity: 0.9,
        shadowBlur: 3,
        shadowColor: 'rgba(0,0,0,0.3)'
      },
      encode: {
        x: [1, 2],
        y: 0
      },
      data: partyData
    };
  });

  const isMobile = window.innerWidth <= 768;

  const option = {
    tooltip: {
      trigger: 'item',
      enterable: true,
      confine: true,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#eee',
      borderWidth: 1,
      textStyle: {
        color: '#333'
      },
      extraCssText: 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); border-radius: 8px;',
      formatter: function (params: any) {
        const d = params.data;
        const achievementsList = d.achievements.map((a: string) => `<li style="margin-bottom: 4px;">${a}</li>`).join('');
        
        return `
          <div style="max-width: 350px; font-family: sans-serif;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid ${d.itemStyle.color}; padding-bottom: 8px; margin-bottom: 10px;">
              <h3 style="margin: 0; font-size: 16px;">${d.name}</h3>
              <span style="background: ${d.itemStyle.color}; color: #fff; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: bold;">${d.party}</span>
            </div>
            
            <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px; margin-bottom: 12px; font-size: 13px;">
              <span style="color: #666; font-weight: bold;">${t('detail.term')}:</span>
              <span>${d.value[3]}</span>
            </div>

            <p style="margin: 0 0 12px 0; color: #555; font-size: 13px; line-height: 1.5; background: #f9f9f9; padding: 8px; border-radius: 4px;">
              ${d.description}
            </p>

            <div style="margin-bottom: 8px;">
              <strong style="display: block; margin-bottom: 6px; font-size: 13px; color: #333;">${t('detail.achievements')}:</strong>
              <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #666;">
                ${achievementsList}
              </ul>
            </div>
            
            <div onclick="window.openPresidentDetail('${d.id}')" style="margin-top: 12px; padding-top: 8px; border-top: 1px dashed #eee; text-align: right; color: ${d.itemStyle.color}; font-size: 12px; cursor: pointer;">
              ${t('home.readMore')} →
            </div>
          </div>
        `;
      }
    },
    legend: {
      top: isMobile ? 40 : 10,
      type: 'scroll',
      data: parties.map(p => t(`parties.${p}`)),
      textStyle: {
        fontSize: 12
      },
      width: isMobile ? '90%' : 'auto',
      left: isMobile ? 'center' : 'auto',
      right: isMobile ? 'auto' : 30
    },
    title: {
      text: t('timeline.title'),
      left: isMobile ? 'center' : '10',
      top: 10,
      textStyle: {
        fontSize: isMobile ? 16 : 18,
        fontWeight: 'bold'
      }
    },
    grid: {
      top: isMobile ? 100 : 80,
      bottom: 30,
      left: isMobile ? 120 : 180,
      right: 30
    },
    xAxis: {
      type: 'value',
      min: 1789,
      max: 2030,
      name: t('timeline.year'),
      position: 'top',
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#eee'
        }
      },
      axisLabel: {
        formatter: '{value}'
      }
    },
    yAxis: {
      type: 'category',
      data: presidents.map(p => t(`presidents.${p.key}.name`)),
      inverse: true,
      axisLabel: {
        interval: 0,
        fontWeight: 'bold',
        color: '#333',
        formatter: function(value: string) {
          return value;
        }
      },
      axisPointer: {
        show: true,
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    },
    series: series
  };

  chart.setOption(option, true);
  
  // Default to show tooltip for the latest president (index 0)
  // Find which series contains the president with index 0
  let targetSeriesIndex = -1;
  let targetDataIndex = -1;
  
  series.forEach((s, sIndex) => {
    const dIndex = s.data.findIndex((item: any) => item.value[0] === 0);
    if (dIndex !== -1) {
      targetSeriesIndex = sIndex;
      targetDataIndex = dIndex;
    }
  });

  if (targetSeriesIndex !== -1 && targetDataIndex !== -1) {
    // Small delay to ensure render complete
    setTimeout(() => {
      chart?.dispatchAction({
        type: 'showTip',
        seriesIndex: targetSeriesIndex,
        dataIndex: targetDataIndex
      });
      // Optional: also highlight the item
      chart?.dispatchAction({
        type: 'highlight',
        seriesIndex: targetSeriesIndex,
        dataIndex: targetDataIndex
      });
    }, 500);
  }
  
  // Add click event
  chart.off('click'); // Remove old listeners
  chart.on('click', (params: any) => {
    if (params.data && params.data.id) {
      router.push({ name: 'president-detail', params: { id: params.data.id } });
    }
  });
};

onMounted(() => {
  // Add global function for tooltip click
  (window as any).openPresidentDetail = (id: string) => {
    router.push({ name: 'president-detail', params: { id } });
  };

  if (timelineChart.value) {
    chart = echarts.init(timelineChart.value);
    renderChart();
    window.addEventListener('resize', () => {
      chart?.resize();
      renderChart();
    });
  }
});

// Cleanup global function on unmount
import { onUnmounted } from 'vue';
onUnmounted(() => {
  delete (window as any).openPresidentDetail;
});

watch(locale, () => {
  nextTick(() => {
    if (chart) {
      chart.dispose();
      chart = null;
    }
    if (timelineChart.value) {
      chart = echarts.init(timelineChart.value);
    }
    renderChart();
  });
});
</script>

<style scoped>
.timeline-chart {
  width: 100%;
  height: 600px;
}
</style>