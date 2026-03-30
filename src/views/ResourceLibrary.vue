<script setup>
import { onMounted } from 'vue'
import { useResource } from '@/composables/useResource'
import ResourceCard from '@/components/ResourceCard.vue'

// 使用 Composable (逻辑复用)
const { loading, filterType, filteredResources, fetchResources } = useResource()

onMounted(() => {
  fetchResources()
})

const handleAction = (id) => {
  alert(`正在为您跳转资源 ID: ${id} 的详情页...`)
}
</script>

<template>
  <div class="library-container">
    <div class="header">
      <h2>📚 校园资源整合库</h2>
      <div class="filters">
        <button :class="{ active: filterType === 'all' }" @click="filterType = 'all'">全部</button>
        <button :class="{ active: filterType === 'course' }" @click="filterType = 'course'">课程</button>
        <button :class="{ active: filterType === 'internship' }" @click="filterType = 'internship'">实习机会</button>
        <button :class="{ active: filterType === 'lecture' }" @click="filterType = 'lecture'">讲座</button>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div> 资源加载中...
    </div>

    <div v-else class="resource-grid">
      <ResourceCard 
        v-for="item in filteredResources" 
        :key="item.id" 
        :resource="item"
        @action="handleAction"
      >
        <!-- 利用插槽自定义不同类型资源的按钮文本 -->
        <template #btn-text>
          {{ item.type === 'internship' ? '立即投递' : '查看详情' }}
        </template>
      </ResourceCard>
    </div>
    
    <div v-if="!loading && filteredResources.length === 0" class="empty">
      暂无相关资源
    </div>
  </div>
</template>

<style scoped>
.library-container { max-width: 1000px; margin: 0 auto; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px; }
.filters button { background: white; border: 1px solid #e5e7eb; padding: 6px 16px; border-radius: 20px; margin-left: 10px; font-size: 0.9rem; }
.filters button.active { background: var(--primary-color); color: white; border-color: var(--primary-color); }

.resource-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.loading, .empty { text-align: center; padding: 40px; color: #6b7280; }
.spinner { display: inline-block; width: 20px; height: 20px; border: 3px solid #e5e7eb; border-top-color: var(--primary-color); border-radius: 50%; animation: spin 1s linear infinite; margin-right: 10px; vertical-align: middle; }
@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 600px) {
  .header { flex-direction: column; align-items: flex-start; }
  .filters button { margin: 5px 5px 0 0; }
}
</style>