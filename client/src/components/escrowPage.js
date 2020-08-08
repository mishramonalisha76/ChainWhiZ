import React from "react"
import {
  Button,
  IconButton,
  Icon,
  Grid,
  TextField
} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from "react-router-dom";
import Footer from "./footer";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import contB from "../js/escrow";
import B from "../js/BAbi"
import chainWizImage from "./BG2.png";
const Babi=B.abi;//

const chainWiz = {
  backgroundImage: "url(" + chainWizImage + ")",
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}




  export default class EscrowPage extends React.Component{
    
        async componentWillMount()
        {
          contB[0].reward=this.props.location.state.data.dappReward
            contB[0].dappAdd=this.props.location.state.dapp[0][0]
            contB[0].videolink=this.props.location.state.dapp[1].toString()
          
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
          console.log(this.props.location.state.data.dappReward)
          console.log(contB[0].videolink)
          console.log(contB[0].reward)
          
        return (
        <div style={{backgroundColor:"white"}}>
          <AppBar style={chainWiz} position="static">
            <Toolbar variant="dense">
        <Typography style={{ flex: 1 }} variant="h6" color="inherit">
                Publisher Escrow Dashboard
          </Typography>
          </Toolbar>

</AppBar>
<br></br><br></br><br></br>
        <Typography style={{ flex: 1 }} variant="h5"><span style={{fontWeight:"bold" }}>Dapp Owner Address:</span>{contB[0].dappAdd}</Typography>
        <br></br><br></br>
        <Typography style={{ flex: 1 }} variant="h5"><span style={{fontWeight:"bold" }}>Balance in Contract:</span>{this.state.balance}</Typography>
        <br></br><br></br>
        <Button color="primary" variant="outlined" size="medium" style={{marginRight:"10px"}}onClick={async ()=>{ await contB[0].deployContB(); await this.setStateAll(); }} disabled={this.state.status>=1}>Initiate escrow</Button>
        <Button color="primary" variant="outlined" size="medium" style={{marginRight:"10px"}}onClick={async()=>{await contB[0].confirmOwnership();await this.setStateAll;}} disabled={this.state.status>=2}>Ownership Transfer</Button>
        <Button color="primary" variant="outlined" size="medium"onClick={async()=>{await contB[0].confirmDelivery();await this.setStateAll;}} disabled={this.state.status==3}>Confirm Payment</Button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Footer />
        </div>
        )
    }
    
}

