export const ipfsABI = 
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
					"name": "questionIpfs",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "quesReward",
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
							"internalType": "bool",
							"name": "label",
							"type": "bool"
						},
						{
							"internalType": "string",
							"name": "split",
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
		}
	]