

//Write your own contracts here. Currently compiles using solc v0.4.15+commit.bbb8e64f.
pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;
contract IPFS {
   
    
    struct Publisher{
          string[] ipfsQuestion;
       }
   struct quesContractDetails{
         string ipfshash;
         address publisher;
         uint256 reward;
         uint256 timeStart;
         uint256 timeEnd;
         string date;
         address resSolver;
         string resSolutionLink;
         string resSolutionLinkReadMe;
         bool label;
         string split;
                  
         }
  

     struct quesIPFS{
            address[] solver;
            string[] solutionLink;
            string[] readMe;
            uint256[] votePercent;
            
        }
     

    struct solLink{
           
           address[] agree;
           address[] disagree;
          
            }


    struct Solver{

            address solver;
            string[] solutionLink;
            string[] readMeIPFS;
            
      
        }

quesContractDetails[] quesContract;

mapping(string => quesIPFS) quesSolDetails;
mapping(string => solLink)solutionList;
mapping(string => mapping(address => bool)) voted;
mapping(string => mapping(string =>uint256)) solIndex;
mapping(string => uint256) maxVotedIndex;

//publisher upload question 

 function publisherUploadQues(string memory questionIpfs,uint256 quesReward,string memory dateTime,uint256 start,uint256 end) public{
              
              
         quesContract.push(quesContractDetails({
           ipfshash:questionIpfs,
           publisher:msg.sender,
           reward:quesReward,
           timeStart:start,
           timeEnd:end,
           date:dateTime,
           resSolver:address(0),
           resSolutionLink:"",
           resSolutionLinkReadMe:"",
           label:true,
           split:"#"


           }));
  
                

          

      }

//returning question lists for question card
function questions() public view returns(quesContractDetails[] memory){

   return quesContract;
    
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


}






