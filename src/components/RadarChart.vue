<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: { type: Array, required: true },
  indicators: { type: Array, default: () => [
    { name: '专业技能', max: 100 },
    { name: '沟通能力', max: 100 },
    { name: '团队协作', max: 100 },
    { name: '创新能力', max: 100 },
    { name: '领导力', max: 100 }
  ]}
})

const chartRef = ref(null)
let chartInstance = null

const initChart = () => {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)
  render()
}

const render = () => {
  const option = {
    tooltip: {},
    radar: {
      indicator: props.indicators,
      radius: '65%',
      splitArea: { areaStyle: { color: ['#f8f9fa', '#fff'] } }
    },
    series: [{
      name: '能力模型',
      type: 'radar',
      data: [{
        value: props.data,
        name: '当前能力值',
        areaStyle: { color: 'rgba(59, 130, 246, 0.2)' },
        lineStyle: { color: '#3b82f6' },
        itemStyle: { color: '#3b82f6' }
      }]
    }]
  }
  chartInstance.setOption(option)
}

// 监听数据变化，动态刷新图表 (核心需求：动态调整)
watch(() => props.data, () => {
  render()
}, { deep: true })

onMounted(() => {
  initChart()
  window.addEventListener('resize', () => chartInstance?.resize())
})

onUnmounted(() => {
  window.removeEventListener('resize', () => chartInstance?.resize())
  chartInstance?.dispose()
})
</script>

<template>
  <div class="chart-container" ref="chartRef"></div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px;
}
</style>