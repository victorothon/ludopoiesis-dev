<script>
	import { idioma } from '$lib/stores/cardStore.js';
	
	let isChecked = false;
	
	idioma.subscribe(value => {
		isChecked = value === 'pt';
	});
	
	function handleToggle() {
		idioma.update(current => current === 'es' ? 'pt' : 'es');
	}
	
	function setLanguage(lang) {
		idioma.set(lang);
	}
</script>

<div class="language-switch">
	<button 
		class="flag-button" 
		class:active={$idioma === 'es'}
		on:click={() => setLanguage('es')}
		aria-label="Español"
	>
		🇪🇸
	</button>
	
	<label class="switch">
		<input 
			type="checkbox" 
			checked={isChecked}
			on:change={handleToggle}
			aria-label="Toggle language"
		/>
		<span class="slider"></span>
	</label>
	
	<button 
		class="flag-button"
		class:active={$idioma === 'pt'}
		on:click={() => setLanguage('pt')}
		aria-label="Português"
	>
		🇧🇷
	</button>
</div>

<style>
	.language-switch {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.5rem;
	}
	
	.flag-button {
		font-size: 1.5rem;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
		transition: transform var(--transition), opacity var(--transition);
		opacity: 0.5;
	}
	
	.flag-button:hover {
		transform: scale(1.2);
	}
	
	.flag-button.active {
		opacity: 1;
		transform: scale(1.1);
	}
	
	.switch {
		position: relative;
		display: inline-block;
		width: 50px;
		height: 28px;
	}
	
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}
	
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ddd;
		transition: 0.4s;
		border-radius: 34px;
	}
	
	.slider:before {
		position: absolute;
		content: "";
		height: 22px;
		width: 22px;
		left: 3px;
		bottom: 3px;
		background-color: white;
		transition: 0.4s;
		border-radius: 50%;
	}
	
	input:checked + .slider {
		background-color: var(--color-primary);
	}
	
	input:checked + .slider:before {
		transform: translateX(22px);
	}
	
	input:focus + .slider {
		box-shadow: 0 0 1px var(--color-primary);
	}
</style>
