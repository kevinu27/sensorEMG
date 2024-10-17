<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'
import Bluetooth from './components/Bluetooth.vue'
import Chart from './components/Chart.vue';
</script>

<template>
  <div class="app">
    <Header  />
    <Bluetooth  />
    <Chart  />
  </div>
</template>

<style scoped>
.app{
  width: 100%;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
