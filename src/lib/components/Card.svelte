<script>
	export let card;
	export let onClick = () => {};
	export let scale = 1;
	export let rotation = 0;
	export let onEnlarge = () => {};
	
	let flipped = false;
	
	function handleClick() {
		flipped = !flipped;
		onClick({ card, flipped });
	}
</script>

<div 
	class="card-wrapper" 
	style="transform: scale({scale}) rotate({rotation}deg);"
	role="button"
	tabindex="0"
	on:click={handleClick}
	on:keydown={(e) => e.key === 'Enter' && handleClick()}
>
	<div class="card" class:flipped>
		<div class="card-inner">
			<!-- Front of card - Deck Back Image -->
			<div class="card-front">
				<img src={card.imagen} alt={card.titulo} />
			</div>
			
			<!-- Back of card - Card Text -->
			<div class="card-back">
				<h2>{card.titulo}</h2>
				<div class="card-text">
					{@html card.texto.replace(/\n/g, '<br>')}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.card-wrapper {
		perspective: 1000px;
		cursor: pointer;
		transition: transform 0.3s ease;
		width: 340px;
		max-width: 90vw;
		margin: 0.5rem;
	}
	
	.card-wrapper:hover {
		transform: scale(1.05);
	}
	
	.card {
		position: relative;
		width: 100%;
		min-height: 520px;
		transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	.card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	.card.flipped .card-inner {
		transform: rotateY(180deg);
	}
	
	.card-front,
	.card-back {
		position: absolute;
		width: 100%;
		min-height: 520px;
		backface-visibility: hidden;
		border-radius: var(--radius);
		overflow: hidden;
		box-shadow: var(--shadow-md);
	}
	
	.card-front {
		background: white;
		overflow: hidden;
	}
	
	.card-front img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	
	.card-back {
		background: white;
		transform: rotateY(180deg);
		padding: 1.5rem 1.2rem;
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		overflow: hidden;
	}
	
	.card-back h2 {
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--color-primary);
		text-align: left;
		margin: 0;
	}
	
	.card-text {
		font-size: 0.85rem;
		line-height: 1.5;
		color: var(--color-text);
		text-align: left;
	}
	
	/* Mobile adjustments */
	@media (max-width: 768px) {
		.card-wrapper {
			width: 100%;
			max-width: 340px;
			margin: 0.5rem auto;
		}
		
		.card-back {
			padding: 1.5rem 1rem;
			font-size: 0.9rem;
		}
		
		.card-back h2 {
			font-size: 1.3rem;
		}
	}
	
	/* Touch device optimization */
	@media (hover: none) {
		.card-wrapper:hover {
			transform: scale(1);
		}
		
		.card-wrapper:active {
			transform: scale(0.98);
		}
	}
</style>
