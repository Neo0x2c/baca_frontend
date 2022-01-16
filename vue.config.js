const path = require("path");
let localCanisters, prodCanisters, canisters;


function initCanisterIds() {
	try {
		prodCanisters = require(path.resolve("product_canister_ids.json"));
	} catch (error) {
		console.log("No production canister_ids.json found. Continuing with local");
	}

	try {
		localCanisters = require(path.resolve("canister_ids.json"));
	} catch (error) {
		console.log("No local canister_ids.json found. Continuing production");
	}

	const network =
		process.env.DFX_NETWORK ||
		(process.env.NODE_ENV === "production" ? "ic" : "local");

	canisters = network === "local" ? localCanisters : prodCanisters;

	for (const canister in canisters) {
		process.env["VUE_APP_" + canister.toUpperCase() + "_CANISTER_ID"] =
			canisters[canister][network];
	}
}
initCanisterIds();

module.exports = {
	lintOnSave: false,
	transpileDependencies: [
		'@dfinity/*',
	]
}