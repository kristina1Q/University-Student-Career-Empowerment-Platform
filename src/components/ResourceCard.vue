<script setup>
import { computed } from 'vue'

const props = defineProps({
  resource: { type: Object, required: true }
})

// 定义事件
const emit = defineEmits(['action'])

// 样式映射
const typeStyle = computed(() => {
  const map = {
    course: { bg: '#e0f2fe', text: '#0369a1', label: '课程' },
    internship: { bg: '#fef3c7', text: '#b45309', label: '实习' },
    lecture: { bg: '#dcfce7', text: '#15803d', label: '讲座' }
  }
  return map[props.resource.type] || { bg: '#f3f4f6', text: '#374151', label: '其他' }
})
</script>

<template>
  <div class="card">
    <div class="card-header">
      <span class="tag" :style="{ backgroundColor: typeStyle.bg, color: typeStyle.text }">
        {{ typeStyle.label }}
      </span>
      <span class="date">{{ resource.date }}</span>
    </div>
    
    <h3 class="title">{{ resource.title }}</h3>
    
    <div class="tags">
      <span v-for="tag in resource.tags" :key="tag">#{{ tag }}</span>
    </div>

    <div class="card-footer">
      <!-- 默认插槽，允许父组件自定义显示内容 -->
      <slot name="info">
        <span v-if="resource.company">🏢 {{ resource.company }}</span>
      </slot>
      
      <!-- 具名插槽：操作按钮 -->
      <div class="actions">
        <button class="btn-primary" @click="$emit('action', resource.id)">
          <slot name="btn-text">查看详情</slot>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
}
.card:hover { transform: translateY(-4px); box-shadow: 0 10px 15px rgba(0,0,0,0.1); }
.card-header { display: flex; justify-content: space-between; margin-bottom: 1rem; }
.tag { padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: bold; }
.date { color: #9ca3af; font-size: 0.875rem; }
.title { margin: 0 0 1rem 0; font-size: 1.1rem; font-weight: 600; }
.tags span { margin-right: 0.5rem; color: #6b7280; font-size: 0.85rem; background: #f3f4f6; padding: 2px 6px; border-radius: 4px; }
.card-footer { margin-top: auto; padding-top: 1rem; border-top: 1px solid #f3f4f6; display: flex; justify-content: space-between; align-items: center; }
.btn-primary { background: var(--primary-color); color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.875rem; }
.btn-primary:hover { background: #2563eb; }
</style>