<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import RadarChart from '@/components/RadarChart.vue'

const store = useUserStore()
// storeToRefs 保持响应性
const { userInfo, careerGoal, abilityScores } = storeToRefs(store)
const { improveAbility } = store

</script>

<template>
  <div class="dashboard-container">
    <div class="welcome-section">
      <div class="avatar">
        <img :src="userInfo.avatar" alt="avatar" />
      </div>
      <div class="info">
        <h2>你好，{{ userInfo.name }} 👋</h2>
        <p>当前目标：<span class="highlight">{{ careerGoal }}</span></p>
        <div class="meta">
          <span>{{ userInfo.grade }}</span>
          <span>{{ userInfo.major }}</span>
        </div>
      </div>
    </div>

    <div class="analysis-section">
      <div class="card chart-card">
        <h3>📊 个人能力雷达图 (自我认知)</h3>
        <RadarChart :data="abilityScores" />
        <div class="controls">
          <p class="hint">点击下方按钮模拟完成课程后的能力动态变化：</p>
          <button @click="improveAbility">模拟：完成项目实践 (能力+)</button>
        </div>
      </div>

      <div class="card goal-card">
        <h3>🎯 阶段目标跟踪</h3>
        <ul class="timeline">
          <li class="done">✅ 完成 MBTI 职业测评</li>
          <li class="done">✅ 确定职业方向：前端开发</li>
          <li class="active">🔄 进行中：学习 Vue3 基础课程 (60%)</li>
          <li class="todo">📅 待开始：寻找暑期实习</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container { max-width: 1000px; margin: 0 auto; }
.welcome-section { display: flex; align-items: center; gap: 2rem; margin-bottom: 2rem; background: white; padding: 2rem; border-radius: 16px; }
.avatar img { width: 80px; height: 80px; border-radius: 50%; border: 3px solid #e5e7eb; }
.highlight { color: #3b82f6; font-weight: bold; background: #eff6ff; padding: 2px 8px; border-radius: 4px; }
.meta span { margin-right: 1rem; color: #6b7280; background: #f3f4f6; padding: 4px 10px; border-radius: 20px; font-size: 0.9rem; }

.analysis-section { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
.controls { text-align: center; margin-top: 10px; }
.controls button { background: #10b981; color: white; border: none; padding: 8px 16px; border-radius: 6px; }
.controls button:hover { background: #059669; }
.hint { font-size: 0.8rem; color: #6b7280; margin-bottom: 5px; }

.timeline { list-style: none; padding: 0; }
.timeline li { padding: 10px 0; border-bottom: 1px solid #eee; }
.timeline .done { color: #9ca3af; text-decoration: line-through; }
.timeline .active { color: #3b82f6; font-weight: bold; }
.timeline .todo { color: #374151; }

@media (max-width: 768px) {
  .analysis-section { grid-template-columns: 1fr; }
}
</style>