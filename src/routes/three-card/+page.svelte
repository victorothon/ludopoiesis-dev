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
		cartasData, 
		loadCards,
		drawCard
	} from '$lib/stores/cardStore.js';
	
	let drawnCards = [];
	let currentPosition = 0;
	let enlargedCard = null;
	let mobileStep = 0;    // 0=setup, 1+=card view
	let mobileViewCard = 0; // which card index to show on mobile
	const positions = [
		{ name: { es: 'Mente', pt: 'Mente' }, sub: { es: 'Lo que piensas', pt: 'O que você pensa' } },
		{ name: { es: 'Corazón', pt: 'Coração' }, sub: { es: 'Lo que sientes', pt: 'O que você sente' } },
		{ name: { es: 'Manos', pt: 'Mãos' }, sub: { es: 'Lo que haces', pt: 'O que você faz' } }
	];
	
	onMount(async () => {
		await loadCards();
	});
	
	function handleDrawCard() {
		if (drawnCards.length >= 3) {
			alert($idioma === 'es' 
				? '¡Ya has sacado las 3 cartas!'
				: 'Você já tirou as 3 cartas!');
			return;
		}
		
		const carta = drawCard($cartasData, $lentesActivos, $idioma);
		
		if (!carta) {
			alert($idioma === 'es' 
				? 'No hay lentes activados. Por favor, activa al menos uno.'
				: 'Nenhuma lente ativada. Por favor, ative pelo menos uma.');
			return;
		}
		
		drawnCards = [...drawnCards, { 
			...carta, 
			positionName: positions[currentPosition].name,
			positionSub: positions[currentPosition].sub
		}];
		currentPosition++;
		// On mobile, jump to the newly drawn card
		mobileViewCard = drawnCards.length - 1;
		mobileStep = 1;
	}
	
	function handleReset() {
		drawnCards = [];
		currentPosition = 0;
		mobileStep = 0;
		mobileViewCard = 0;
	}
	
	function handleEnlargeCard(card) {
		enlargedCard = card;
	}
	
	function closeModal() {
		enlargedCard = null;
	}
</script>

<div class="page-container" class:mobile-card-view={mobileStep > 0}>
	<header class="header">
		<a href="/" class="back-link">
			<i class="fa fa-arrow-left"></i> Volver
		</a>
		<h1>
			<span class="title-main">{$idioma === 'es' ? 'Lectura de 3 Cartas' : 'Leitura de 3 Cartas'}</span>
			<span class="title-sub">{$idioma === 'es' ? 'Mente • Corazón • Manos' : 'Mente • Coração • Mãos'}</span>
		</h1>
	</header>

	<main class="main-content">
		<div class="spread-info">
			<p>
				{$idioma === 'es' 
					? 'Tres dimensiones de tu situación: lo que piensas, lo que sientes y lo que haces.'
					: 'Três dimensões da sua situação: o que você pensa, o que você sente e o que você faz.'}
			</p>
		</div>

		<!-- Three Card Spread Layout -->
		<div class="three-card-spread">
			{#each drawnCards as card, i (card.id + i)}
				<div class="spread-position" transition:fly={{ y: 50, delay: i * 150, duration: 400 }}>
					<div class="position-header">
						<div class="position-label">{card.positionName[$idioma]}</div>
						<div class="position-sub">{card.positionSub[$idioma]}</div>
					</div>
					<Card 
						card={card}
						scale={1}
						rotation={0}
						onEnlarge={handleEnlargeCard}
					/>
				</div>
			{/each}
			
			<!-- Empty slots -->
			{#each Array(3 - drawnCards.length) as _, i}
				<div class="spread-position empty">
					<div class="position-header">
						<div class="position-label">{positions[drawnCards.length + i].name[$idioma]}</div>
						<div class="position-sub">{positions[drawnCards.length + i].sub[$idioma]}</div>
					</div>
					<div class="empty-card">
						<i class="fa fa-question"></i>
					</div>
				</div>
			{/each}
		</div>
	</main>

	<!-- Card Modal for enlarged view -->
	<CardModal card={enlargedCard} onClose={closeModal} />

	<!-- Mobile card view (screen-by-screen on mobile) -->
	{#if mobileStep > 0 && drawnCards[mobileViewCard]}
		<div class="mobile-card-screen">
			<!-- Navigation dots -->
			<div class="mobile-dots">
				{#each positions as pos, i}
					<button 
						class="dot" 
						class:drawn={i < drawnCards.length}
						class:active={i === mobileViewCard}
						on:click={() => i < drawnCards.length && (mobileViewCard = i)}
						disabled={i >= drawnCards.length}
					>
						<span class="dot-name">{pos.name[$idioma]}</span>
					</button>
				{/each}
			</div>

			<!-- Current card -->
			{#key mobileViewCard}
				<div class="mobile-card-display" transition:fly={{ y: 30, duration: 300 }}>
					<div class="position-header">
						<div class="position-label">{drawnCards[mobileViewCard].positionName[$idioma]}</div>
						<div class="position-sub">{drawnCards[mobileViewCard].positionSub[$idioma]}</div>
					</div>
					<Card
						card={drawnCards[mobileViewCard]}
						scale={1}
						rotation={0}
						onEnlarge={handleEnlargeCard}
					/>
				</div>
			{/key}

			<!-- Floating bottom actions -->
			<div class="mobile-bottom-actions">
				{#if drawnCards.length < 3}
					<button class="btn btn-primary" on:click={handleDrawCard}>
						<i class="fa fa-sparkles"></i>
						{$idioma === 'es' 
							? 'Sacar: ' + positions[drawnCards.length].name.es
							: 'Tirar: ' + positions[drawnCards.length].name.pt}
					</button>
				{:else}
					<button class="btn btn-secondary" on:click={handleReset}>
						<i class="fa fa-rotate-right"></i>
						{$idioma === 'es' ? 'Nueva Lectura' : 'Nova Leitura'}
					</button>
				{/if}
				<button class="btn btn-ghost" on:click={() => mobileStep = 0}>
					{$idioma === 'es' ? 'Cambiar lentes' : 'Mudar lentes'}
				</button>
			</div>
		</div>
	{/if}

	<aside class="control-panel">
		<div class="control-inner">
			<div class="instructions">
				<div class="step">
					<h3>Escoge tus lentes</h3>
				</div>

				<div class="lens-section">
					<LensSelector />
				</div>

				<div class="progress-indicator">
					<p>{drawnCards.length} / 3 cartas</p>
				</div>

				<div class="action-buttons">
					<button 
						class="btn btn-primary" 
						on:click={handleDrawCard}
						disabled={drawnCards.length >= 3}
					>
						<i class="fa fa-sparkles"></i>
						{drawnCards.length < 3 
						? ($idioma === 'es' 
							? 'Sacar: ' + positions[drawnCards.length].name.es 
							: 'Tirar: ' + positions[drawnCards.length].name.pt)
						: ($idioma === 'es' ? 'Lectura Completa' : 'Leitura Completa')}
					</button>
					<button class="btn btn-secondary" on:click={handleReset}>
						<i class="fa fa-rotate-right"></i>
						Nueva Lectura
					</button>
				</div>

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
	}
	
	.header {
		background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
		color: white;
		padding: 1.5rem 2rem;
		text-align: center;
		box-shadow: var(--shadow-md);
		position: sticky;
		top: 0;
		z-index: 100;
		position: relative;
	}
	
	.back-link {
		position: absolute;
		left: 2rem;
		top: 50%;
		transform: translateY(-50%);
		color: white;
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		transition: opacity var(--transition);
	}
	
	.back-link:hover {
		opacity: 0.8;
	}
	
	.header h1 {
		margin: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}
	
	.title-main {
		font-size: 2rem;
		font-weight: 700;
	}
	
	.title-sub {
		font-size: 0.9rem;
		font-weight: 400;
		opacity: 0.9;
	}
	
	.main-content {
		padding: 2rem;
		max-width: 1400px;
		margin: 0 auto;
		width: 100%;
	}
	
	.spread-info {
		text-align: center;
		max-width: 600px;
		margin: 0 auto 2rem;
		font-family: 'Libre Baskerville', serif;
		font-size: 1.1rem;
		color: var(--color-text);
	}
	
	.three-card-spread {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2.5rem;
		max-width: 420px;
		margin: 0 auto;
		padding: 1rem;
	}
	
	.spread-position {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
	
	.position-header {
		text-align: center;
	}

	.position-label {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--color-primary);
		text-align: center;
		margin-bottom: 0.2rem;
	}

	.position-sub {
		font-size: 0.9rem;
		color: var(--color-text);
		opacity: 0.7;
		font-style: italic;
		text-align: center;
	}
	
	.empty-card {
		width: 100%;
		max-width: 340px;
		min-height: 120px;
		border: 3px dashed #ccc;
		border-radius: var(--radius);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 4rem;
		color: #ddd;
		background: rgba(255, 255, 255, 0.5);
	}
	
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
	
	.step h3 {
		font-size: 1rem;
		font-weight: 500;
		color: var(--color-text);
		margin: 0;
		text-align: center;
	}
	
	.lens-section {
		display: flex;
		justify-content: center;
		padding: 0.5rem 0;
	}
	
	.progress-indicator {
		text-align: center;
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--color-primary);
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
	
	.btn-primary:hover:not(:disabled) {
		background: var(--color-primary-light);
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}
	
	.btn-primary:disabled {
		background: #ccc;
		cursor: not-allowed;
	}
	
	.btn-secondary {
		background: #6c757d;
		color: white;
	}
	
	.btn-secondary:hover {
		background: #5a6268;
		transform: translateY(-2px);
	}
	
	.language-section {
		display: flex;
		justify-content: center;
	}
	
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
		}
		
		.control-panel {
			grid-column: 2;
			grid-row: 2;
			border-top: none;
			border-left: 1px solid #e0e0e0;
			position: sticky;
			top: 80px;
			height: calc(100vh - 80px);
		}
		
		.action-buttons {
			flex-direction: column;
		}
		
		.btn {
			width: 100%;
			justify-content: center;
		}
	}
	
	@media (max-width: 768px) {
		.header {
			padding: 1rem;
		}
		
		.back-link {
			left: 1rem;
		}
		
		.title-main {
			font-size: 1.5rem;
		}
		
		.main-content {
			padding: 1rem;
		}
		
		.three-card-spread {
			max-width: 100%;
			gap: 1.5rem;
		}
		
		.spread-info {
			font-size: 1rem;
		}
	}

	/* Mobile card screen - hidden on desktop */
	.mobile-card-screen {
		display: none;
	}

	@media (max-width: 768px) {
		/* Hide desktop spread when in card view mode */
		.page-container.mobile-card-view .main-content {
			display: none;
		}
		.page-container.mobile-card-view .control-panel {
			display: none;
		}

		/* Full-screen card view */
		.mobile-card-screen {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: var(--color-bg, #f8f5f0);
			z-index: 500;
			overflow-y: auto;
			padding: 1rem 1rem 110px;
		}

		/* Navigation dots */
		.mobile-dots {
			display: flex;
			gap: 0.75rem;
			justify-content: center;
			padding: 0.75rem 0 1rem;
			width: 100%;
		}

		.dot {
			flex: 1;
			max-width: 100px;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.3rem;
			padding: 0.5rem 0.25rem;
			background: none;
			border: 2px solid #ddd;
			border-radius: var(--radius);
			cursor: pointer;
			transition: all 0.2s;
			opacity: 0.4;
		}
		.dot.drawn { opacity: 0.7; border-color: var(--color-primary); cursor: pointer; }
		.dot.active { opacity: 1; border-color: var(--color-primary); background: rgba(var(--color-primary-rgb, 100, 60, 40), 0.08); font-weight: 700; }
		.dot-name { font-size: 0.75rem; color: var(--color-primary); font-family: 'Dosis', sans-serif; font-weight: 600; }

		/* Card display */
		.mobile-card-display {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.75rem;
			width: 100%;
		}

		/* Bottom floating bar */
		.mobile-bottom-actions {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			padding: 1rem;
			background: white;
			border-top: 1px solid #e0e0e0;
			box-shadow: 0 -4px 16px rgba(0,0,0,0.08);
			display: flex;
			gap: 0.75rem;
			z-index: 600;
		}
		.mobile-bottom-actions .btn {
			flex: 1;
			justify-content: center;
		}
		.btn-ghost {
			background: transparent;
			color: var(--color-primary);
			border: 2px solid var(--color-primary);
		}
	}
</style>
