<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import Card from '$lib/components/Card.svelte';
	import CardModal from '$lib/components/CardModal.svelte';
	import LensSelector from '$lib/components/LensSelector.svelte';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import { 
		idioma, 
		lentesActivos, 
		cartasLanzadas, 
		cartasData, 
		currentView,
		loadCards,
		drawCard,
		resetCards
	} from '$lib/stores/cardStore.js';
	
	let textos = {};
	let showIntro = true;
	let introExpanded = false;
	let enlargedCard = null;
	let mobileCardShown = false;
	
	onMount(async () => {
		await loadCards();
		await loadTextos();
	});
	
	async function loadTextos() {
		try {
			const response = await fetch('/textos.json');
			textos = await response.json();
		} catch (error) {
			console.error('Error loading texts:', error);
		}
	}
	
	function handleDrawCard() {
		const carta = drawCard($cartasData, $lentesActivos, $idioma);
		
		if (!carta) {
			alert($idioma === 'es' 
				? 'No hay lentes activados. Por favor, activa al menos uno.'
				: 'Nenhuma lente ativada. Por favor, ative pelo menos uma.');
			return;
		}
		
		showIntro = false;
		cartasLanzadas.set([carta]);
		currentView.set('cards');
		mobileCardShown = true;
	}
	
	function handleReset() {
		resetCards();
		showIntro = true;
		introExpanded = false;
		mobileCardShown = false;
	}
	
	function showIntroText() {
		showIntro = true;
		introExpanded = false;
		currentView.set('intro');
		cartasLanzadas.set([]);
	}
	
	function mostrarPregunta() {
		showIntro = true;
		currentView.set('pregunta');
		cartasLanzadas.set([]);
	}
	
	function mostrarLentes() {
		showIntro = true;
		currentView.set('lentes');
		cartasLanzadas.set([]);
	}
	
	function handleEnlargeCard(card) {
		enlargedCard = card;
	}
	
	function closeModal() {
		enlargedCard = null;
	}
	
	$: introText = textos.intro?.[introExpanded ? 'long' : 'short']?.[$idioma] || '';
	$: preguntaText = textos.pregunta?.[$idioma] || '';
	$: lentesText = textos.lentes?.[$idioma] || '';
</script>

<div class="page-container" class:mobile-card-shown={mobileCardShown}>
	<!-- Header -->
	<header class="header">
		<h1 on:click={showIntroText}>
			<span class="title-main">Ludopoiesis</span>
			<span class="title-sub">Oráculo para jugar la vida</span>
		</h1>
	</header>

	<!-- Main content area -->
	<main class="main-content">
		<!-- Intro/Text Section -->
		{#if showIntro && $currentView !== 'cards'}
			<div class="intro-section" transition:fade={{ duration: 300 }}>
				{#if $currentView === 'intro'}
					<div class="intro-text">
						{@html introText}
						{#if !introExpanded}
							<button class="more-button" on:click={() => introExpanded = true}>
								➔ Conocer más sobre Ludopoiesis
							</button>
						{:else}
							<button class="less-button" on:click={() => introExpanded = false}>
								◁ Ver menos
							</button>
						{/if}
					</div>
					
					<!-- Spread selector -->
					<div class="spread-selector">
						<h2>Elige tu tipo de lectura</h2>
						<div class="spread-options">
							<button class="spread-option" on:click={handleDrawCard}>
								<i class="fa fa-square"></i>
								<h3>Carta Única</h3>
								<p>Una respuesta directa y clara</p>
							</button>
							
							<a href="/three-card" class="spread-option">
								<i class="fa fa-layer-group"></i>
								<h3>3 Cartas</h3>
								<p>Pasado, Presente y Futuro</p>
							</a>
						</div>
					</div>
				{:else if $currentView === 'pregunta'}
					<div class="intro-text">
						{@html preguntaText}
						<button class="back-button" on:click={showIntroText}>
							◁ Volver al inicio
						</button>
					</div>
				{:else if $currentView === 'lentes'}
					<div class="intro-text">
						{@html lentesText}
						<button class="back-button" on:click={showIntroText}>
							◁ Volver al inicio
						</button>
					</div>
				{/if}
			</div>
		{/if}

		<!-- Cards Display -->
		{#if $cartasLanzadas.length > 0}
			<div class="cards-container" transition:fly={{ y: 50, duration: 400 }}>
				{#each $cartasLanzadas as carta, i (carta.id + i)}
					<div transition:fly={{ x: -50, delay: i * 100, duration: 400 }}>
						<Card 
							card={carta} 
							scale={Math.max(0.85, 1 - i * 0.05)}
							rotation={(Math.random() * 6 - 3)}
							onEnlarge={handleEnlargeCard}
						/>
					</div>
				{/each}

				<!-- Mobile floating actions (only visible on mobile when card is shown) -->
				<div class="mobile-card-actions">
					<button class="btn btn-primary" on:click={handleDrawCard}>
						<i class="fa fa-sparkles"></i>
						{$idioma === 'es' ? 'Nueva Carta' : 'Nova Carta'}
					</button>
					<a href="/three-card" class="btn btn-secondary">
						<i class="fa fa-layer-group"></i>
						{$idioma === 'es' ? '3 Cartas' : '3 Cartas'}
					</a>
				</div>
			</div>
		{/if}
	</main>

	<!-- Card Modal for enlarged view -->
	<CardModal card={enlargedCard} onClose={closeModal} />

	<!-- Control Panel (sidebar on desktop, bottom on mobile) -->
	<aside class="control-panel">
		<div class="control-inner">
			<!-- Instructions -->
			<div class="instructions">
				<div class="step">
					<h3>
						1. Haz una pregunta
						<button class="info-icon" on:click={mostrarPregunta} title="¿Cómo hacer una buena pregunta?">
							<i class="fa fa-info-circle"></i>
						</button>
					</h3>
				</div>

				<div class="step">
					<h3>
						2. Escoge tus lentes
						<button class="info-icon" on:click={mostrarLentes} title="Ver más sobre los lentes">
							<i class="fa fa-info-circle"></i>
						</button>
					</h3>
				</div>

				<!-- Lens Selector -->
				<div class="lens-section">
					<LensSelector />
				</div>

				<div class="step">
					<h3>3. Tira una carta</h3>
				</div>

				<!-- Action Buttons -->
				<div class="action-buttons">
					<button class="btn btn-primary" on:click={handleDrawCard}>
						<i class="fa fa-sparkles"></i>
						Sacar Carta
					</button>
					<button class="btn btn-secondary" on:click={handleReset}>
						<i class="fa fa-rotate-right"></i>
						Nuevo
					</button>
				</div>

				<!-- Language Switcher -->
				<div class="language-section">
					<LanguageSwitcher />
				</div>
			</div>
		</div>
	</aside>
</div>

<style>
	.page-container {
		min-height: 100vh;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr auto;
		gap: 0;
	}
	
	/* Header */
	.header {
		background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
		color: white;
		padding: 1.5rem 2rem;
		text-align: center;
		box-shadow: var(--shadow-md);
		position: sticky;
		top: 0;
		z-index: 100;
	}
	
	.header h1 {
		margin: 0;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		transition: transform var(--transition);
	}
	
	.header h1:hover {
		transform: scale(1.02);
	}
	
	.title-main {
		font-size: 2rem;
		font-weight: 700;
		letter-spacing: 0.5px;
	}
	
	.title-sub {
		font-size: 0.9rem;
		font-weight: 400;
		opacity: 0.9;
		font-family: 'Libre Baskerville', serif;
	}
	
	/* Main Content */
	.main-content {
		padding: 2rem;
		max-width: 1400px;
		margin: 0 auto;
		width: 100%;
		overflow-y: auto;
	}
	
	.intro-section {
		max-width: 800px;
		margin: 0 auto;
	}
	
	.intro-text {
		font-family: 'Libre Baskerville', serif;
		font-size: 1.1rem;
		line-height: 1.8;
		color: var(--color-text);
		padding: 2rem;
		background: white;
		border-radius: var(--radius);
		box-shadow: var(--shadow-sm);
	}
	
	.intro-text :global(p) {
		margin-bottom: 1rem;
	}
	
	.more-button {
		display: inline-block;
		margin-top: 1rem;
		padding: 0.75rem 1.5rem;
		background: var(--color-primary);
		color: white;
		border: none;
		border-radius: var(--radius);
		cursor: pointer;
		font-size: 1rem;
		transition: all var(--transition);
	}
	
	.more-button:hover {
		background: var(--color-primary-light);
		transform: translateX(5px);
	}
	
	.less-button {
		display: inline-block;
		margin-top: 1rem;
		padding: 0.75rem 1.5rem;
		background: #6c757d;
		color: white;
		border: none;
		border-radius: var(--radius);
		cursor: pointer;
		font-size: 1rem;
		transition: all var(--transition);
	}
	
	.less-button:hover {
		background: #5a6268;
		transform: translateX(-5px);
	}
	
	.back-button {
		display: inline-block;
		margin-top: 1.5rem;
		padding: 0.75rem 1.5rem;
		background: var(--color-primary);
		color: white;
		border: none;
		border-radius: var(--radius);
		cursor: pointer;
		font-size: 1rem;
		transition: all var(--transition);
	}
	
	.back-button:hover {
		background: var(--color-primary-light);
		transform: translateX(-5px);
	}
	
	/* Cards Container */
	.cards-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		gap: 1rem;
		padding: 1rem;
	}
	
	/* Control Panel */
	.control-panel {
		background: white;
		border-top: 1px solid #e0e0e0;
		box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
		position: sticky;
		bottom: 0;
		z-index: 50;
	}
	
	.control-inner {
		max-width: 1400px;
		margin: 0 auto;
		padding: 1.5rem 2rem;
	}
	
	.instructions {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	
	.step {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}
	
	.step h3 {
		font-size: 1rem;
		font-weight: 500;
		color: var(--color-text);
		margin: 0;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	
	.info-icon {
		background: none;
		border: none;
		color: var(--color-primary);
		cursor: pointer;
		font-size: 1rem;
		padding: 0.25rem;
		transition: color var(--transition);
	}
	
	.info-icon:hover {
		color: var(--color-primary-light);
	}
	
	.lens-section {
		display: flex;
		justify-content: center;
		padding: 0.5rem 0;
	}
	
	.action-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}
	
	.btn {
		padding: 0.875rem 1.75rem;
		font-size: 1rem;
		font-weight: 500;
		border: none;
		border-radius: var(--radius);
		cursor: pointer;
		transition: all var(--transition);
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: 'Dosis', sans-serif;
	}
	
	.btn-primary {
		background: var(--color-primary);
		color: white;
	}
	
	.btn-primary:hover {
		background: var(--color-primary-light);
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}
	
	.btn-secondary {
		background: #6c757d;
		color: white;
	}
	
	.btn-secondary:hover {
		background: #5a6268;
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}
	
	.btn:active {
		transform: translateY(0);
	}
	
	.language-section {
		display: flex;
		justify-content: center;
		padding-top: 0.5rem;
	}
	
	/* Spread Selector */
	.spread-selector {
		max-width: 900px;
		margin: 2rem auto;
		padding: 2rem;
	}
	
	.spread-selector h2 {
		text-align: center;
		color: var(--color-primary);
		font-size: 1.5rem;
		margin-bottom: 2rem;
	}
	
	.spread-options {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}
	
	.spread-option {
		background: white;
		border: 2px solid var(--color-primary);
		border-radius: var(--radius);
		padding: 2rem 1.5rem;
		text-align: center;
		cursor: pointer;
		transition: all var(--transition);
		text-decoration: none;
		color: var(--color-text);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
	
	.spread-option:hover {
		transform: translateY(-5px);
		box-shadow: var(--shadow-lg);
		border-color: var(--color-primary-light);
		background: linear-gradient(135deg, rgba(0, 77, 77, 0.05) 0%, rgba(0, 87, 95, 0.05) 100%);
	}
	
	.spread-option i {
		font-size: 3rem;
		color: var(--color-primary);
	}
	
	.spread-option h3 {
		margin: 0;
		font-size: 1.3rem;
		color: var(--color-primary);
	}
	
	.spread-option p {
		margin: 0;
		font-size: 0.95rem;
		color: var(--color-text);
		opacity: 0.8;
	}
	
	/* Desktop Layout */
	@media (min-width: 1024px) {
		.page-container {
			grid-template-columns: 1fr 400px;
			grid-template-rows: auto 1fr;
		}
		
		.header {
			grid-column: 1 / -1;
		}
		
		.main-content {
			grid-column: 1;
			padding: 2rem 3rem;
			margin-right: 400px;
		}
		
		.control-panel {
			position: fixed;
			top: 0;
			right: 0;
			width: 400px;
			height: 100vh;
			border-top: none;
			border-left: 1px solid #e0e0e0;
			box-shadow: -4px 0 20px rgba(0, 0, 0, 0.05);
			overflow-y: auto;
			z-index: 100;
		}
		
		.control-inner {
			padding: 2rem 1.5rem;
			min-height: 100%;
			display: flex;
			flex-direction: column;
		}
		
		.instructions {
			gap: 1.5rem;
			flex: 1;
		}
		
		.step {
			justify-content: flex-start;
		}
		
		.action-buttons {
			flex-direction: column;
		}
		
		.btn {
			width: 100%;
			justify-content: center;
		}
	}
	
	/* Mobile step-by-step flow */
	@media (max-width: 768px) {
		/* Setup mode: hide main content, control panel fills full screen */
		.page-container:not(.mobile-card-shown) .main-content {
			display: none;
		}

		/* Card mode: hide control panel, main content fills screen */
		.page-container.mobile-card-shown .control-panel {
			display: none;
		}
		.page-container.mobile-card-shown .main-content {
			padding-bottom: 110px;
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: calc(100vh - 70px);
		}

		.mobile-card-actions {
			display: flex;
			position: fixed;
			bottom: 1.5rem;
			left: 1rem;
			right: 1rem;
			gap: 0.75rem;
			z-index: 200;
		}
		.mobile-card-actions .btn {
			flex: 1;
			justify-content: center;
		}
	}

	/* Hide mobile actions on desktop */
	@media (min-width: 769px) {
		.mobile-card-actions {
			display: none;
		}
	}

	/* Mobile optimizations */
	@media (max-width: 768px) {
		.header {
			padding: 1rem;
		}
		
		.title-main {
			font-size: 1.5rem;
		}
		
		.title-sub {
			font-size: 0.8rem;
		}
		
		.main-content {
			padding: 1rem;
		}
		
		.intro-text {
			padding: 1.5rem;
			font-size: 1rem;
		}
		
		.control-inner {
			padding: 1rem;
		}
		
		.step h3 {
			font-size: 0.9rem;
		}
		
		.btn {
			padding: 0.75rem 1.25rem;
			font-size: 0.95rem;
		}
	}
</style>
