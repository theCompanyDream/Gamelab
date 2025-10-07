<template>
	<main class="min-h-screen bg-gray-900 text-white flex flex-col">
	  <!-- Score at the top -->
	  <header class="p-4 text-center">
		<h2 class="text-2xl font-bold">Pong Score: {{ score }}</h2>
	  </header>

	  <!-- Center canvas in available space -->
	  <section class="flex-1 flex justify-center items-center">
		<canvas
		  ref="canvas"
		  width="420"
		  height="340"
		  class="border border-white"
		/>
	  </section>
	</main>
  </template>

  <script setup>
  import { onMounted, ref } from 'vue';
  import { initGame } from './gameLogic.js';

  const canvas = ref(null);
  const score = ref(0);

  // Touch move: follow finger (mobile)


  onMounted(() => {
	if (canvas.value) {
	  initGame(canvas.value, score);
	}

	const ctx = canvas.value.getContext('2d');
	const canvasEl = canvas.value;

	canvasEl.addEventListener("touchmove", (e) => {
		const rect = canvasEl.getBoundingClientRect();
		const touch = e.touches[0];

		// Convert screen touch X to canvasEl X
		const touchX = touch.clientX - rect.left;

		// Center paddle on touch point
		paddleX = touchX - paddleWidth / 2;

		// Clamp to canvasEl boundaries
		if (paddleX < 0) paddleX = 0;
		if (paddleX > width - paddleWidth) paddleX = width - paddleWidth;

		// Prevent scrolling on mobile
		e.preventDefault();
	}, { passive: false });
  });
  </script>
