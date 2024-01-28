const self = this;
const CACHE_NAME = "imdb-app-v1";

// Install ServiceWorker
self.addEventListener("install", (event) => {
	console.log("ServiceWorker Install (serviceWorker.js)");
	self.skipWaiting();
});

// Listen/Fetch Requests
self.addEventListener("fetch", (event) => {
	if (!event.request.url.startsWith("http")) {
		return;
	}
	if (event.request.method === "GET") {
		event.respondWith(
			fetch(event.request)
				.then((res) => {
					const resClone = res.clone();
					caches.open(CACHE_NAME).then((cache) => {
						cache.put(event.request, resClone);
					});
					return res;
				})
				.catch((err) => {
					caches.match(event.request).then((res) => res);
				})
		);
	}
});

// Activate ServiceWorker
self.addEventListener("activate", (event) => {
	const cacheWhitelist = [];
	cacheWhitelist.push(CACHE_NAME);

	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				return Promise.all(
					cacheNames.map((cacheName) => {
						if (!cacheWhitelist.includes(cacheName)) {
							return caches.delete(cacheName);
						}
					})
				);
			})
			.then(() => {
				self.clients.claim();
			})
	);
});

// Sync Event
// self.addEventListener("sync", (event) => {
// 	if (event.tag === "sync-watchlist") {
// 		event.waitUntil(syncWatchlistData());
// 	}
// });

// function syncWatchlistData() {
// 	console.log("syncWatchlistData is Running");
// 	let sessionId = "";
// 	let accountId = "";
// 	let watchlistDataCollection = null;
// 	const idb = indexedDB.open("localforage", 2);

// 	idb.onsuccess = (event) => {
// 		let db = event.target.result;
// 		let transaction = db.transaction("keyvaluepairs", "readwrite");
// 		let objectStore = transaction.objectStore("keyvaluepairs");

// 		let getCurrentSession = objectStore.get("currentSession");
// 		getCurrentSession.onsuccess = (event) => {
// 			sessionId = event.target.result || "";
// 		};

// 		let getCurrentId = objectStore.get("currentUser");
// 		getCurrentId.onsuccess = (event) => {
// 			accountId = event.target.result
// 				? JSON.parse(event.target.result).id
// 				: "";
// 		};

// 		let getWatchlistData = objectStore.get("offlineWatchlistData");
// 		getWatchlistData.onsuccess = (event) => {
// 			if (event.target.result)
// 				watchlistDataCollection = JSON.parse(event.target.result);
// 		};
// 	};

// 	// Must be authenticated
// 	if (sessionId) {
// 		// syncWatchlistData(sessionId, accountId);
// 		if (watchlistDataCollection) {
// 			let watchlistTemp = watchlistDataCollection;
// 			let getUserWatchlistData = watchlistTemp.filter(
// 				(data) => data.account_id === accountId
// 			)[0];
// 			let payload = getUserWatchlistData?.data || [];

// 			// If watchlistData based by account_id is exist
// 			if (payload.length > 0) {
// 				let errorSync = false;
// 				payload.forEach(async (movieData) => {
// 					await fetch(
// 						`https://api.themoviedb.org/3/account/${accountId}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`,
// 						{
// 							method: "POST",
// 							headers: {
// 								"Content-Type": "application/json",
// 							},
// 							body: movieData,
// 						}
// 					).catch((err) => {
// 						errorSync = true;
// 						throw new Error("Failed to sync watchlist data: ", err);
// 					});
// 				});

// 				// Delete only if there's no error sync occured
// 				if (!errorSync) {
// 					// Delete watchlist data based on user account_id
// 					watchlistTemp = watchlistTemp.filter(
// 						(data) => data.account_id !== accountId
// 					);
// 					let _idb = indexedDB.open("localforage", 2);

// 					_idb.onsuccess = (event) => {
// 						let db = event.target.result;
// 						let transaction = db.transaction(
// 							"keyvaluepairs",
// 							"readwrite"
// 						);
// 						let objectStore =
// 							transaction.objectStore("keyvaluepairs");

// 						let putRequest = objectStore
// 							.get("offlineWatchlistData")
// 							.put(watchlistTemp);
// 						putRequest.onsuccess = (event) => {
// 							console.log("Edit Watchlist Data success: ", event);
// 						};
// 						putRequest.onerror = (event) => {
// 							console.log("Edit Watchlist Data error: ", event);
// 						};
// 					};
// 				}
// 			}
// 		}
// 	}
// }
