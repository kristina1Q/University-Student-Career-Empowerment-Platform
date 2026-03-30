<script setup>
import { ref } from 'vue'
const emit = defineEmits(['register','cancel','back-to-login'])

const username = ref('')
const password = ref('')
const password2 = ref('')
const checkpassword = ref(false)
const tell = ref(false)

function submit() {
  // 基本校验
  if (password.value !== password2.value) {
    alert('两次输入的密码不一致')
    return
  }
  emit('register', { username: username.value, password: password.value })
}
function back() { emit('back-to-login') }
function cancel() { emit('cancel') }
function ckpassword(){
  checkpassword.value=true
  if(password.value===password2.value){
    tell.value=true
  }else{
    tell.value=false
  }
}

</script>

<template>
  <div>
    <h3>注册</h3>
    <div class="form-row float-row">
      <div class="float-box">
        <input v-model="username" placeholder=" " />
        <label class="float-label">用户名</label>
        <el-icon size="20px"><User /></el-icon>
      </div>
    </div>
    <div class="form-row float-row">
      <div class="float-box">
        <input type="password" v-model="password" placeholder=" " />
        <label class="float-label">密码</label>
        <el-icon size="20px"><Lock /></el-icon>
      </div>
    </div>
    <div class="form-row float-row">
      <div class="float-box">
        <input type="password" v-model="password2" placeholder=" " @blur="ckpassword"/>
        <label class="float-label">确认密码</label>
        <el-icon v-if="checkpassword&&tell"><Check /></el-icon>
        <el-icon v-else="checkpassword"><Close /></el-icon>
      </div>
    </div>
    <div class="actions" style="justify-content:space-between;">
      <div>
            <el-button type="primary" plain @click="back">返回</el-button>
      </div>
      <div>
        <el-button type="primary" plain @click="cancel">取消</el-button>
        <el-button type="danger" plain @click="submit">注册</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*图标位置 */
.el-icon {
  position: absolute;
  right: 16px;
  top: 64%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.form-row { display:flex; flex-direction:column; margin-top:10px; position:relative }
.form-row label { font-size:0.85rem; color:#374151; margin-bottom:6px }
.form-row input { padding:8px 10px; border: none; background:transparent }
.form-row input:focus { outline: none; box-shadow: none; border-top-color: transparent }

/* 底部渐变条 */
.form-row::after {
  content: '';
  position: absolute;
  left: 8px;
  bottom: -6px;
  height: 2px;
  width: 65px;
  border-radius: 4px;
  background: linear-gradient(90deg, #60a5fa, #52cbfe);
  transition: width 320ms ease;
}
.form-row:hover::after { width: calc(100% - 16px); }

.actions { display:flex; align-items:center; gap:8px; margin-top:35px }
/* 新盒子包装，不影响已有 input 样式，可独立控制高度 */
.float-box {position:relative; height:72px; display:block; }
.float-box input {font-size: 17px; position:absolute; left:0; bottom:8px; width:100%; padding:8px 10px; }
.float-box .float-label { position:absolute; left:15px; top:46px; transform:translateY(-50%); background:#fff; padding:0 4px; color:#6b7280; transition:all 180ms ease; pointer-events:none; }
/* 浮动标签，仅针对注册表单添加的行，不影响其他样式 */
.float-row { position: relative; }
.float-row label {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  margin-bottom: 0;
  pointer-events: none;
  transition: all 180ms ease;
  background: #fff;
  padding: 0 4px;
  color: #6b7280;
}
.float-row input { padding-top:16px; }
.float-row input:focus + label,
.float-row input:not(:placeholder-shown) + label {
  top: 6px;
  left: 8px;
  transform: none;
  font-size: 0.95rem;
  font-weight: 600;
}
</style>
