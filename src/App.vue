<template>
  <article class="flex flex-col min-h-screen justify-between">
    <!-- Header -->
    <header class="bg-red-500 text-white px-4 py-3">
      <div class="flex flex-wrap items-center justify-between max-w-7xl mx-auto">
        <!-- Title -->
        <router-link
          to="/"
          class="text-2xl sm:text-3xl font-bold text-white hover:underline"
        >
          Game Lab
        </router-link>

        <!-- Mobile Menu Toggle -->
        <button
          @click="menuOpen = !menuOpen"
          class="sm:hidden text-white text-xl focus:outline-none"
        >
          ☰
        </button>

        <!-- Desktop Nav -->
        <nav
          class="sm:hidden visible lg:flex gap-4"
        >
          <router-link
            to="/about"
            class="hover:underline hover:text-blue-500 transition text-3xl font-bold"
          >
            About
          </router-link>
        </nav>

        <!-- Mobile Nav -->
        <div v-if="menuOpen" class="w-full mt-2 sm:hidden">
          <nav class="flex flex-col gap-2">
            <router-link
              to="/about"
              class="hover:underline hover:text-blue-500 transition"
              @click="menuOpen = false"
            >
              About
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <!-- Page Content -->
    <router-view class="flex-1" />

    <!-- Footer -->
    <footer class="bg-indigo-900 text-white p-4 text-center">
      &copy; 2024 GameLab. All rights reserved.
    </footer>
    <SpeedInsights />
    <Analytics />
  </article>
</template>

<script setup>
import { ref } from 'vue';
import { SpeedInsights } from '@vercel/speed-insights/vue';
import { Analytics } from '@vercel/analytics/vue'
const menuOpen = ref(false);
</script>
