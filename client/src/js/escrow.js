
import Web3 from "web3";
import Eabi from "./recordEscrow"
import B from "./BAbi"
const EthereumTx = require('ethereumjs-tx').Transaction;
const Babi=B.abi;//include the abi code of the contract you want to deploy through web3
const Bbyte=B.byte;//inlcude the bytecode of the contract you want to deploy

//window.web3 = new Web3('http://localhost:8545')

async function loadWeb3()
   {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      window.ethereum.autoRefreshOnNetworkChange = false;
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      window.ethereum.autoRefreshOnNetworkChange = false;
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
   
   }
   loadWeb3()
   const contractAAddress="0xccb39da064b015e112992fafcecad314c4ac6073"
   const contractA = new window.web3.eth.Contract(Eabi,contractAAddress)

 let contB=[
   {
    dappAdd:"",
   contractBAddress:null,//address of B
   contractB:null,//for calling functions
   contractBBalance:null,
   reward:null,
   videolink:null,

   
   getAccount: async function(){
    let account= await window.web3.eth.getAccounts((error, accounts) => {return accounts[0]})
    //console.log(account[0])
    let balance = await window.web3.eth.getBalance(account[0]);
    balance=window.web3.utils.fromWei(balance, 'ether')
    //console.log(balance)
    return {account:account[0],balance:balance};
    

   },
   getBalance: async function(){
    let balance=await window.web3.eth.getBalance(contB[0].contractBAddress)
    console.log(balance)
    return balance
  },

  deployContB:async function()
 {
   await loadWeb3();
   let {account,balance}=await contB[0].getAccount();
   
  let deploy_contract = new window.web3.eth.Contract(JSON.parse(Babi));
  let payload = {
    data: Bbyte,
    arguments:[contB[0].dappAdd]//specify the arguments if you have constructor
  }
  

  let parameter = {
    from: account,
    gas: window.web3.utils.toHex(800000),
    gasPrice: window.web3.utils.toHex(window.web3.utils.toWei('30', 'gwei')),
    value:contB[0].reward
  }
  
  await deploy_contract.deploy(payload).send(parameter, (err, transactionHash) => {
    console.log('Transaction Hash :', transactionHash);
  }).on('confirmation', () => {}).then((newContractInstance) => {
    console.log('Deployed Contract Address : ', newContractInstance.options.address);
    
    contB[0].contractBAddress=newContractInstance.options.address;
  })
  console.log(contractA)
  await contractA.methods.pushContractAddress(contB[0].videolink,contB[0].contractBAddress,account,contB[0].dappAdd,2).send({from:account,gas:120000})

  contB[0].contractB=new window.web3.eth.Contract(JSON.parse(Babi), contB[0].contractBAddress);
  console.log(contB[0].contractB)
  console.log(contB[0].contractBAddress)
  console.log(await contB[0].getStatus());
  return await contB[0].getStatus()
  // return res
  
 },

 confirmOwnership:async function()
 {
  contB[0].contractB=new window.web3.eth.Contract(JSON.parse(Babi), contB[0].contractBAddress);
  console.log(await contB[0].getStatus());
   let {account,balance}=await contB[0].getAccount();
    await contB[0].contractB.methods.confirmOwnershipTransfer().send({from: contB[0].dappAdd})
 console.log("Confirmed Ownership Transfered")
 console.log(await contB[0].getStatus());
 console.log(await contB[0].getBalance())
 return await contB[0].getStatus()
 },
 confirmDelivery: async function()
 {
  contB[0].contractB=new window.web3.eth.Contract(JSON.parse(Babi), contB[0].contractBAddress);
  console.log(await contB[0].getStatus());
  let {account,balance}=await contB[0].getAccount();
  await contB[0].contractB.methods.confirmDelivery().send({from:account})
  console.log("Confirmed delivery")
  console.log(await contB[0].getStatus());
  return await contB[0].getStatus()
 },
getStatus:async function(){
  contB[0].contractB=new window.web3.eth.Contract(JSON.parse(Babi), contB[0].contractBAddress);
  return await contB[0].contractB.methods.currState().call()
},

sendContractAddress: async function(hash)
{
  contB[0].contractB=new window.web3.eth.Contract(JSON.parse(Babi), contB[0].contractBAddress);
  let k= await contractA.methods.sendContractAddress(hash).call()
  console.log("from escrow")
  console.log(k.con)
  return k.con;
}

},

 
 ]

export default contB




