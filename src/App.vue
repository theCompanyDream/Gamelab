<template>
  <section class="flex flex-col min-h-screen ">
    <header class="bg-blue-600 text-white p-4 bg-gray-100">
      <h1 class="text-3xl font-bold text-center">GameLab</h1>
    </header>
    <router-view />
    <footer class="bg-gray-800 text-white p-4 text-center">
              &copy; 2024 GameLab. All rights reserved.
    </footer>
  </section>
</template>

<script>

export default {
    components: {
        name: "App"
    },
};
</script>

<style scoped>
/* @import './assets/main.css'; */
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