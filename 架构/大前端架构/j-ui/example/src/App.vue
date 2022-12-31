<template>
  <div class="test">
    <j-header>
      头部
    </j-header>
    <j-container>
      <j-aside>
        菜单
      </j-aside>
      <j-main>
        <j-button type="info" size="small">j-button自定义按钮</j-button>
      </j-main>
    </j-container>
  </div>
</template>

<script></script>

<style lang="scss">
html, body, #app, .test {
  height: 100%;
}

body {
  margin: 0;
}

.test {
  display: flex;
  flex-direction: column;
}

.j-header {
  background-color: #3A8EE6;
}

.j-aside {
  background-color: #5DAD34;
}

.j-main {
  background-color: #82848A;
}
</style>