

//Write your own contracts here. Currently compiles using solc v0.4.15+commit.bbb8e64f.
pragma solidity >=0.4.22 <=0.7.0;
pragma experimental ABIEncoderV2;
contract IPFS {
   
   
   struct quesContractDetails{
         string ipfshash;
         address publisher;
         uint256 contractReward;
         uint256 dappReward;
         uint256 timeStart;
         uint256 timeEnd;
         uint256 dappTimeEnd;
         string date;
         address resSolver;
         string resSolutionLink;
         string resSolutionLinkReadMe;
         
         string approveDapp;
         address approveDappSolver;
         bool contractLabel;
         bool dappLabel;
         string typeSol;
       
      
        
         }
  
    

     struct quessmartContract{
            address[] solver;
            string[] solutionLink;
            string[] readMe;
            uint256[] votePercent;
            
        }

     struct quesDapp{
        address[] dappSolver;
        string[] dappHash;
          

      }

    struct solLink{
           
           address[] agree;
           address[] disagree;
          
            }
    struct dappProfile{
        string ipfshash;
        
        string videoLink;
        address pub;
        uint256 dappreward;
        
    }



mapping(address=>mapping(string=>quesContractDetails[]))publisherContractProfile;

quesContractDetails[] quesContract;


mapping(address => dappProfile[])dappProfileDisplay;
mapping(string =>uint256) contractDetailsIndex;


mapping(string => quessmartContract) quesSolDetails;
mapping(string => quesDapp) quesdappSolDetails;
   
mapping(string => solLink)solutionList;
mapping(string => mapping(address => bool)) voted;

mapping(string => mapping(string =>uint256)) solIndex;

mapping(address=>mapping(string=>string))pubQuesIndex;
mapping(string => mapping(string=>uint256) )index;
mapping(string => uint256) maxVotedIndex;



//publisher upload question 

 function publisherUploadQues(string memory questionIpfs,uint256 quesReward,uint256 quesDappReward,string memory dateTime,uint256 start,uint256 end,string memory typeOfQues, uint256 dappTime) public{
              
         contractDetailsIndex[questionIpfs]=quesContract.length;
         pubQuesIndex[msg.sender][typeOfQues]=questionIpfs;
         index[typeOfQues][questionIpfs]=publisherContractProfile[msg.sender][typeOfQues].length;

         quesContract.push(quesContractDetails({
           ipfshash:questionIpfs,
           publisher:msg.sender,
           contractReward:quesReward,
           timeStart:start,
           timeEnd:end,
           date:dateTime,
           resSolver:address(0),
           resSolutionLink:"",
           resSolutionLinkReadMe:"",
           approveDapp:"",
           approveDappSolver:address(0),
          contractLabel:true,
            dappLabel:false,
           typeSol:typeOfQues,
           dappTimeEnd:dappTime,
           dappReward:quesDappReward
       
           


           }));

           
         publisherContractProfile[msg.sender][typeOfQues].push(quesContract[contractDetailsIndex[questionIpfs]]);
         if((keccak256(bytes(typeOfQues)) == keccak256(bytes("dapp"))))
         {
             publisherContractProfile[msg.sender]["smart contract"].push(quesContract[contractDetailsIndex[questionIpfs]]);
         }
          
  
    }
      
      
      //returning publisher's all questions
      function getAllContract(string memory typeOfQues)public view returns(quesContractDetails[] memory){
          
          return publisherContractProfile[msg.sender][typeOfQues];
      }
      

//returning question lists for question card
function questions() public view returns(quesContractDetails[] memory){

   return quesContract;
    
    }


//push dapp solution

function pushDapp(string memory quesHash,string memory dapp,uint256 reward,address publisher) public
{
    
      quesdappSolDetails[quesHash].dappHash.push(dapp);
      quesdappSolDetails[quesHash].dappSolver.push(msg.sender);
      dappProfileDisplay[msg.sender].push(dappProfile({
          ipfshash:quesHash,
          videoLink:dapp,
          dappreward:reward,
          pub:publisher
      })
          );
        
    
}
//returning for dapp dappProfile
function returnDappProfile() public view returns(dappProfile[] memory){

   return   dappProfileDisplay[msg.sender];
    
    }
    


//returning dapp solution lists
function dappSol(string memory quesHash) public view returns(quesDapp memory){

   return   quesdappSolDetails[quesHash];
    
    }
    
    

//solver uploading solutions 

function pushSolution(string memory quesHash,string memory sol,string memory readMeHash) public{

  solIndex[quesHash][sol]= quesSolDetails[quesHash].solver.length;
  quesSolDetails[quesHash].solver.push(msg.sender);
  quesSolDetails[quesHash].solutionLink.push(sol);
  quesSolDetails[quesHash].readMe.push(readMeHash);
  quesSolDetails[quesHash].votePercent.push(0);
  

}



//agree button

 function agree(string memory sol,string memory quesHash) public 
    {
         require(!voted[sol][msg.sender]);
         solutionList[sol].agree.push(msg.sender);
         voted[sol][msg.sender]=true;
         uint256 percent;
         uint256 x=solutionList[sol].agree.length;
         uint256 y=solutionList[sol].disagree.length;
         uint256 denominator=x+y;
         if(denominator==0)
           percent= 0;
        else{
        uint256 numerator = x*100;
        percent= numerator/denominator;
        }
        quesSolDetails[quesHash].votePercent[solIndex[quesHash][sol]]=percent;
        if(quesSolDetails[quesHash].votePercent[maxVotedIndex[quesHash]]<percent)
          {
              maxVotedIndex[quesHash]=solIndex[quesHash][sol];
          }
       
  
        
    }
    

  //disagree button

    function disagree(string memory sol,string memory quesHash) public 
    {
        require(!voted[sol][msg.sender]);
        solutionList[sol].disagree.push(msg.sender);
        voted[sol][msg.sender]=true;
        uint256 percent;
         uint256 x=solutionList[sol].agree.length;
         uint256 y=solutionList[sol].disagree.length;
         uint256 denominator=x+y;
         if(denominator==0)
           percent= 0;
        else{
        uint256 numerator = x*100;
        percent= numerator/denominator;
        }
        quesSolDetails[quesHash].votePercent[solIndex[quesHash][sol]]=percent;
        if(quesSolDetails[quesHash].votePercent[maxVotedIndex[quesHash]]<percent)
          {
              maxVotedIndex[quesHash]=solIndex[quesHash][sol];
          }
       
       
        
    }
    
    
//return details of max voted solution
 function maxVotedSol(string memory quesHash)public view returns (address, string memory, string memory, uint256){
         
        return(quesSolDetails[quesHash].solver[maxVotedIndex[quesHash]],quesSolDetails[quesHash].solutionLink[maxVotedIndex[quesHash]],quesSolDetails[quesHash].readMe[maxVotedIndex[quesHash]],quesSolDetails[quesHash].votePercent[maxVotedIndex[quesHash]]);

}


//set result

  function setContractResult(string memory quesHash,string memory typeOfQues,address solver,string memory solutionLink,string memory readMe,address pub) public 
    {
       
       
       uint256 pos=contractDetailsIndex[quesHash];
       quesContract[pos].contractLabel=false;
       quesContract[pos].resSolver=solver;
       quesContract[pos].resSolutionLink=solutionLink;
       quesContract[pos].resSolutionLinkReadMe=readMe;
       
     publisherContractProfile[pub][typeOfQues][index[typeOfQues][pubQuesIndex[pub][typeOfQues]]].contractLabel=false;
     publisherContractProfile[pub][typeOfQues][index[typeOfQues][pubQuesIndex[pub][typeOfQues]]].resSolver=solver;
     publisherContractProfile[pub][typeOfQues][index[typeOfQues][pubQuesIndex[pub][typeOfQues]]].resSolutionLink=solutionLink;
     publisherContractProfile[pub][typeOfQues][index[typeOfQues][pubQuesIndex[pub][typeOfQues]]].resSolutionLinkReadMe=readMe;

    if(keccak256(bytes(typeOfQues)) == keccak256(bytes("dapp")))
            publisherContractProfile[pub][typeOfQues][index[typeOfQues][pubQuesIndex[pub][typeOfQues]]].dappLabel=true;
       
        
    }

//set result for dapp

function setContractDapp(string memory quesHash,string memory dapp,address solver,string memory typeOfQues,address pub,string memory solutionLink) public
{
       uint256 pos=contractDetailsIndex[quesHash];
       quesContract[pos].dappLabel=false;
       quesContract[pos].approveDappSolver=solver;
       quesContract[pos].approveDapp=solutionLink;
       
     
     publisherContractProfile[pub][typeOfQues][index[typeOfQues][pubQuesIndex[pub][typeOfQues]]].approveDappSolver=solver;
     publisherContractProfile[pub][typeOfQues][index[typeOfQues][pubQuesIndex[pub][typeOfQues]]].approveDapp=dapp;
     publisherContractProfile[pub][typeOfQues][index[typeOfQues][pubQuesIndex[pub][typeOfQues]]].dappLabel=false;


}



    
function publisherContractSol(string memory quesHash) public view returns(quessmartContract memory){
return quesSolDetails[quesHash];

}


}






