<template>
  <div class="about">
    <p>当前登录用户名: {{$store.state.username}}</p>
  </div>
</template>


<script>
import { getUser } from "../api/user"

export default {
  name: "home",
  components: {},
  async mounted() {
    const res = await getUser()
    console.log(res)
  },
}
</script>