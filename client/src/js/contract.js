export const contractABI =
[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "sol",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "quesHash",
				"type": "string"
			}
		],
		"name": "agree",
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
		"name": "dappSol",
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
					}
				],
				"internalType": "struct IPFS.quesDapp",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "sol",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "quesHash",
				"type": "string"
			}
		],
		"name": "disagree",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "typeOfQues",
				"type": "string"
			}
		],
		"name": "getAllContract",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "ipfshash",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "publisher",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "contractReward",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "dappReward",
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
						"internalType": "uint256",
						"name": "dappTimeEnd",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "resSolver",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "resSolutionLink",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "resSolutionLinkReadMe",
						"type": "string"
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
					},
					{
						"internalType": "bool",
						"name": "contractLabel",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "dappLabel",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "typeSol",
						"type": "string"
					}
				],
				"internalType": "struct IPFS.quesContractDetails[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
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
		"name": "maxVotedSol",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
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
		"name": "publisherContractSol",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address[]",
						"name": "solver",
						"type": "address[]"
					},
					{
						"internalType": "string[]",
						"name": "solutionLink",
						"type": "string[]"
					},
					{
						"internalType": "string[]",
						"name": "readMe",
						"type": "string[]"
					},
					{
						"internalType": "uint256[]",
						"name": "votePercent",
						"type": "uint256[]"
					}
				],
				"internalType": "struct IPFS.quessmartContract",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "questionIpfs",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "quesReward",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quesDappReward",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "dateTime",
				"type": "string"
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
			},
			{
				"internalType": "string",
				"name": "typeOfQues",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "dappTime",
				"type": "uint256"
			}
		],
		"name": "publisherUploadQues",
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
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "publisher",
				"type": "address"
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
				"name": "sol",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "readMeHash",
				"type": "string"
			}
		],
		"name": "pushSolution",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "questions",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "ipfshash",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "publisher",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "contractReward",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "dappReward",
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
						"internalType": "uint256",
						"name": "dappTimeEnd",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "resSolver",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "resSolutionLink",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "resSolutionLinkReadMe",
						"type": "string"
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
					},
					{
						"internalType": "bool",
						"name": "contractLabel",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "dappLabel",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "typeSol",
						"type": "string"
					}
				],
				"internalType": "struct IPFS.quesContractDetails[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "returnDappProfile",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "ipfshash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "videoLink",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "pub",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "dappreward",
						"type": "uint256"
					}
				],
				"internalType": "struct IPFS.dappProfile[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
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
			},
			{
				"internalType": "string",
				"name": "typeOfQues",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "pub",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "solutionLink",
				"type": "string"
			}
		],
		"name": "setContractDapp",
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
				"name": "typeOfQues",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "solver",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "solutionLink",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "readMe",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "pub",
				"type": "address"
			}
		],
		"name": "setContractResult",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]