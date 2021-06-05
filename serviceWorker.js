const resoursesToCache = [
	// HTML
	'/index.html',
	'/feedback.html',
	// CSS
	'/assets/css/style.css',
	// JS
	'/assets/js/formReset.js',
	'/assets/js/index.js',
	'/assets/js/Metronome.js',
	'/assets/js/Move.js',
	'/assets/js/Turn.js',
	'/assets/js/unmute.js',
	// images
	'/assets/images/marching-shoe.svg',
	'/assets/images/metronome.svg',
	// fonts
	'/assets/fonts/montserrat-v15-latin-700.eot',
	'/assets/fonts/montserrat-v15-latin-700.svg',
	'/assets/fonts/montserrat-v15-latin-700.ttf',
	'/assets/fonts/montserrat-v15-latin-700.woff',
	'/assets/fonts/montserrat-v15-latin-700.woff2',
	'/assets/fonts/montserrat-v15-latin-regular.eot',
	'/assets/fonts/montserrat-v15-latin-regular.svg',
	'/assets/fonts/montserrat-v15-latin-regular.ttf',
	'/assets/fonts/montserrat-v15-latin-regular.woff',
	'/assets/fonts/montserrat-v15-latin-regular.woff2',
	// external resources
	'https://use.fontawesome.com/releases/v5.15.3/css/all.css',
]

// On install - cache resources
self.addEventListener('install', (e) => {
	e.waitUntil(
		caches.open('sw-cache').then((cache) => {
			cache.addAll(resoursesToCache)
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
