<template>
	<section class="min-h-screen bg-gray-900 text-white p-6">
	  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
		<router-link
		  v-for="game in games"
		  :key="game.slug"
		  :to="`/play/${game.slug}`"
		  class="group relative block rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 bg-gray-800"
		>
		  <img
		  	v-if="game.image != undefined"
			:src="game.image"
			:alt="game.name"
			class="w-full h-48 object-cover opacity-90 group-hover:opacity-100 transition"
		  />
		  <div v-else class="w-full h-60 flex items-center justify-center text-6xl">
			{{ game.emoji }}
		  </div>
		  <div class="p-4">
			<h2 class="text-xl font-semibold">{{ game.name }}</h2>
		  </div>
		  <div
			class="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition p-4 flex items-center justify-center text-sm text-center"
		  >
			<p>{{ game.description }}</p>
		  </div>
		</router-link>
	  </div>
	</section>
  </template>

  <script setup>
  import { games } from '@/data/games'; // adjust path as needed
  </script>
