<template>
  <div class="about">
    <h1>登录</h1>
    <Input v-model="username" placeholder="请输入用户名"></Input>
    <Button type="primary" @click="login">登录</Button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: ""
    }
  },
  methods: {
    login() {
      this.$store.dispatch("toLogin", this.username)
    }
  },
}
</script>
