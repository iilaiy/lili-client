<template>
  <div>首页</div>
  <div>
    <router-link to="/login">跳转登录</router-link>
    <div>{{ mainStore.name }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/store/main'

const mainStore = useMainStore()
</script>

<style scoped></style>
