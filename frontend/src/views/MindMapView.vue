<template>
  <div class="mindmap-view">
    <h2>{{ t('nav.mindmap') }}</h2>
    <div ref="graphChart" class="graph-chart"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts';
import { useI18n } from 'vue-i18n';
import { usePresidentStore } from '@/stores/presidents';

const { t, locale } = useI18n();
const router = useRouter();
const store = usePresidentStore();
const graphChart = ref<HTMLElement | null>(null);
let chart: echarts.ECharts | null = null;

// Define relationships between presidents by their keys
const relationshipData = [
  { source: 'washington', target: 'adams_john', type: 'vp' },
  { source: 'washington', target: 'jefferson', type: 'cabinet' },
  { source: 'adams_john', target: 'jefferson', type: 'vp' },
  { source: 'adams_john', target: 'adams_jq', type: 'father' },
  { source: 'jefferson', target: 'madison', type: 'cabinet' },
  { source: 'madison', target: 'monroe', type: 'cabinet' },
  { source: 'monroe', target: 'adams_jq', type: 'cabinet' },
  { source: 'jackson', target: 'van_buren', type: 'vp' },
  { source: 'van_buren', target: 'jackson', type: 'cabinet' },
  { source: 'harrison_wh', target: 'tyler', type: 'vp' },
  { source: 'harrison_wh', target: 'harrison_b', type: 'grandfather' },
  { source: 'polk', target: 'jackson', type: 'general' }, // Mentorship/Ally
  { source: 'taylor', target: 'fillmore', type: 'vp' },
  { source: 'lincoln', target: 'johnson_a', type: 'vp' },
  { source: 'lincoln', target: 'grant', type: 'general' },
  { source: 'garfield', target: 'arthur', type: 'vp' },
  { source: 'cleveland', target: 'harrison_b', type: 'opponent' },
  { source: 'mckinley', target: 'teddy_roosevelt', type: 'vp' },
  { source: 'teddy_roosevelt', target: 'taft', type: 'cabinet' },
  { source: 'teddy_roosevelt', target: 'fdr', type: 'cousin' },
  { source: 'harding', target: 'coolidge', type: 'vp' },
  { source: 'fdr', target: 'truman', type: 'vp' },
  { source: 'jfk', target: 'lbj', type: 'vp' },
  { source: 'nixon', target: 'ford', type: 'vp' },
  { source: 'reagan', target: 'bush_hw', type: 'vp' },
  { source: 'bush_hw', target: 'bush_w', type: 'father' },
  { source: 'clinton', target: 'bush_hw', type: 'opponent' },
  { source: 'obama', target: 'biden', type: 'vp' },
  { source: 'trump', target: 'biden', type: 'opponent' },
  { source: 'trump', target: 'trump_2', type: 'successor' },
  // Additional relationships to increase connectivity
  { source: 'washington', target: 'madison', type: 'cabinet' }, // Unofficial advisor
  { source: 'adams_john', target: 'monroe', type: 'cabinet' }, // Diplomat under Washington/Adams
  { source: 'buchanan', target: 'lincoln', type: 'successor' },
  { source: 'pierce', target: 'buchanan', type: 'successor' },
  { source: 'fillmore', target: 'pierce', type: 'successor' },
  { source: 'hayes', target: 'garfield', type: 'successor' },
  { source: 'arthur', target: 'cleveland', type: 'successor' },
  { source: 'cleveland', target: 'mckinley', type: 'successor' },
  { source: 'taft', target: 'wilson', type: 'successor' },
  { source: 'wilson', target: 'harding', type: 'successor' },
  { source: 'coolidge', target: 'hoover', type: 'cabinet' }, // Hoover was Sec of Commerce
  { source: 'hoover', target: 'fdr', type: 'successor' },
  { source: 'truman', target: 'eisenhower', type: 'successor' },
  { source: 'eisenhower', target: 'jfk', type: 'successor' },
  { source: 'lbj', target: 'nixon', type: 'successor' },
  { source: 'ford', target: 'carter', type: 'successor' },
  { source: 'carter', target: 'reagan', type: 'opponent' },
  { source: 'clinton', target: 'bush_w', type: 'successor' },
  { source: 'bush_w', target: 'obama', type: 'successor' },
  { source: 'obama', target: 'trump', type: 'successor' }
];

const renderChart = () => {
  if (!chart) return;

  const presidents = store.presidents;
  
  // Create categories based on parties
  const parties = Array.from(new Set(presidents.map(p => p.party)));
  const categories = parties.map(party => ({ name: t(`parties.${party}`) }));

  // Create nodes
  const nodes = presidents.map(p => ({
    id: p.key,
    name: p.key, // Use key as the stable identifier for linking
    displayName: t(`presidents.${p.key}.name`), // Store translated name for display
    value: p.term,
    category: parties.indexOf(p.party),
    symbolSize: 40,
    // Store full data for tooltip
    president: p
  }));

  // Create links
  const links = relationshipData.map(r => {
    return {
      source: r.source, // Link using keys
      target: r.target,
      value: t(`mindmap.relationships.${r.type}`),
      lineStyle: {
        width: 2,
        curveness: 0.2
      }
    };
  }).filter(l => {
    // Ensure both source and target exist in nodes
    return nodes.some(n => n.name === l.source) && nodes.some(n => n.name === l.target);
  });

  const option = {
    animationDuration: 1500,
    animationDurationUpdate: 500, // Make transitions smoother
    animationEasingUpdate: 'cubicInOut', // Smoother easing
    title: {
      text: t('mindmap.title'),
      left: 'center',
      top: 20
    },
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove', // Only trigger on mousemove
      enterable: true, // Allow mouse to enter tooltip
      showDelay: 200, // Delay showing tooltip to reduce flashing
      hideDelay: 100, // Delay hiding tooltip
      confine: true,
      transitionDuration: 0.4, // Smooth tooltip movement
      formatter: (params: any) => {
        if (params.dataType === 'node') {
          const p = params.data.president;
          const name = params.data.displayName;
          return `
            <div style="text-align: left;">
              <strong>${name}</strong><br/>
              <span style="color: #666; font-size: 12px;">${t(`parties.${p.party}`)}</span><br/>
              <span style="font-size: 12px;">${p.term}</span>
            </div>
          `;
        } else if (params.dataType === 'edge') {
          // Find source and target display names
          const sourceNode = nodes.find(n => n.name === params.data.source);
          const targetNode = nodes.find(n => n.name === params.data.target);
          const sName = sourceNode ? sourceNode.displayName : params.data.source;
          const tName = targetNode ? targetNode.displayName : params.data.target;
          return `${sName} > ${tName}<br/><strong>${params.data.value}</strong>`;
        }
      }
    },
    legend: {
      data: categories.map(c => c.name),
      top: 50,
      type: 'scroll'
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        data: nodes,
        links: links,
        categories: categories,
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: (params: any) => {
            return params.data.displayName;
          },
          fontSize: 10
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          show: true,
          formatter: (params: any) => {
            return params.data.value;
          },
          fontSize: 10,
          color: '#666'
        },
        force: {
          repulsion: 1000,
          edgeLength: 200,
          gravity: 0.05
        },
        draggable: true,
        zoom: 0.7,
        lineStyle: {
          color: 'source',
          curveness: 0.3
        },
        emphasis: {
          focus: 'adjacency',
          blurScope: 'coordinateSystem',
          lineStyle: {
            width: 3 // Reduced from 4 for less aggressive highlight
          }
        },
        blur: {
          itemStyle: {
            opacity: 0.3 // Increased from 0.1 to reduce flashing contrast
          },
          lineStyle: {
            opacity: 0.2 // Increased from 0.1
          }
        }
      }
    ]
  };

  chart.setOption(option);
  
  // Click to navigate
  chart.off('click');
  chart.on('click', (params: any) => {
    if (params.dataType === 'node' && params.data.president) {
      router.push({ name: 'president-detail', params: { id: params.data.president.id } });
    }
  });
};

onMounted(() => {
  if (graphChart.value) {
    chart = echarts.init(graphChart.value);
    renderChart();
    window.addEventListener('resize', () => chart?.resize());
  }
});

watch(locale, () => {
  nextTick(() => {
    if (chart) {
      chart.dispose();
      chart = null;
    }
    if (graphChart.value) {
      chart = echarts.init(graphChart.value);
    }
    renderChart();
  });
});
</script>

<style scoped>
.graph-chart {
  width: 100%;
  height: 85vh;
  min-height: 600px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>