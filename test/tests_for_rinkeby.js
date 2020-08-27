const Evektra_rinkeby = artifacts.require('Evektra_rinkeby');

contract('Evektra_rinkeby', (accounts) => {

    const DAI_ADDRESS_RINKEBY = '0xEE3cf07DFA5c99C859533F0E61676a990BdFbB1d'
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
    const ADDRESS_WITH_DAI = accounts[0]
    const DEPLOYER = accounts[0]
    const RANDOM_ADDRESS_TO_TEST = accounts[2]

    const DAI_CONTRACT = new web3.eth.Contract(DAI_ABI, DAI_ADDRESS_RINKEBY)
    const AMOUNT_TO_SEND_ON_TESTS = web3.utils.toWei('0.5', 'ether')
    const AMOUNT_TO_SEND_ON_TESTS_SMALL = web3.utils.toWei('0.03', 'ether')
    const AMOUNT_TO_SEND_ON_TESTS_SMALLEST = web3.utils.toWei('0.01', 'ether')

    let evektra = null;

    before(async() => {
        evektra = await Evektra_rinkeby.deployed();
    })

    it('Contract is compiled + deployed', async () => {
        assert(evektra != null)
    })

    it('Check owner match with accounts @ 0 ', async () => {
        const isOwner = await evektra.owners(DEPLOYER)
        assert.isTrue(isOwner)
    })

    it('Check that address of DAI from Rinkeby matches with staged', async () => {
        const daiAddress = await evektra.DAI_SC()

        assert.equal(DAI_ADDRESS_RINKEBY, daiAddress)
    })

    it('Send 0.5 DAI to Evektra', async () => {

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

    it('Sends 0.03 dai from evektra to a random address (map update)', async () => {
        await evektraTransfer(evektra.address, RANDOM_ADDRESS_TO_TEST, AMOUNT_TO_SEND_ON_TESTS_SMALL)
        let balanceOfRandomAddress = await evektra.balanceOf(RANDOM_ADDRESS_TO_TEST)
        let balanceOfEvektra = await evektra.balanceOf(evektra.address)


        assert.equal(AMOUNT_TO_SEND_ON_TESTS_SMALL, balanceOfRandomAddress)
        assert.equal(AMOUNT_TO_SEND_ON_TESTS-AMOUNT_TO_SEND_ON_TESTS_SMALL, balanceOfEvektra)

    })

    it('Sends 0.01 dai from a random address to evektra (map update)', async () => {
        await txToEvektra(RANDOM_ADDRESS_TO_TEST, AMOUNT_TO_SEND_ON_TESTS_SMALLEST)

        let balanceOfRandomAddress = await evektra.balanceOf(RANDOM_ADDRESS_TO_TEST)

        assert.equal(AMOUNT_TO_SEND_ON_TESTS_SMALL-AMOUNT_TO_SEND_ON_TESTS_SMALLEST, balanceOfRandomAddress)
    })

    it('Adds ownership to another address', async () => {
        await addOwnership(accounts[4])

        let isOwner = await evektra.owners(accounts[4])

        assert.isTrue(isOwner)
    })

    it('Transfer ownership to another address', async () => {
        await transferOwnership(RANDOM_ADDRESS_TO_TEST)

        let isNotOwner = await evektra.owners(DEPLOYER)
        let isOwner = await evektra.owners(RANDOM_ADDRESS_TO_TEST)

        assert.isFalse(isNotOwner)
        assert.isTrue(isOwner)
    })

    it('Renounce ownership', async () => {
        await renounceOwnership()

        let isOwner = await evektra.owners(RANDOM_ADDRESS_TO_TEST)

        assert.isFalse(isOwner)
    })

    // This only works because we unlock the ADDRESS_WITH_DAI acount when running the network
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

    async function addOwnership(newOwner){
        await evektra.addOwnership(newOwner, {from: DEPLOYER})
    }

    async function renounceOwnership(){
        await evektra.renounceOwnership({from: RANDOM_ADDRESS_TO_TEST})
    }

    async function transferOwnership(newOwner){
        await evektra.transferOwnership(newOwner, {from: DEPLOYER})
    }
})

