export default  [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "hash",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "escrowCon",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "pub",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "quesReward",
          "type": "uint256"
        }
      ],
      "name": "pushContractAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "hash",
          "type": "string"
        }
      ],
      "name": "sendContractAddress",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "con",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "publisher",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "dapp",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "reward",
              "type": "uint256"
            }
          ],
          "internalType": "struct A.escrowContract",
          "name": "",
          "type": "tuple"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]