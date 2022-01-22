const path = require("path");
let localCanisters, prodCanisters, canisters;

// const dfx_network = "local"
const dfx_network = "ic"

function initCanisterIds() {
	try {
		prodCanisters = require(path.resolve("product_canister_ids.json"));
	} catch (error) {
		console.log("No production canister_ids.json found. Continuing with local");
	}

	try {
		localCanisters = require(path.resolve("local_canister_ids.json"));
	} catch (error) {
		console.log("No local canister_ids.json found. Continuing production");
	}

	canisters = dfx_network === "local" ? localCanisters : prodCanisters;

	for (const canister in canisters) {
		process.env["VUE_APP_" + canister.toUpperCase() + "_CANISTER_ID"] =
			canisters[canister][dfx_network];
	}
	process.env["VUE_APP_NETWORK"] = dfx_network
}

initCanisterIds();

module.exports = {
	lintOnSave: false,
	transpileDependencies: [
		'@dfinity/*',
	]
}