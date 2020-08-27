# Evektra smart-contract

This repository holds every resource of Evektra's smart contracts. Project bootstraped with [truffle suit](https://www.trufflesuite.com/).

### Dependencies
Intall project dependencies with `npm install`

| Dependency | Version |
| ------ | ------ |
| [truffle](https://www.npmjs.com/package/truffle) | 5.1.41 |
| [web3](https://www.npmjs.com/package/web3) | 1.2.11 |
| [@truffle/hdwallet-provider](https://www.npmjs.com/package/@truffle/hdwallet-provider) | 5.0.7 |
| [ganache-cli](https://www.npmjs.com/package/ganache-cli) | 6.10.1 |

### Networks configuration
| Network | Provider |
| ------ | ------ |
| development (default) | ganache-cli @ 127.0.0.1:8545  |
| rinkeby | [infura](https://infura.io/) endpoint |

To run the development Blockchain run (by default, ganache-cli runs @ 127.0.0.1:8545):
`$ ganache-cli -f https://mainnet.infura.io/v3/<API_KEY> -m <MNEMONIC_PHRASE> -u <ACCOUNT_TO_UNLOCK>`

- `f`/`--fork` -  Fork from another currently running Ethereum client at a given block. Input should be the HTTP/HTTPS location and port of the other client, e.g. 'http://localhost:8545' or optionally provide a block number 'http://localhost:8545@1599200'
- `-m`/`--mnemonic` - Bip39 mnemonic phrase for generating a PRNG seed, which is in turn used for hierarchical deterministic (HD) account generation
- `-u`/`--unlock` - Comma-separated list of accounts or indices to unlock

Example:
`$ ganache-cli -f https://mainnet.infura.io/v3/73da23cca49949919a2f69b1191a5042 -m 'erosion fury abandon husband also pond noodle cable nurse bus legend nephew' -u 0x66c57bF505A85A74609D2C83E94Aabb26d691E1F`

In this example, we unlock an account that, at this date (19/08/2020) owns enough DAI to test functionalities.
Rinkeby network uses an [infura](https://infura.io/) endpoint, so we don't have to run any client.

### Contracts
Main Contracts are `Evektra` and `Evektra_rinkeby`. All other Contracts are used/instanciated inside the main contracts.

Here is a UML case for the Contract's relationship.
![](public/smart-contracts.png)

`Evektra` and `Evektra_rinkeby` are the same, except their pointer to the DAI contract, because the DAI contract exists in different addresses depending on the their Network.

### Compile Contracts

To compile every contract run: `$ truffle compile`
This will generate/update an ABI, Bytecode and some other data for each contract inside of a `.json` file in `build` directory. Each contract compilation will generate a new build file with the same name.

### Migrations / Deployments
There are 2 main migrations: `2_evektra_sc_mainnet.js` and `3_evektra_sc_rinkeby.js`. As the name indicates, migration `2` is supose to be executed to Mainnet, while `3`, to Rinkeby. :warning: Make sure you dont execute `3_evektra_sc_rinkeby.js` in Mainnet-fork or `2_evektra_sc_mainnet.js` on Rinkeby... it won't behave properly (tests will also fail), because DAI contract pointer will be wrong :warning:

- If deploying to Mainnet or Mainnet-fork, make sure you are running a local development blockchain as explained in [networks configuration](#networks-configuration) and then run : `$ truffle migrate --network development --from 2 --to 2`

- If deploying to Rinkeby, run : `$ truffle migrate --network rinkeby --from 3 --to 3`

In order to be specific, `--from` and `--to` helps indicating which migrations to be executed. Once the deployment is completed, the build .json file for the contract will contain a field `address` this will show what address was the contract deployed to.

### Tests
Just like migrations, there must be diferent tests for Mainnet and Rinkeby.

- If running tests to Mainnet or Mainnet-fork, run: `$ truffle test test/tests_for_mainnet.js --network development`

- If running tests to Rinkeby, run: `$ truffle test test/tests_for_rinkeby.js --network rinkeby`

