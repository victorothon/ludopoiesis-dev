<script>
	import { lentesActivos, toggleLente } from '$lib/stores/cardStore.js';
	
	const lenses = [
		{ id: 'naturaleza', icon: '/img/iconos/icono_naturaleza.png', alt: 'Naturaleza' },
		{ id: 'fluir', icon: '/img/iconos/icono_fluir.png', alt: 'Fluir' },
		{ id: 'tecnologia', icon: '/img/iconos/icono_tecnologia.png', alt: 'Tecnología' }
	];
	
	function handleToggle(lente) {
		toggleLente(lente);
	}
	
	function getIconPath(lente, isActive) {
		const estado = isActive ? '' : '_apagado';
		return `/img/iconos/icono_${lente}${estado}.png`;
	}
</script>

<div class="lens-selector">
	{#each lenses as { id, icon, alt }}
		<div class="lens-item">
			<button 
				class="lens-button"
				class:active={$lentesActivos[id]}
				on:click={() => handleToggle(id)}
				title={alt}
				aria-label={alt}
				aria-pressed={$lentesActivos[id]}
			>
				<img 
					src={getIconPath(id, $lentesActivos[id])} 
					alt={alt}
				/>
			</button>
			<div class="lens-label">{alt}</div>
		</div>
	{/each}
</div>

<style>
	.lens-selector {
		display: flex;
		gap: 1.5rem;
		align-items: flex-start;
		justify-content: center;
		flex-wrap: wrap;
	}
	
	.lens-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}
	
	.lens-button {
		background: transparent;
		border: 2px solid transparent;
		border-radius: 50%;
		padding: 0.5rem;
		cursor: pointer;
		transition: all var(--transition);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.lens-button:hover {
		transform: scale(1.1);
		border-color: var(--color-primary-light);
	}
	
	.lens-button:active {
		transform: scale(0.95);
	}
	
	.lens-button.active {
		border-color: var(--color-primary);
	}
	
	.lens-button img {
		width: 44px;
		height: 44px;
		display: block;
		transition: opacity var(--transition);
	}
	
	.lens-button:not(.active) img {
		opacity: 0.5;
	}
	
	.lens-label {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-primary);
		text-align: center;
		white-space: nowrap;
		opacity: 0.8;
	}
	
	.lens-button.active + .lens-label,
	.lens-item:has(.lens-button.active) .lens-label {
		opacity: 1;
		color: var(--color-primary);
		font-weight: 700;
	}
	
	/* Mobile adjustments */
	@media (max-width: 768px) {
		.lens-selector {
			gap: 1rem;
		}
		
		.lens-button img {
			width: 40px;
			height: 40px;
		}
		
		.lens-label {
			font-size: 0.75rem;
		}
	}
</style>
