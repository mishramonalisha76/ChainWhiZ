import Web3 from "web3";
import { rolesABI } from "./roles";


export default async function regPublisherVerify() {
let output=null
 
 async function loadWeb3() {
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

   async function getAccount (){
    let account= await window.web3.eth.getAccounts((error, accounts) => {return accounts[0]})
    console.log(account)
    let balance = await window.web3.eth.getBalance(account[0]);
    balance=window.web3.utils.fromWei(balance, 'ether')
 
    return {account:account,balance:balance};
    
 }

 loadWeb3();

const amt = window.web3.utils.toWei('0.005','ether')
 const contractAddress = "0xa0c8870b4234a70da1892074179c50861c824b0e";
 const contract = new window.web3.eth.Contract(rolesABI, contractAddress);

 async function regPub()
 {
    let trnOutput=null;
    
    const {account,balance} = await  getAccount();
    
    if(balance<1)
    {
        console.log("Insufficient balance")
    }
    else
    {
        console.log(amt)
        console.log(account)
        
        await window.web3.eth.sendTransaction({to:'0xD6aaCEd767524B1CAc368EC732dB37EC9dB268dB',from:account[0],value:amt},(error,result)=>{if(error) 
            trnOutput=false
        else 
            trnOutput = true})
        
            console.log (trnOutput)

        if  (trnOutput)
        {
            await contract.methods.addPublisher().send({ from: account[0] ,chainId: 3})
            output = await contract.methods.verifyPublisher().call({ from: account[0] ,chainId: 3});
            console.log(output)
        }

    }

 }
await regPub()

return output
}