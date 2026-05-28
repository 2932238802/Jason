<script setup>
import { ref } from 'vue'
import { pingApi } from '../api/ping'

const loading = ref(false)

async function handlePing() {
  if (loading.value) {
    return
  }
  loading.value = true
  try {
    const data = await pingApi.ping()
    alert(`后端回复：${data.message ?? JSON.stringify(data)}`)
  } catch (error) {
    alert(`请求异常：${error.message}`)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="index-test-page">
    <section class="hero-card">
      <div class="badge">Jason Platform</div>

      <h1>前后端连接测试</h1>

      <p class="subtitle">
        点击下方按钮，向 Drogon 后端发送一次请求。
      </p>

      <button class="ping-button" :disabled="loading" @click="handlePing">
        <span v-if="!loading">Ping Backend</span>
        <span v-else>请求中...</span>
      </button>
    </section>
  </main>
</template>

<style scoped>
.index-test-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background:
    radial-gradient(circle at top left, rgba(96, 165, 250, 0.32), transparent 34%),
    radial-gradient(circle at bottom right, rgba(168, 85, 247, 0.32), transparent 34%),
    linear-gradient(135deg, #0f172a 0%, #111827 45%, #020617 100%);
  color: #f8fafc;
  overflow: hidden;
}

.hero-card {
  position: relative;
  width: min(720px, 100%);
  padding: 56px 48px;
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 32px;
  text-align: center;
  background: rgba(15, 23, 42, 0.72);
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.42),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  animation: card-float 5s ease-in-out infinite;
}

.hero-card::before {
  content: '';
  position: absolute;
  inset: -2px;
  z-index: -1;
  border-radius: 34px;
  background: linear-gradient(135deg, #38bdf8, #8b5cf6, #ec4899);
  opacity: 0.38;
  filter: blur(18px);
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  padding: 8px 16px;
  border: 1px solid rgba(125, 211, 252, 0.38);
  border-radius: 999px;
  color: #7dd3fc;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba(14, 165, 233, 0.12);
}

h1 {
  margin: 0;
  font-size: clamp(36px, 6vw, 64px);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.05em;
}

.subtitle {
  margin: 24px auto 36px;
  max-width: 520px;
  color: #cbd5e1;
  font-size: 18px;
  line-height: 1.8;
}

.ping-button {
  position: relative;
  min-width: 220px;
  height: 64px;
  border: none;
  border-radius: 999px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  background: linear-gradient(135deg, #2563eb, #7c3aed, #db2777);
  box-shadow:
    0 18px 42px rgba(124, 58, 237, 0.38),
    0 0 0 1px rgba(255, 255, 255, 0.12) inset;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    filter 0.22s ease;
  overflow: hidden;
}

.ping-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: -80%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.36),
    transparent
  );
  transform: skewX(-20deg);
  transition: left 0.6s ease;
}

.ping-button:hover {
  transform: translateY(-4px) scale(1.02);
  filter: brightness(1.08);
  box-shadow:
    0 24px 58px rgba(124, 58, 237, 0.48),
    0 0 0 1px rgba(255, 255, 255, 0.18) inset;
}

.ping-button:hover::after {
  left: 120%;
}

.ping-button:active {
  transform: translateY(-1px) scale(0.99);
}

.ping-button:disabled {
  cursor: wait;
  opacity: 0.76;
  transform: none;
}

@keyframes card-float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}
</style>
