<script>
	import { onMount } from 'svelte';
	import '../app.css';
	
	// Register service worker for PWA
	onMount(() => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/service-worker.js')
				.then(registration => {
					console.log('ServiceWorker registered:', registration);
				})
				.catch(error => {
					console.log('ServiceWorker registration failed:', error);
				});
		}
	});
</script>

<svelte:head>
	<title>Ludopoiesis - Oráculo Para Jugar la Vida</title>
	<meta name="description" content="Un oráculo interactivo para jugar con la vida" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
	<meta name="theme-color" content="#004D4D" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<link rel="manifest" href="/manifest.json" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
	<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="app">
	<slot />
</div>
