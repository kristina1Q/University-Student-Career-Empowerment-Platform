import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 用户基本信息
  const userInfo = ref({
    name: '张同学',
    major: '软件工程',
    grade: '大三',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
  })

  // 职业目标
  const careerGoal = ref('前端工程师')

  // 能力评估数据 (用于雷达图)
  // 维度：专业技能, 沟通能力, 团队协作, 创新能力, 领导力
  const abilityScores = ref([80, 65, 90, 70, 60])

  // 模拟：完成一个项目后，能力提升
  const improveAbility = () => {
    abilityScores.value = abilityScores.value.map(score => Math.min(100, score + Math.floor(Math.random() * 5)))
  }
  return { userInfo, careerGoal, abilityScores, improveAbility }
})