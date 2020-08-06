import React from "react";

import {
  Button,
  IconButton,
  Icon,
  Grid,
  MenuItem,
  TextField
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { contractABI } from "../js/contract";
import Web3 from "web3";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link } from "react-router-dom";
import Loader from "./loader";
import Footer from "./footer";
import chainWizImage from "./BG2.png";
import fleekStorage from '@fleekhq/fleek-storage-js';

const chainWiz = {
  backgroundImage: "url(" + chainWizImage + ")",
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}

const btn = {
  color: "white"
}
export default class VoterPage extends React.Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    const myFile = await fleekStorage.getFileFromHash({
      hash: this.props.location.state.data.ipfshash,
    })
    this.setState({
      question: myFile
    })
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
    this.setState({ account: accounts[0], loader: true })
    const smartContract = new web3.eth.Contract(contractABI, "0xbbfe5fb0e14cef295789dff039d29c90d4ed7b76")
    this.setState({ smartContract })

    var account = await web3.eth.getAccounts()
    var fromAcc = account.toString();
    var arr = []

    const contractSolutions = await this.state.smartContract.methods.publisherContractSol(this.props.location.state.data.ipfshash).call({ from: this.state.account });
    console.log(contractSolutions)
    for (var i = 0; i < contractSolutions.length; i++) {
      for (var j = 0; j < contractSolutions[i].length; j++) {
        arr.push((contractSolutions[i])[j])
      }
    }
    this.setState({ contractSolutions: arr, loader: false });


  }

  constructor(props) {
    super(props);
    this.state = {
      smartContract: null,
      web3: null,
      account: null,
      roleValue: "",
      rolesDialog: true,
      solutions: [],
      loader: true,
      question: "",
      contractSolutions: []

    }
  }

  onAgree = (sol, ques) => {
    this.state.smartContract.methods.agree(sol, ques).send({ from: this.state.account }).then((r) => {


      // this.setState({})

    })
  }
  onDisagree = (sol, ques) => {
    this.state.smartContract.methods.disagree(sol, ques).send({ from: this.state.account }).then((r) => {


      // this.setState({})

    })
  }
  render() {
    console.log(this.state)
    return (
      <div style={{ paddingTop: 8 }}>
        <Grid container justify="center" spacing={2}>
          <AppBar style={chainWiz} position="static">
            <Toolbar variant="dense">
              <IconButton edge="start" color="inherit" aria-label="menu">
                <Icon>
                  list
             </Icon>
              </IconButton>
              <Typography style={{ flex: 1 }} variant="h6" color="inherit">
                ChainWhiZ
          </Typography>
              <div style={{ float: "right" }}>
                <Button style={btn}>GuideLines</Button>
                <Button style={btn}>About</Button>
                <Button style={btn}>Contact</Button>
              </div>
            </Toolbar>
          </AppBar>
          <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
            <Typography variant="h4" style={{ color: "blue" }} >
              {"Problem Statement"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={10}>
            <Card raised={true} style={{ borderRadius: 10 }} >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={10} md={10}>
                    <Typography variant="title" color="inherit" >
                      {"Public Address :-" + this.props.location.state.data.publisher}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} md={2}>
                    <Typography variant="subheading" color="inherit" >
                      {"Date :-" + this.props.location.state.data.date}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography color="textSecondary" variant="h6" gutterBottom>

                      {this.state.question}
                    </Typography>

                  </Grid>

                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
            <Typography variant="h4" style={{ color: "blue" }} >
              {"Solutions "}
            </Typography>
          </Grid>
          <Grid item xs={12} md={10}>

            {this.state.contractSolutions.length > 0 &&
              // <span>
              //   {this.state.contractSolutions.map(s => (
              <div>
                <Card raised={true} style={{ borderRadius: 10 }} >
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={8} md={8}>
                        <Typography variant="title" color="inherit" >
                          {"Public Address:-" + this.state.contractSolutions[0]}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} md={4} style={{ display: "inline-flex" }}>
                        <Typography inline color="inherit" variant="title"
                        >{"Ethfiddle Link:-"}
                        </Typography>
                        <Typography inline color="inherit" variant="title" >
                          <a style={{ fontSize: 15 }} href={this.state.contractSolutions[1]} target="_blank" >
                            {this.state.contractSolutions[1]}  </a>
                        </Typography>
                      </Grid>

                      <Grid item xs={8} md={8} style={{ display: "inline-flex", paddingTop: 18 }}>

                        <Typography inline color="inherit" variant="title">{"ReadMe:-"}</Typography>
                        <Typography inline color="inherit" variant="title">
                          <a style={{ fontSize: 15 }} href={"https://ipfs.infura.io/ipfs/" + this.state.contractSolutions[2]} target="_blank" >
                            {this.state.contractSolutions[2]}  </a>
                        </Typography>

                      </Grid>
                      <Grid item xs={4} md={4} style={{ textAlign: "center" }}>
                        <IconButton
                          onClick={() => { this.onAgree(this.state.contractSolutions[1], this.props.location.state.data.ipfshash) }} >
                          <Icon>
                            thumb_up_alt
                      </Icon>
                        </IconButton>
                        <IconButton
                          onClick={() => { this.onDisagree(this.state.contractSolutions[1], this.props.location.state.data.ipfshash) }} >
                          <Icon>
                            thumb_down_alt
                      </Icon>
                        </IconButton>

                      </Grid>

                    </Grid>
                  </CardContent>
                </Card>

                <br />
              </div>

              // ))}</span>
            }

          </Grid>
        </Grid>
        {this.state.loader &&
          <Loader />
        }
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Footer />
      </div>

    )
  }
}