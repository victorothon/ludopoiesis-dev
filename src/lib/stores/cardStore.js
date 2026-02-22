import { writable } from 'svelte/store';

// Language store
export const idioma = writable('es');

// Active lenses store
export const lentesActivos = writable({
	naturaleza: true,
	fluir: true,
	tecnologia: true
});

// Drawn cards store
export const cartasLanzadas = writable([]);

// All cards data
export const cartasData = writable([]);

// Current view (intro, cards, etc.)
export const currentView = writable('intro');

// Load cards data
export async function loadCards() {
	try {
		const response = await fetch('/cartas.json?v=' + new Date().getTime());
		const data = await response.json();
		cartasData.set(data);
		return data;
	} catch (error) {
		console.error('Error loading cards:', error);
		return [];
	}
}

// Toggle a lens
export function toggleLente(lente) {
	lentesActivos.update(lentes => ({
		...lentes,
		[lente]: !lentes[lente]
	}));
}

// Draw a random card
export function drawCard(cartas, lentes, lang) {
	const activos = Object.entries(lentes)
		.filter(([_, activo]) => activo)
		.map(([lente]) => lente);

	const cartasFiltradas = cartas.filter(c => activos.includes(c.lente));
	
	if (cartasFiltradas.length === 0) return null;
	
	const carta = cartasFiltradas[Math.floor(Math.random() * cartasFiltradas.length)];
	
	return {
		...carta,
		titulo: lang === 'es' ? carta.titulo : carta.titulo_pt,
		texto: lang === 'es' ? carta.texto : carta.texto_pt,
		imagen: lang === 'es' ? carta.imagen : carta.imagen_pt
	};
}

// Reset drawn cards
export function resetCards() {
	cartasLanzadas.set([]);
	currentView.set('intro');
}
