//Write your own contracts here. Currently compiles using solc v0.4.15+commit.bbb8e64f.
pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;
contract IPFS {
       struct dappIPFS{
        address[] dappSolver;
        string[] dappHash;
          
         address publisher;
         uint256 reward;
         uint256 timeStart;
         uint256 timeEnd;
      
         bool label;
         string approveDapp;
         address approveDappSolver;
   }
        
        


mapping(string => dappIPFS) dappSolDetails;
mapping(string => bool) hasDapp;

//publisher upload question 

 function publisherUploadDapp(string memory quesHash,uint256 quesReward,uint256 start,uint256 end) public{
              
              
        dappSolDetails[quesHash].publisher=msg.sender;
        dappSolDetails[quesHash].reward=quesReward;
        dappSolDetails[quesHash].timeStart=start;
        dappSolDetails[quesHash].timeEnd=end;
        dappSolDetails[quesHash].label=true;
        dappSolDetails[quesHash].approveDapp="";
        dappSolDetails[quesHash].approveDappSolver=address(0);
        dappSolDetails[quesHash].dappHash=new string[](0);
        dappSolDetails[quesHash].dappSolver=new address[](0);
        
        
        hasDapp[quesHash]=true;
             
      }

//push dapp

function pushDapp(string memory quesHash,string memory dapp) public
{
    
     dappSolDetails[quesHash].dappHash.push(dapp);
     dappSolDetails[quesHash].dappSolver.push(msg.sender);
        
    
}

//set result

function pushResDapp(string memory quesHash,string memory dapp,address solver) public
{
      dappSolDetails[quesHash].approveDapp=dapp;
        dappSolDetails[quesHash].approveDappSolver=solver;
}



//returning dapp lists for publisher profile
function questions(string memory quesHash) public view returns(dappIPFS memory){

   return dappSolDetails[quesHash];
    
    }
    
    

} 