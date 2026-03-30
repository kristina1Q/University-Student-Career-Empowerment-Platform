<script setup>
import { ref } from 'vue'
import UserDashboard from '@/views/UserDashboard.vue'
import ResourceLibrary from '@/views/ResourceLibrary.vue'
import TopBar from '@/components/TopBar.vue'

// 简单的 Tab 路由模拟
const currentView = ref('dashboard')
</script>

<template>
  <div class="app-layout">
    <TopBar :currentView="currentView" @update:currentView="val => currentView = val" @user-logged-in="() => {}" />

    <main class="main-content">
      <Transition name="fade" mode="out-in">
        <UserDashboard v-if="currentView === 'dashboard'" />
        <ResourceLibrary v-else-if="currentView === 'resources'" />
      </Transition>
    </main>
  </div>
</template>

<style scoped>
.main-content { padding: 2rem; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>