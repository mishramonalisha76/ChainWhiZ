export const dappABI =
[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "quesHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "quesReward",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "start",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "end",
				"type": "uint256"
			}
		],
		"name": "publisherUploadDapp",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "quesHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dapp",
				"type": "string"
			}
		],
		"name": "pushDapp",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "quesHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dapp",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "solver",
				"type": "address"
			}
		],
		"name": "pushResDapp",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "quesHash",
				"type": "string"
			}
		],
		"name": "questions",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address[]",
						"name": "dappSolver",
						"type": "address[]"
					},
					{
						"internalType": "string[]",
						"name": "dappHash",
						"type": "string[]"
					},
					{
						"internalType": "address",
						"name": "publisher",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "reward",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timeStart",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timeEnd",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "label",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "approveDapp",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "approveDappSolver",
						"type": "address"
					}
				],
				"internalType": "struct IPFS.dappIPFS",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]