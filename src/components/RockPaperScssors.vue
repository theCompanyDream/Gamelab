<template>
	<main class="p-4 rounded-md bg-gray-100 shadow-md max-w-md mx-auto text-center">
	  <h2 class="text-xl font-bold mb-4">Rock Paper Scissors</h2>

	  <div class="flex justify-center gap-4 mb-9">
		<button
		class="sprite-btn sprite-rock"
		@click="play('rock')"
		title="Rock"
		></button>

		<button
		class="sprite-btn sprite-paper"
		@click="play('paper')"
		title="Paper"
		></button>

		<button
		class="sprite-btn sprite-scissors"
		@click="play('scissors')"
		title="Scissors"
		></button>
	  </div>

	  <div v-if="playerChoice" class="mb-2">
		You chose: <strong>{{ playerChoice }}</strong><br />
		Bot chose: <strong>{{ botChoice }}</strong>
	  </div>

	  <p v-if="result" class="text-lg font-semibold mt-2">{{ result }}</p>

	  <div class="mt-4 text-sm">
		<p>Score - You: {{ score.player }} | Bot: {{ score.bot }}</p>
	  </div>
	</main>
  </template>

  <script setup>
	import { useRPSGame } from '../composables/useRPSGame.js';

	const {
		choices,
		playerChoice,
		botChoice,
		result,
		score,
		play,
	} = useRPSGame();
  </script>

  <style scoped>
	.sprite-btn {
		width: 128px;
		height: 198px;
		background-image: url('/rps-sprite.webp');
		background-repeat: no-repeat;
		border: none;
		cursor: pointer;
		background-size: 369px 280px; /* total size of sprite */
	}

	.sprite-rock {
	background-position: 0 0;
	}

	.sprite-paper {
	background-position: -128px 0;
	}

	.sprite-scissors {
	background-position: -256px 0;
	}

  </style>
