// @ts-nocheck
/* eslint-disable */
/**
 * Service Worker for Ludopoiesis PWA
 * Handles caching and offline functionality
 */

const CACHE_NAME = 'ludopoiesis-v1';
const urlsToCache = [
	'/',
	'/three-card/',
	'/cartas.json',
	'/textos.json',
	'/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) => {
				console.log('Opened cache');
				return cache.addAll(urlsToCache);
			})
	);
	// Force the waiting service worker to become the active service worker
	self.skipWaiting();
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request)
			.then((response) => {
				// Cache hit - return response
				if (response) {
					return response;
				}
				// Clone the request because it can only be used once
				return fetch(event.request.clone()).catch(() => {
					// If fetch fails, we're offline and there's no cache
					// You could return a custom offline page here
					return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
				});
			})
	);
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
	const cacheWhitelist = [CACHE_NAME];
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
					return null;
				})
			);
		}).then(() => {
			// Claim all clients immediately
			return self.clients.claim();
		})
	);
});
