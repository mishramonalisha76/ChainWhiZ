import React from "react";
import Web3 from "web3";
import fleekStorage from '@fleekhq/fleek-storage-js'
import { ipfsABI } from "../js/IPFS";
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

import chainWizImage from "./BG2.png";
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

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0],
      //  loader: true 
      })
    const ipfscontract = new web3.eth.Contract(ipfsABI, "0xa35ab86d2e8a609e8ee044eb6c47aef293e24596")
    this.setState({ ipfscontract })
    const rolescontract = new web3.eth.Contract(rolesABI, "0x5E16F0b5B4eeeb603967278B7ADFe63Fa0F54BAe")
    this.setState({ rolescontract })

    var account = await web3.eth.getAccounts()
    var fromAcc = account.toString();
    var role = await rolescontract.methods.verifyPublisher().call({ from: fromAcc });
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
      }
    }
    const usplitQuestion = await this.state.rolescontract.methods.questions().call({ from: fromAcc });
    console.log(usplitQuestion)
    console.log("usplitQuestion")
  }
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      rolescontract: null,
      ipfscontract: null,
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
      numberOfToken: ""

    }
  }
  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
    }

  }

  onSubmit = async (event) => {

    var today = new Date();

    var date = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();
    const uploadedFile = await fleekStorage.upload({
      apiKey: 'U3QGDwCkWltjBLGG1hATUg==',
      apiSecret: 'GMFzg7TFJC2fjhwoz9slkfnncmV/TAHK/4WVeI0qpYY=',
      key: this.state.account + date,
      data: this.state.buffer,
    });

    console.log(uploadedFile);
    if (uploadedFile) {
      this.state.ipfscontract.methods.publisherUploadQues(uploadedFile.hash, this.state.postReward, date).send({ from: this.state.account }).then((r) => {
        var currKey = uploadedFile.hash;
        this.loadBlockchainData();



      })
    }


  }
  render() {

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

                <Link to="/get_roles" style={{ textDecoration: "none" }}>
                  <Button
                    style={btn}
                  >
                    Get Roles
                  </Button>
                </Link>
                <Button style={btn} onClick={() => {
                  this.setState({
                    tranferDialog: true
                  })
                }}>
                  Transfer To Matic
                  </Button>
                {/* <Button style={btn}>Profile</Button> */}
                <Button style={btn}>GuideLines</Button>
                <Button style={btn}>About</Button>
                <Button style={btn}>Contact</Button>
              </div>
            </Toolbar>

          </AppBar>
          <Grid container justify="center" spacing={2} item xs={12} md={12}>
            <Grid item xs={8} md={8}>
              <br />
              <Card raised={true} style={{ borderRadius: 10 }} >
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <Typography variant="title" color="inherit" >
                        {"Upload Your Question :-"}
                        <input type="file" onChange={this.captureFile} />
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>

                      <TextField
                        label="Upload Reward"
                        variant="outlined"
                        required
                        type="number"
                        value={this.state.postReward}
                        onChange={(e) => { this.setState({ postReward: e.target.value }) }}

                      />
                    </Grid>
                    <Grid item xs={12} md={12} style={{ textAlign: "right" }}>
                      {
                        this.state.roleValue === "Publisher" &&
                        <Button
                          disabled={this.state.postReward === "" ? true : false}
                          style={{ marginTop: -30 }} color="primary" variant="outlined" onClick={this.onSubmit} >
                          Post
                       </Button>
                      }

                    </Grid>
                  </Grid>
                </CardContent >
              </Card >
            </Grid>
            {/* <Grid item xs={8} md={8}>
              {this.state.questions.length > 0 && <span>
                {this.state.questions.map(s => (
                  <div>
                    <QuestionsCard
                      data={s}
                      type={this.state.roleValue}
                    />
                    <br />
                  </div>

                ))}</span>}
            </Grid> */}
          </Grid>
        </Grid>
        <Dialog
          open={this.state.tranferDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Please enter number of tokens you want to transfer(in wei)"}</DialogTitle>
          <Grid container>
            <DialogContent>
              <Grid container item xs={12} md={12}>

                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="number"
                    value={this.state.numberOfToken}
                    label={"Number of Tokens"}
                    onChange={(e) => { this.setState({ numberOfToken: e.target.value }) }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
          </Grid>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({ tranferDialog: false });
              }}
              color="primary"
              variant="outlined"
            >
              Close
          </Button>
            <Button
              onClick={() => {
                this.setState({ tranferDialog: false });
                console.log(this.state.numberOfToken);
                // transTok(this.state.numberOfToken);
                this.loadBlockchainData()

              }}
              color="primary"
              autoFocus
              variant="outlined"
            >
              Transfer Tokens
          </Button>
          </DialogActions>
        </Dialog>
        {/* {this.state.loader &&
          <Loader />
        } */}
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