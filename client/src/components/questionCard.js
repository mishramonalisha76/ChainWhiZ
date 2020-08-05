import React from "react";
import { contractABI } from "../js/contract";
import ipfs from "../js/ipfshttp"
import Web3 from "web3";
import {
  Button,
  IconButton,
  Icon,
  Grid,
  TextField
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Divider from '@material-ui/core/Divider';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from "react-router-dom";
import fleekStorage from '@fleekhq/fleek-storage-js';

export default class QuestionsCard extends React.Component {


  async componentWillMount() {
    // await this.loadWeb3()
    // await this.loadBlockchainData()
    const myFile = await fleekStorage.getFileFromHash({
      hash: this.props.data.ipfshash,
    })
    this.setState({
      question: myFile
    })
  }

  // async loadWeb3() {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum)
  //     await window.ethereum.enable()
  //   }
  //   else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider)
  //   }
  //   else {
  //     window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  //   }
  // }

  // async loadBlockchainData() {

  //   const web3 = window.web3

  //   const accounts = await web3.eth.getAccounts()
  //   this.setState({ account: accounts[0], loader: true })
  //   const ipfscontract = new web3.eth.Contract(ipfsABI, "0xa35ab86d2e8a609e8ee044eb6c47aef293e24596")
  //   this.setState({ ipfscontract })

  //   var account = await web3.eth.getAccounts()
  //   var fromAcc = account.toString();
  // }
  constructor(props) {
    super(props);
    this.state = {
      solveDialog: false,
      ethFiddleLink: "",
      smartContract: null,
      web3: null,
      account: null,
      question: "",
      dappSolveLinkDialog: false
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

  onSubmit = () => {
    // console.log(this.state.contract);
    ipfs.add(this.state.buffer, (error, result) => {
      var today = new Date();


      this.state.smartContract.methods.pushSolution(this.props.data.question, this.state.ethFiddleLink, result[0].hash,).send({ from: this.state.account }).then((r) => {

        // return window.location.reload();
        // this.setState({})

      })
      if (error)
        console.log(error);


    })


  }
  async getQuestion() {

  }

  render() {
    // console.log(this.props.data);
    return (
      <Card raised={true} style={{ borderRadius: 10 }} >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={10} md={10}>
              <Typography variant="title" color="inherit" >
                {"Public Address:-" + this.props.data.publisher}
              </Typography>
            </Grid>
            <Grid item xs={2} md={2}>
              <Typography variant="subtitle1" color="inherit" >
                {"Date:-" + this.props.data.date}
              </Typography>
            </Grid>
            <Grid item xs={10} md={10}>
              <Typography variant="subtitle1" color="inherit">
                {this.state.question}
              </Typography>

            </Grid>
            {!this.props.data.contractLabel &&
              <Grid item xs={12} md={12}>
                <Typography variant="title" color="inherit">
                  {"Result :-" + this.props.data.result}
                </Typography>
              </Grid>
            }
          </Grid>
        </CardContent>
        <CardActions>
          {
            (this.props.type === "Dapper" && JSON.parse(this.props.data.typeSol) === "Dapp" )
            //  && this.props.data.label) 
            &&
            <Button
              color="primary"
              variant="outlined"
              size="small"
              onClick={() => { this.setState({ dappSolveLinkDialog: true }) }}
            >
              Solve
              </Button>
          }
          {
            (this.props.type === "Solver" && JSON.parse(this.props.data.typeSol) === "smart contract")
            //  && this.props.data.label) 
            &&
            <Button
              color="primary"
              variant="outlined"
              size="small"
              onClick={() => { this.setState({ solveDialog: true }) }}
            >
              Solve
              </Button>
          }
          {
            // (
            this.props.type === "Voter"
            //  && this.props.data.label
            //  )
            &&
            <Link
              style={{ textDecoration: "none" }}
              to={{
                pathname: "voter_section",
                state: {
                  data: this.props.data
                }
              }}>
              <Button color="primary" variant="outlined" size="small">Vote</Button>
            </Link>
          }


          {/* <Button color="primary" variant="outlined" size="small"  onClick={() => { this.props.refresh  }}>Get Question</Button> */}
        </CardActions>
        <Dialog
          open={this.state.solveDialog}
          maxWidth={"md"}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Solve </DialogTitle>
          <Grid container>
            <DialogContent>
              <Grid container spacing={2} item xs={12} md={12}>
                <Grid item xs={10} md={10}>
                  <Typography variant="title" color="inherit" >
                    {"Public Address :-" + this.props.data.publisher}
                  </Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <Typography variant="subheading" color="inherit" >
                    {"Date :-" + this.props.data.date}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="h6" gutterBottom>
                    {"Problem Statement Link:"}
                  </Typography>
                  <Typography color="textSecondary" variant="h6" gutterBottom>
                    <a style={{ fontSize: 15 }} href={"https://ipfs.infura.io/ipfs/" + this.props.data.question} target="_blank" >
                      {this.props.data.question}
                    </a>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="h6" gutterBottom>
                    {"Click below to go to EthFiddle:"}
                  </Typography>
                  <Typography color="textSecondary" variant="h6" gutterBottom>
                    <a style={{ fontSize: 15 }} href={"https://ethfiddle.com/"} target="_blank" >
                      https://ethfiddle.com/</a>
                  </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    value={this.state.ethFiddleLink}
                    label={"Enter EthFiddle Link"}
                    onChange={(e) => { this.setState({ ethFiddleLink: e.target.value }) }}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  Enter ReadMe File
                  <br />
                  <input type="file" onChange={this.captureFile} />
                </Grid>
              </Grid>
            </DialogContent>
          </Grid>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({ solveDialog: false });
                // this.loadBlockchainData()
              }}
              color="primary"
              variant="outlined"
            >
              Close
          </Button>
            <Button
              onClick={() => {

                this.setState({ solveDialog: false });
                this.onSubmit();
              }}
              color="primary"
              autoFocus
              variant="outlined"
            >
              Submit
          </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.dappSolveLinkDialog}
          maxWidth={"md"}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Solve </DialogTitle>
          <Grid container>
            <DialogContent>
              <Grid container spacing={2} item xs={12} md={12}>

                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    value={this.state.dappVideoLink}
                    label={"Enter Youtube Video Link"}
                    onChange={(e) => { this.setState({ dappVideoLink: e.target.value }) }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
          </Grid>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({ dappSolveLinkDialog: false });
                // this.loadBlockchainData()
              }}
              color="primary"
              variant="outlined"
            >
              Close
          </Button>
            <Button
              onClick={() => {

                this.setState({ dappSolveLinkDialog: false });
                // this.onSubmit();
              }}
              color="primary"
              autoFocus
              variant="outlined"
            >
              Submit
          </Button>
          </DialogActions>
        </Dialog>
      </Card>

    )
  }
}