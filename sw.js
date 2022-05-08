const CACHE_NAME = "V1";
const STATIC_CACHE_URLS = ["/",
	"/assets/logo/logo.svg", "/assets/providers/google.svg", 
	"/bootstrap/css/bootstrap.min.css", "/bootstrap/js/bootstrap.bundle.min.js",
	"/css/style.css",
	"/js/auth.js", "/js/checklist.js", "/js/checklistData.json", "/js/darkmode.js", "/js/headerfooter.js", "/js/login.js", "/js/profile.js", "/js/userChecklist.js",
	"/privacy-policy.html",
	"/profile.html",
	"/signin.html",
	"/terms-of-service.html"];

function cache(request, response) {
  if (response.type === "error" || response.type === "opaque") {
    return Promise.resolve(); // do not put in cache network errors
  }

  return caches
    .open(CACHE_NAME)
    .then(cache => cache.put(request, response.clone()));
}

self.addEventListener("install", event => {
  console.log("Service Worker installing.");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_CACHE_URLS))
  );
});

self.addEventListener("activate", event => {
  console.log("Service Worker activating.");
});

self.addEventListener("fetch", event => {
  // Cache-First Strategy
  event.respondWith(
    caches
      .match(event.request) // check if the request has already been cached
      .then(cached => cached || fetch(event.request)) // otherwise request network
      .then(
        response =>
          cache(event.request, response) // put response in cache
            .then(() => response) // resolve promise with the network response
      )
  );
});