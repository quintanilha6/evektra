const Evektra = artifacts.require('Evektra');

// This tests will only work against a ganache-cli mainnet fork
contract('Evektra', (accounts) => {

    const DAI_ADDRESS_MAINNET = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
    const DAI_ABI = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "chainId_",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "src",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "guy",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": true,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes4",
                    "name": "sig",
                    "type": "bytes4"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "usr",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "arg1",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "arg2",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "LogNote",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "src",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "dst",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "DOMAIN_SEPARATOR",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "PERMIT_TYPEHASH",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "usr",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "usr",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "burn",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "guy",
                    "type": "address"
                }
            ],
            "name": "deny",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "usr",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "src",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "dst",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "move",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "nonces",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "holder",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "expiry",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "allowed",
                    "type": "bool"
                },
                {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                },
                {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                }
            ],
            "name": "permit",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "usr",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "pull",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "usr",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "push",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "guy",
                    "type": "address"
                }
            ],
            "name": "rely",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "dst",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "src",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "dst",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "version",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "wards",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]
    const ADDRESS_WITH_DAI = '0x66c57bF505A85A74609D2C83E94Aabb26d691E1F'
    const DEPLOYER = accounts[0]
    const RANDOM_ADDRESS_TO_TEST = accounts[2]

    const DAI_CONTRACT = new web3.eth.Contract(DAI_ABI, DAI_ADDRESS_MAINNET)
    const AMOUNT_TO_SEND_ON_TESTS = web3.utils.toWei('1', 'ether')
    const AMOUNT_TO_SEND_ON_TESTS_SMALL = web3.utils.toWei('0.3', 'ether')
    const AMOUNT_TO_SEND_ON_TESTS_SMALLEST = web3.utils.toWei('0.1', 'ether')

    let evektra = null;

    before(async() => {
        evektra = await Evektra.deployed();
    })

    it('Contract is compiled + deployed', async () => {
        assert(evektra != null)
    })

    it('Check owner match with accounts @ 0 (ganache-cli)', async () => {
        const owner = await evektra.owner()
        assert.equal(DEPLOYER, owner)
    })

    it('Check that address of DAI from mainnet matches with staged', async () => {
        const daiAddress = await evektra.DAI_SC()

        assert.equal(DAI_ADDRESS_MAINNET, daiAddress)
    })

    it('Send 1 DAI to Evektra', async () => {

        await transferDaiToEvektra(AMOUNT_TO_SEND_ON_TESTS);

        let evektra_dai_balance = await DAI_CONTRACT.methods.balanceOf(evektra.address).call()
        assert.equal(AMOUNT_TO_SEND_ON_TESTS, evektra_dai_balance)
    })

    it('Updates funds map in Evektra SC after deposit of DAI', async () => {

        // Replacing Transak functionality
        await transferDaiToEvektra(AMOUNT_TO_SEND_ON_TESTS);

        // Updates Evektra funds mapping
        await updateDaiFundsMap(evektra.address, AMOUNT_TO_SEND_ON_TESTS);

        let balanceOfEvektra = await evektra.balanceOf(evektra.address)

        assert.equal(AMOUNT_TO_SEND_ON_TESTS, balanceOfEvektra)
    })

    it('Sends 0.3 DAI from evektra to a random address (map update)', async () => {
        await evektraTransfer(evektra.address, RANDOM_ADDRESS_TO_TEST, AMOUNT_TO_SEND_ON_TESTS_SMALL)
        let balanceOfRandomAddress = await evektra.balanceOf(RANDOM_ADDRESS_TO_TEST)
        let balanceOfEvektra = await evektra.balanceOf(evektra.address)


        assert.equal(AMOUNT_TO_SEND_ON_TESTS_SMALL, balanceOfRandomAddress)
        assert.equal(AMOUNT_TO_SEND_ON_TESTS-AMOUNT_TO_SEND_ON_TESTS_SMALL, balanceOfEvektra)

    })

    it('Sends 0.1 DAI from a random address to evektra (map update)', async () => {
        await txToEvektra(RANDOM_ADDRESS_TO_TEST, AMOUNT_TO_SEND_ON_TESTS_SMALLEST)

        let balanceOfRandomAddress = await evektra.balanceOf(RANDOM_ADDRESS_TO_TEST)
        let balanceOfEvektra = await evektra.balanceOf(evektra.address)

        assert.equal(AMOUNT_TO_SEND_ON_TESTS_SMALL-AMOUNT_TO_SEND_ON_TESTS_SMALLEST, balanceOfRandomAddress)
        assert.equal(web3.utils.toWei('0.8', 'ether'), balanceOfEvektra)

    })


    async function transferDaiToEvektra(wad){
        await DAI_CONTRACT.methods.transfer(evektra.address, wad).send({
            from: ADDRESS_WITH_DAI
        })
    }

    async function updateDaiFundsMap(addr, wad){
        await evektra.daiDeposit(addr, wad, {from: DEPLOYER})
    }

    async function evektraTransfer(from, to, wad){
        await evektra.transfer(from, to, wad, {from: DEPLOYER})
    }

    async function txToEvektra(from, wad){
        await evektra.transferToEvektra(from, wad, {from: DEPLOYER})
    }
})

