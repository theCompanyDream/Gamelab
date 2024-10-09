<template>
  <article class="flex flex-col min-h-screen justify-between">
    <header class="bg-blue-600 text-white p-4 bg-gray-100">
      <h1 class="text-3xl font-bold text-center text-black">GameLab</h1>
    </header>
    <router-view />
    <footer class="bg-gray-800 text-white p-4 text-center">
              &copy; 2024 GameLab. All rights reserved.
    </footer>
  </article>
</template>

<script>
  export default {
      components: {
          name: "App"
      },
  };
</script>

<style scoped>
  @import './assets/main.css';
</style>