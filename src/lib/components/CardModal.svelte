<script>
	import { fade, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	
	export let card = null;
	export let onClose = () => {};
	
	function handleBackdropClick(e) {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}
	
	function handleKeydown(e) {
		if (e.key === 'Escape') {
			onClose();
		}
	}
</script>

{#if card}
	<div 
		class="modal-overlay" 
		transition:fade={{ duration: 200 }}
		on:click={handleBackdropClick}
		on:keydown={handleKeydown}
		role="button"
		tabindex="0"
	>
		<div 
			class="modal-content"
			transition:scale={{ duration: 300, easing: quintOut }}
		>
			<button class="close-button" on:click={onClose} aria-label="Close">
				<i class="fa fa-times"></i>
			</button>
			
			<div class="enlarged-card">
				<div class="card-image">
					<img src={card.imagen} alt={card.titulo} />
				</div>
				<div class="card-content">
					<h2>{card.titulo}</h2>
					<div class="card-text">
						{@html card.texto.replace(/\n/g, '<br>')}
					</div>
					{#if card.position}
						<div class="card-position">
							<i class="fa fa-compass"></i>
							{card.position}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.85);
		backdrop-filter: blur(4px);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		overflow-y: auto;
	}
	
	.modal-content {
		position: relative;
		max-width: 900px;
		width: 100%;
		max-height: 90vh;
		background: white;
		border-radius: var(--radius);
		overflow: hidden;
		box-shadow: var(--shadow-lg);
	}
	
	.close-button {
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.95);
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		color: var(--color-text);
		z-index: 10;
		transition: all var(--transition);
		box-shadow: var(--shadow-md);
	}
	
	.close-button:hover {
		background: white;
		transform: scale(1.1);
	}
	
	.enlarged-card {
		display: flex;
		flex-direction: column;
		max-height: 90vh;
		overflow-y: auto;
	}
	
	.card-image {
		width: 100%;
		max-height: 50vh;
		overflow: hidden;
		background: var(--color-background);
	}
	
	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
	}
	
	.card-content {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	
	.card-content h2 {
		font-size: 2rem;
		color: var(--color-primary);
		margin: 0;
		text-align: right;
	}
	
	.card-text {
		font-size: 1.1rem;
		line-height: 1.8;
		color: var(--color-text);
		font-family: 'Libre Baskerville', serif;
	}
	
	.card-position {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-primary);
		padding: 0.75rem 1rem;
		background: rgba(0, 77, 77, 0.1);
		border-radius: var(--radius);
		justify-content: center;
	}
	
	/* Horizontal layout for larger screens */
	@media (min-width: 768px) {
		.enlarged-card {
			flex-direction: row;
			max-height: 80vh;
		}
		
		.card-image {
			width: 45%;
			max-height: none;
			flex-shrink: 0;
		}
		
		.card-content {
			width: 55%;
			overflow-y: auto;
			padding: 2.5rem;
		}
	}
	
	/* Mobile optimizations */
	@media (max-width: 768px) {
		.modal-overlay {
			padding: 0;
		}
		
		.modal-content {
			max-height: 100vh;
			height: 100vh;
			border-radius: 0;
		}
		
		.card-content {
			padding: 1.5rem;
		}
		
		.card-content h2 {
			font-size: 1.5rem;
		}
		
		.card-text {
			font-size: 1rem;
		}
	}
</style>
