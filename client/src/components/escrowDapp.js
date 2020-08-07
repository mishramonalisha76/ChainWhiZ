import React from "react"
import contB from "../js/escrow";
import B from "../js/BAbi"
const Babi=B.abi;//




  export default class EscrowDappPage extends React.Component{
    
        async componentWillMount()
        {
          contB[0].reward=this.props.location.state.data.dappreward
            contB[0].dappAdd=this.props.location.state.address
            contB[0].videolink=this.props.location.state.data.videoLink.toString()
          
          contB[0].contractBAddress= await contB[0].sendContractAddress(contB[0].videolink)
          console.log(contB[0].contractBAddress)
            
            if(contB[0].contractBAddress!=null)
            {
              await this.setStateAll();
              }
            

            
           
        }
    async  setStateAll()
    {
        console.log("function")
        const stat =  await contB[0].getStatus()
        const bal = await contB[0].getBalance()

        this.setState({
          status:stat,
          balance:bal 
       })
       console.log(this.state.status)
       console.log(this.state.balance)
       console.log("hello")
    }
        
       
           constructor(props) {
            
                super(props);
                this.state = {
                 status: 0,
                 balance :0,
                 
                }
              }

             
             
      render(){
          
          
        return (
        <>
        <h1>Escrow Contract Live Deploy</h1>
        <h2>Dapp Owner Address:{contB[0].dappAdd}</h2>
        <p>{this.state.balance}</p>
       
        <button onClick={async ()=>{ await contB[0].deployContB(); await this.setStateAll(); console.log(await contB[0].getStatus()); console.log(this.state.status)}} disabled={this.state.status>=1}>Initiate escrow</button>
        <button onClick={async()=>{await contB[0].confirmOwnership();await this.setStateAll;console.log(await contB[0].getStatus()); console.log(this.state.status)}} disabled={this.state.status>=2}>Ownership Transfer</button>
        <button onClick={async()=>{await contB[0].confirmDelivery();await this.setStateAll;console.log(await contB[0].getStatus()); console.log(this.state.status)}} disabled={this.state.status==3}>Confirm Payment</button>
        </>
        )
    }
    
}

