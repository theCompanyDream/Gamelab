<template>
	<main class="min-h-screen p-6 md:p-12 max-w-3xl mx-auto">
	  <h1 class="text-4xl text-center font-bold mb-6 border-b pb-2">About GameLab</h1>

	  <p class="mb-6 leading-relaxed text-lg">
		This project was created to see how many games I can create with Vue and still keep the bundle size low and performance high.
		Initially, it was a small project running on a express server that sat in my repo for legit <strong>{{ yearsOld }}</strong> years.
		I'm not joking — I created this repository in <strong>{{ created.getFullYear() }}</strong> as part of a test for a company I briefly worked at.
		There it sat, dormant, untouched waiting for this exact moment.
	  </p>

	  <p class="mb-6 leading-relaxed text-lg">
		One day, I had a wild idea: What if I ported the app to Vite + Vue and finally added AI? Ironically, AI was something they asked me to do during the interview — and I couldn’t at the time. But with ChatGPT’s help, I made it happen.
		Even after hosting it on Vercel, it went dormant again... until I got inspired to see how many games I could pack into this little project.
		Thus, <strong>GameLab Inc.</strong> was born.
	  </p>

	  <p class="mb-6 leading-relaxed text-lg">
		I’m not entirely sure what this project will become, but it’s been a fun playground — especially watching how far AI has taken my ideas.
		Someday, I’d love to make it multiplayer too. So please stay tuned and check back from time to time... you never know what might pop up here.
	  </p>
	</main>
  </template>

  <script setup>

  const created = new Date('2015-06-13');
  const now = new Date();

  const yearsOld = now.getFullYear() - created.getFullYear();
  </script>
