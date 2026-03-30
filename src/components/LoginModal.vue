<script setup>
import { ref, watch } from 'vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'

const props = defineProps({ modelValue: { type: Boolean, default: false } })
const emit = defineEmits(['update:modelValue', 'login', 'register'])

const show = ref(props.modelValue)
const mode = ref('login') // 'login' | 'register'

watch(() => props.modelValue, v => { show.value = v; if (v) mode.value = 'login' })

function close() {
  show.value = false
  emit('update:modelValue', false)
}

function onLogin(payload) {
  emit('login', payload)
  close()
}

function onRegister(payload) {
  // 这里仅发出事件，调用者可决定是否自动关闭
  emit('register', payload)
  close()
}

function switchToRegister() { mode.value = 'register' }
function backToLogin() { mode.value = 'login' }
</script>

<template>
  <transition name="modal-fade">
    <div v-if="show" class="modal-overlay" @click.self="close">
      <div class="modal-card">
        <button class="close-btn" @click="close">x</button>
        <transition name="form-switch" mode="out-in">
          <component
            :is="mode === 'login' ? LoginForm : RegisterForm"
            key="modal-form-{{ mode }}"
            @login="onLogin"
            @cancel="close"
            @switch-to-register="switchToRegister"
            @register="onRegister"
            @back-to-login="backToLogin"
          />
        </transition>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;
}
.modal-card {
  width: 360px;
  background: #fff;
  border-radius: 12px;
  padding: 1.25rem 1.25rem 1.5rem;
  position: relative;
  box-shadow: 0 10px 30px rgba(2,6,23,0.2);
  transform-origin: center center;
}
.close-btn {
  color: #999999;
  position: absolute;
  right: 10px;
  top: 8px;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 2s all;
}
.close-btn:hover {
  transform: rotate(360deg);
  scale: 1.2;
  color: #374151;
}
.form-row { display:flex; flex-direction:column; margin-top:10px }
.form-row label { font-size:0.85rem; color:#374151; margin-bottom:6px }
.form-row input { padding:8px 10px; border-radius:6px; border:1px solid #e5e7eb }
.actions { display:flex; justify-content:flex-end; gap:8px; margin-top:14px }
.modal-fade-enter-active, .modal-fade-leave-active { transition: all 220ms ease; }
.modal-fade-enter-from { opacity: 0; transform: translateY(-8px) scale(0.98); }
.modal-fade-enter-to { opacity: 1; transform: translateY(0) scale(1); }
.modal-fade-leave-from { opacity: 1; transform: translateY(0) scale(1); }
.modal-fade-leave-to { opacity: 0; transform: translateY(-8px) scale(0.98); }

/* 短过渡：登录/注册表单切换 */
.form-switch-enter-active, .form-switch-leave-active { transition: opacity 200ms ease, transform 200ms ease; }
.form-switch-enter-from { opacity: 0; transform: translateY(6px); }
.form-switch-enter-to { opacity: 1; transform: translateY(0); }
.form-switch-leave-from { opacity: 1; transform: translateY(0); }
.form-switch-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
