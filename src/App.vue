<template>
  <article class="flex flex-col min-h-screen justify-between">
    <header class="bg-blue-600 text-white p-4">
      <div class="flex items-center justify-between">
        <!-- Left side: Title -->
        <router-link to="/" class="text-3xl font-bold text-white">GameLab</router-link>

        <!-- Right side: Navigation -->
        <nav class="flex gap-4">
          <router-link
            to="/rock"
            class="text-white hover:underline hover:text-gray-200 transition"
          >
            Rock Paper Scissors
          </router-link>
          <!-- Add more links here if needed -->
        </nav>
      </div>
    </header>

    <router-view />

    <footer class="bg-gray-800 text-white p-4 text-center">
      &copy; 2024 GameLab. All rights reserved.
    </footer>
  </article>
</template>

<script>
export default {
  name: "App"
};
</script>

<style scoped>
@import './assets/main.css';
</style>
