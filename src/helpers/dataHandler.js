import localforage from "localforage";
import { tmdb } from "./tmdb-api.js";

// Method for MovieCard component handler on Watchlist button interact
// Payload { account_id: account_id, data: [{media_id, media_type, watchlist: false/true}] }
export const saveWatchlist = async (payload, sessionId) => {
	if (!navigator.onLine) {
		navigator.serviceWorker.ready.then((reg) => {
			return reg.sync.register("sync-watchlist");
		});
		let offlineDataCollection =
			JSON.parse(await localforage.getItem("offlineWatchlistData")) || [];
		if (offlineDataCollection && offlineDataCollection.length > 0) {
			// Check if account_id is already exist in offlineData LS
			if (
				offlineDataCollection.some(
					(data) => data.account_id === payload.account_id
				)
			) {
				let existingData = offlineDataCollection.filter(
					(data) => data.account_id === payload.account_id
				)[0];
				// Deep checking if movie is already on the offlineData list
				let tempData = existingData.data.concat(payload.data);
				tempData = [...new Set(tempData)];
				existingData.data = tempData;
				offlineDataCollection = offlineDataCollection.map((data) => {
					if (data.account_id === existingData.account_id)
						return existingData;
					else return data;
				});
			} else {
				offlineDataCollection.push(payload);
			}
		} else {
			offlineDataCollection.push(payload);
		}
		localforage.setItem(
			"offlineWatchlistData",
			JSON.stringify(offlineDataCollection)
		);
	} else {
		if (sessionId) {
			await tmdb
				.requestWatchlist(
					payload.account_id,
					sessionId,
					payload.data[0]
				)
				.catch((e) => {
					throw new Error("Failed to save watchlist: ", e);
				});
		}
	}
};

// Method for serviceWorker
export async function syncWatchlistData() {
	console.log("syncWatchlistData is Running");
	let sessionId = await localforage.getItem("currentSession");
	let accountId = JSON.parse(await localforage.getItem("currentUser"))?.id;
	let watchlistDataCollection = JSON.parse(
		await localforage.getItem("offlineWatchlistData")
	);
	// Must be authenticated
	if (sessionId && sessionId !== "") {
		if (watchlistDataCollection && watchlistDataCollection.length > 0) {
			let watchlistTemp = watchlistDataCollection;
			let getUserWatchlistData = watchlistTemp.filter(
				(data) => data.account_id === accountId
			)[0];
			let payload = getUserWatchlistData?.data || [];
			// If watchlistData based by account_id is exist
			if (payload.length > 0) {
				let errorSync = false;
				payload.forEach(async (movieData) => {
					await tmdb
						.requestWatchlist(accountId, sessionId, movieData)
						.catch((err) => {
							errorSync = true;
							throw new Error(
								"Failed to sync watchlist data: ",
								err
							);
						});
				});

				// Delete only if there's no error sync occured
				if (!errorSync) {
					// Delete watchlist data based on user account_id
					watchlistTemp = watchlistTemp.filter(
						(data) => data.account_id !== accountId
					);

					localforage.setItem(
						"offlineWatchlistData",
						JSON.stringify(watchlistTemp)
					);

					window.location.reload();
				}
			}
		}
	}
}
