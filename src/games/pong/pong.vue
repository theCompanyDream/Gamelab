<template>
	<div class="min-h-screen bg-gray-900 text-white flex flex-col">
	  <!-- Score at the top -->
	  <header class="p-4 text-center">
		<h2 class="text-2xl font-bold">Pong Score: {{ score }}</h2>
	  </header>

	  <!-- Center canvas in available space -->
	  <main class="flex-1 flex justify-center items-center">
		<canvas
		  ref="canvas"
		  width="420"
		  height="340"
		  class="border border-white"
		/>
	  </main>
	</div>
  </template>

  <script setup>
  import { onMounted, ref } from 'vue';
  import { initGame } from './gameLogic.js';

  const canvas = ref(null);
  const score = ref(0);

  onMounted(() => {
	if (canvas.value) {
	  initGame(canvas.value, score);
	}
  });
  </script>
