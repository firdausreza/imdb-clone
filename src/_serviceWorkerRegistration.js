export function register() {
	if ("serviceWorker" in navigator && "SyncManager" in window) {
		window.addEventListener("load", async () => {
			const swUrl = `${process.env.PUBLIC_URL}/serviceWorker.js`;
			navigator.serviceWorker.register(swUrl).then((res) => {
				console.log("Service Worker Registered (service-worker)");
			});

			navigator.serviceWorker.ready.then((registration) => {
				return registration.sync.register("sync-watchlist");
			});
			// .then(async (reg) => {
			// 	console.log("register reg: ", reg);
			// 	if (reg.sync) {
			// 		await reg.sync
			// 			.register("sync-watchlist")
			// 			.then(() => {
			// 				console.log("Sync registered: ", reg.sync);
			// 			})
			// 			.catch((err) => {
			// 				console.log(
			// 					"Failed to register background sync",
			// 					err
			// 				);
			// 			});
			// 	}
			// });
		});
	}
}
// export async function registerSync() {
// 	const swRegistration = await navigator.serviceWorker.ready;
// 	swRegistration.sync.register("sync-all-data");
// }

// export function syncData() {
// 	const sessionId = sessionStorage.getItem("currentSession");
// 	const accountId = JSON.parse(sessionStorage.getItem("currentUser")).id;

// 	if (navigator.onLine) {
// 		// Must be authenticated
// 		if (sessionId) {
// 			syncWatchlistData(sessionId, accountId);
// 		}
// 	}
// }
