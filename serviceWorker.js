// On install - the application shell cached
self.addEventListener('install', (e) => {
	e.waitUntil(
		caches.open('sw-cache').then((cache) => {
			// HTML
			cache.add('/index.html')
			cache.add('/feedback.html')
			// CSS
			cache.add('/assets/css/style.css')
			// JS
			cache.add('/assets/js/formReset.js')
			cache.add('/assets/js/index.js')
			cache.add('/assets/js/Metronome.js')
			cache.add('/assets/js/Move.js')
			cache.add('/assets/js/Turn.js')
			cache.add('/assets/js/unmute.js')
			cache.add('/assets/images/marching-shoe.svg')
			// images
			cache.add('/assets/images/metronome.svg')
			// external resources
			cache.add('https://use.fontawesome.com/releases/v5.15.3/css/all.css')
		})
	)
})

// with requeset network
self.addEventListener('fetch', (e) => {
	e.respondWith(
		// try the cache
		caches.match(e.request).then((response) => {
			// return it if there is a response, or else fetch again
			return response || fetch(e.request)
		})
	)
})
