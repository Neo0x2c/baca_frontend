# baca_app


## Develop with local canisters
By default, this will directly use the canister address in public main net.
Follow this step to use local canisters.

1. Follow the steps in https://github.com/bacamedium/baca_ic to install all three canisters locally and Internet-Identity locally as well.
2. Copy the corresponding canister ids and replace them int `local_canister_ids.json`
3. Change "dfx_network" to "local" in vue.config.js.

## Tip for updating canister auto-generated javascripts
As the canister's auto-generated javascript gets canistesr id from environment varaibles and VUE only allowed environemnt variables with VUE_APP_ prefix, changes needs to be done in the index.js file for each canister.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
