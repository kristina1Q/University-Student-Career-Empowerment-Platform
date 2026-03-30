import { ref, computed } from 'vue'

// 模拟后端数据
const MOCK_RESOURCES = [
  { id: 1, title: 'Vue3 高级组件封装实战', type: 'course', tags: ['前端', 'Vue'], date: '2023-10-15' },
  { id: 2, title: '字节跳动 2024 秋招内推', type: 'internship', tags: ['大厂', '实习'], date: '2023-11-01', company: '字节跳动' },
  { id: 3, title: '如何规划大学四年？', type: 'lecture', tags: ['职业规划', '校友分享'], date: '2023-09-20' },
  { id: 4, title: 'React 核心原理深度解析', type: 'course', tags: ['前端', 'React'], date: '2023-12-10' },
  { id: 5, title: '美团后端开发实习生', type: 'internship', tags: ['后端', 'Java'], date: '2023-10-22', company: '美团' },
]

export function useResource() {
  const resources = ref([])
  const loading = ref(false)
  const filterType = ref('all') // all, course, internship, lecture

  // 模拟异步获取数据
  const fetchResources = async () => {
    loading.value = true
    setTimeout(() => {
      resources.value = MOCK_RESOURCES
      loading.value = false
    }, 600)
  }

  // 计算属性：处理筛选逻辑
  const filteredResources = computed(() => {
    if (filterType.value === 'all') return resources.value
    return resources.value.filter(item => item.type === filterType.value)
  })

  return {
    resources,
    loading,
    filterType,
    filteredResources,
    fetchResources
  }
}