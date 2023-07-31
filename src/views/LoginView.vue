<template>
  <div class="login" @click="signIn">登录</div>
</template>

<script lang="ts" setup>
// import loginApi from '@/service/api/login'

const signIn = async () => {
  // const loginResult = await loginApi.login({
  //   mail: '3469854373@qq.com',
  //   password: '123456',
  // })
  // console.log(loginResult)
}
</script>

<style scoped>
.login {
  font-size: 16px;
}
</style>
