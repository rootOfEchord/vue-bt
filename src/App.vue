<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
@import './assets/less/common.less';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}

.el-message {
  min-width: 200px;
  text-align: center;
}

.ctt {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
