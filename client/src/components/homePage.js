import React from "react";
import Web3 from "web3";
import regPublisherVerify from "../js/regPublisher"
import regVoterVerify from "../js/regVoter"
import regSolverVerify from "../js/regSolver"
import regDapperVerify from "../js/regDapper"
import fleekStorage from '@fleekhq/fleek-storage-js'
import { contractABI } from "../js/contract";
import { rolesABI } from "../js/roles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link } from "react-router-dom";
// import transTok from "../js/transToken";

import {
  Button,
  IconButton,
  Icon,
  Grid,
  MenuItem,
  TextField
} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import QuestionsCard from "./questionCard";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Loader from "./loader";
import SnackBar from "./snackbar";
import Footer from "./footer";
import PostPublisher from "./postQuestion";
import { Redirect } from "react-router-dom";
import chainWizImage from "./BG2.png";
import PublisherPage from "./publisherPage";
const chainWiz = {
  backgroundImage: "url(" + chainWizImage + ")",
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',

}


const btn = {
  color: "white"
}
export default class HomePage extends React.Component {
  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {

    const web3 = window.web3
    // this.setState({web3:web3});
    const accounts = await web3.eth.getAccounts()
    this.setState({
      account: accounts[0],
      loader: true
    })
    const smartContract = new web3.eth.Contract(contractABI, "0xbbfe5fb0e14cef295789dff039d29c90d4ed7b76")
    this.setState({ smartContract })
    const rolescontract = new web3.eth.Contract(rolesABI, "0xa0c8870b4234a70da1892074179c50861c824b0e")
    this.setState({ rolescontract })

    var account = await web3.eth.getAccounts()
    var fromAcc = account.toString();
    console.log(fromAcc)
    var role = await rolescontract.methods.verifyPublisher().call({ from: fromAcc });
    console.log(role)
    if (role) {
      this.setState({ roleValue: "Publisher" });
    }
    else {
      role = await this.state.rolescontract.methods.verifyVoter().call({ from: fromAcc });
      if (role)
        this.setState({ roleValue: "Voter" });
      else {
        role = await this.state.rolescontract.methods.verifySolver().call({ from: fromAcc });
        if (role)
          this.setState({ roleValue: "Solver" });
        else {
          role = await rolescontract.methods.verifyDapper().call({ from: fromAcc });
          if (role) {
            this.setState({ roleValue: "Dapper" });
            // window.location.reload();
          }
          else {
            this.setState({ roleValue: "Guest" });
          }
        }
      }
    }

    const unsplitQuestion = await this.state.smartContract.methods.questions().call({ from: fromAcc });
    console.log(unsplitQuestion)
    this.setState({ unsplitQuestion: unsplitQuestion, loader: false });
    // this.setState({loader:false});

  }
  getRoles = () => {
    var a = null;
    this.setState(
      {
        openSnackBar: true,
        messageSnackBar: "Confirm transaction"
      }
    );
    if (this.state.roleValue === "Publisher") {
      a = regPublisherVerify();
      if (a !== null) {
        this.loadBlockchainData();
      }


    }

    else if (this.state.roleValue === "Voter") {
      a = regVoterVerify();
      if (a !== null) {
        this.loadBlockchainData();
      }
    }
    else if (this.state.roleValue === "Solver") {
      a = regSolverVerify();
      if (a !== null) {
        this.loadBlockchainData();
      }

    }
    else if (this.state.roleValue === "Dapper") {
      a = regDapperVerify();
      if (a !== null) {
        this.loadBlockchainData();
      }
    }
  }


  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      rolescontract: null,
      smartContract: null,
      web3: null,
      paymentDialog: false,
      roleValue: "",
      c: [],
      postReward: "",
      buffer: null,
      account: null,
      yes: "false",
      finalobj: { cardofquestion: [], type: "" },
      loader: true,
      openSnackBar: false,
      messageSnackBar: "",
      tranferDialog: false,
      numberOfToken: "",
      unsplitQuestion: []

    }
  }


  render() {
    console.log(this.state);
    if (this.state.roleValue === "Publisher") {
      return <Redirect to="publisher_section" />;
    }
    return (
      <div >
        <Grid container>
          <AppBar style={chainWiz} position="static">
            <Toolbar variant="dense">
              {this.state.roleValue === "Publisher" ?
                <Link to="/publisher_section" style={{ textDecoration: "none" }}>
                  <IconButton edge="start" color="inherit" aria-label="menu">
                    <Icon style={{ color: "white" }}>
                      supervised_user_circle
           </Icon>
                  </IconButton>
                </Link>
                :
                <IconButton edge="start" color="inherit" aria-label="menu">
                  <Icon>
                    view_headline
           </Icon>
                </IconButton>
              }
              <Typography style={{ flex: 1 }} variant="h6" color="inherit">
                ChainWhiZ
          </Typography>
              <div style={{ float: "right" }}>
                <Button style={btn}>Home</Button>

                {/* <Link to="/get_roles" style={{ textDecoration: "none" }}> */}
                <Button
                  style={btn}
                  onClick={() => { this.setState({ rolesDialog: true }) }}
                >
                  Get Roles
                  </Button>

                <Button style={btn}>GuideLines</Button>
                <Button style={btn}>About</Button>
                <Button style={btn}>Contact</Button>
              </div>
            </Toolbar>

          </AppBar>
          <Grid container justify="center" spacing={2} item xs={12} md={12}>
            {/* {
              // this.state.roleValue === "Publisher"
              true
               &&

              <Grid item xs={8} md={8}>
                <br />
                <Card raised={true} style={{ borderRadius: 10,height:300 }} >
                </Card >
              </Grid>
            } */}
            <Grid item xs={8} md={8}>
              <br />
              {this.state.unsplitQuestion.length > 0 &&
                <span>
                  {this.state.unsplitQuestion.map(s => (
                    <div key={s}>
                      <QuestionsCard
                        data={s}
                        type={this.state.roleValue}
                      />
                      <br />
                    </div>

                  ))}</span>}
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          style={{ backgroundColor: "#5F5F5F" }}
          open={this.state.rolesDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Please Select your role and Make Payment"}</DialogTitle>
          <Grid container>
            <DialogContent>
              <Grid container item xs={12} md={12}>

                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={this.state.role}
                    select
                    label={"Select Role"}
                    onChange={(e) => { this.setState({ role: e.target.value }) }}
                  >
                    <MenuItem value="Publisher">{"Publisher"}</MenuItem>
                    <MenuItem value="Voter">{"Voter"}</MenuItem>
                    <MenuItem value="Solver">{"Solver"}</MenuItem>
                    <MenuItem value="Dapper">{"Dapper"}</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </DialogContent>
          </Grid>
          <DialogActions>

            <Button
              onClick={() => {
                this.setState({ rolesDialog: false });
                this.getRoles();
              }}
              color="primary"
              autoFocus
              variant="outlined"
            >
              Submit
      </Button>
          </DialogActions>
        </Dialog>
        {this.state.loader &&
          <Loader />
        }
        <SnackBar
          open={this.state.openSnackBar}
          message={this.state.messageSnackBar}
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Footer />
      </div >

    )
  }
}