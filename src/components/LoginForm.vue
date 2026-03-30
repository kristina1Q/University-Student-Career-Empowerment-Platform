<script setup>
import { ref } from 'vue'
import { View, Hide } from '@element-plus/icons-vue'
const emit = defineEmits(['login','cancel','switch-to-register'])

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const togglePassword = () => { showPassword.value = !showPassword.value }

function submit() {
  emit('login', { username: username.value, password: password.value })
}
function cancel() { emit('cancel') }
function goRegister() { emit('switch-to-register') }
</script>

<template>
  <div>
    <h2>🎓 职业规划平台</h2>
    <div style="margin:6px 0 8px 0; text-align:left;">
      <button class="link-btn" @click="goRegister" >尚未注册？点击注册→</button>
    </div>
    <div class="form-row float-row">
      <div class="float-box">
        <input v-model="username" placeholder=" " />
        <label class="float-label">用户名</label>
        <el-icon size="20px"><User /></el-icon>
      </div>
    </div>
    <div class="form-row float-row">
      <div class="float-box">
        <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder=" " />
        <label class="float-label">密码</label>
        <el-icon size="20px"><Lock /></el-icon>
      </div>
    </div>
    <div class="actions">
      <el-button type="primary" plain @click="cancel">取消</el-button>
      <el-button type="danger" plain @click="submit">登录</el-button>
    </div>
  </div>
</template>

<style scoped>
/*图标位置 */
.form-row .el-icon {
  position: absolute;
  right: 16px;
  top: 65%;
  transform: translateY(-50%);
  color: #9ca3af;
}
/* 使用与 LoginModal 中相同的局部类名以保持样式一致 */
.form-row { display:flex; flex-direction:column; margin-top:10px; position:relative }
.form-row label { font-size:0.85rem; color:#374151; margin-bottom:6px }
.form-row input { padding:8px 10px; border: none; background:transparent }
.form-row input:focus { outline: none; box-shadow: none; border-top-color: transparent }

/* 底部渐变条 */
.form-row::after {
  content: '';
  position: absolute;
  left: 8px;
  bottom: 6px;
  height: 2px;
  width: 65px; /* 初始短条 */
  border-radius: 4px;
  background: linear-gradient(90deg, #60a5fa, #52cbfe);
  transition: width 320ms ease;
}
/* hover 时展开为整行减去左右留白 */
.form-row:hover::after {
  width: calc(100% - 16px);
}
.actions { display:flex; justify-content:flex-end; gap:8px; margin-top:40px }
.btn-primary { background: var(--primary-color); color: #fff; border: none; padding:8px 14px; border-radius:6px }
.link-btn { background: transparent; border: none; color: var(--primary-color); cursor: pointer; padding:0; font-size:0.90rem }
/* 浮动标签，仅作用于添加了 float-row 的行，避免改动原有基础样式 */
.float-row { position: relative; }
.lock-icon { position:absolute; right:10px; top:60%; transform:translateY(-50%); }
.float-row label {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  margin-bottom: 0; /* 覆盖原有 margin-bottom 但仅限浮动标签 */
  pointer-events: none;
  transition: all 180ms ease;
  background: #fff;
  padding: 0 4px;
  color: #6b7280;
}
.float-row input {
  /* 为浮动标签预留上方空间，不影响其他输入框 */
  padding-top: 16px;
}
/* 新盒子包装，不影响已有 input 样式，可独立控制高度 */
.float-box { position:relative; height:72px; display:block; }
.float-box input { position:absolute; left:0; bottom:8px; width:100%; padding:8px 10px;font-size: 17px; }
.float-box .float-label { position:absolute; left:15px; top:46px; transform:translateY(-50%); background:#fff; padding:0 4px; color:#6b7280; transition:all 180ms ease; pointer-events:none; }
.float-box input:focus + .float-label,
.float-box input:not(:placeholder-shown) + .float-label { top:6px; left:8px; transform:none; font-size:0.95rem; font-weight:600; }
</style>
