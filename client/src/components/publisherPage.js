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
import chainWizImage from "./BG2.png";
import fleekStorage from '@fleekhq/fleek-storage-js';

import PostPublisher from "./postQuestion";
const chainWiz = {
  backgroundImage: "url(" + chainWizImage + ")",
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}

const btn = {
  color: "white"
}


export default class PublisherPage extends React.Component {

  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  // async componentWillReceiveProps(prev, next) {
  //   this.setState({});
  //   await this.loadBlockchainData()
  // }

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
    const questions = await this.state.smartContract.methods.getAllContract("dapp").call({ from: fromAcc })
    this.setState({ questions: questions })
    console.log(questions)
    console.log("hello")

  }

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      solutions: [],
      account: "",
      address: '',
      smartContract: null,
      contractSolutions: [],
      dappSolutions: [],
      dappSolutionDialog: false

    }
  }
  onContractSol = async (ques) => {
    var arr = []
    const contractSolutions = await this.state.smartContract.methods.publisherContractSol(ques).call({ from: this.state.account });
    console.log(contractSolutions)
    for (var i = 0; i < contractSolutions.length; i++) {
      for (var j = 0; j < contractSolutions[i].length; j++) {
        arr.push((contractSolutions[i])[j])
      }
    }
    console.log(arr)
    this.setState({ contractSolutions: arr });
  }
  onDappSol = async (ques) => {
    const dappSolutions = await this.state.smartContract.methods.dappSol(ques).call({ from: this.state.account });
    this.setState({ dappSolutions: dappSolutions });
    console.log(dappSolutions);
  }
  getQuestion = async (val) => {
    console.log(val)
    // const myFile = await fleekStorage.getFileFromHash({
    //   hash: val,
    // })
    // return myFile;
  }

  render() {
    return (
      <div>
        <Grid container justify="center" >
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
                {/* <Button
                  style={btn}
                  onClick={() => { this.setState({ rolesDialog: true }) }}
                >
                  Get Roles
                  </Button> */}

                <Button style={btn}>GuideLines</Button>
                <Button style={btn}>About</Button>
                <Button style={btn}>Contact</Button>
              </div>
            </Toolbar>

          </AppBar>
          {
            // this.state.roleValue === "Publisher"
            true
            &&

            <Grid item xs={8} md={8}>
              <br />
              <Card raised={true} style={{ borderRadius: 10, height: 300 }} >
                <PostPublisher />

              </Card >
            </Grid>
          }
          <Grid item xs={12} md={8}>
            <Card raised={true} style={{ borderRadius: 10, marginTop: 10 }} >
              <CardContent>

                <Grid container item spacing={2}>


                  <Grid item xs={12} md={8}>
                    <List style={{ padding: 0 }}>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography variant="title" color="inherit" >
                              {"Public Address :-" + this.state.account}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  {/* <Grid item xs={12} md={8}>
                    <List style={{pading:0}}>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography variant="title" color="inherit" >
                              {}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </List>
                  </Grid> */}
                  <Grid item xs={12} md={6}>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography variant="title" color="inherit" >
                              {"Role :- Publisher"}
                            </Typography>
                          }
                        />
                        <ListItemSecondaryAction>
                          <Typography variant="title" color="inherit" >
                            {this.state.address}
                          </Typography>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Question</TableCell>
                          <TableCell align="center"> Dapp Reward</TableCell>
                          <TableCell align="center"> Contract Reward</TableCell>
                          <TableCell align="right">Timestamp</TableCell>
                          <TableCell align="right">View</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.questions.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                              {/* {row.question} */}
                              {/* {this.getQuestion(row.ipfshash)} */}
                            </TableCell>
                            <TableCell align="center">{window.web3.utils.fromWei(row.dappReward, 'ether')}</TableCell>
                            <TableCell align="center">{window.web3.utils.fromWei(row.contractReward, 'ether')}</TableCell>
                            <TableCell align="right">{row.date}</TableCell>
                            <TableCell align="right">
                              <Button color="primary" variant="outlined" size="small"
                                onClick={() => {
                                  this.setState({ viewDialog: true });
                                  this.onContractSol(row.ipfshash);
                                }}
                              >View</Button>
                              {
                                row.typeSol === "dapp" &&
                                <Button color="primary" variant="outlined" size="small"
                                  onClick={() => {
                                    this.setState({ dappSolutionDialog: true });
                                    this.onDappSol(row.ipfshash);
                                  }}
                                >Dapp</Button>
                              }

                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>


                </Grid>
              </CardContent>
              <CardActions>


              </CardActions>
              <Dialog
                open={this.state.viewDialog}
                maxWidth={"md"}
                fullWidth={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">View Solvers </DialogTitle>
                <Grid container>
                  <DialogContent>
                    <Grid container spacing={2} item xs={12} md={12}>
                      <Grid item xs={12} md={12}>
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Solver Address</TableCell>
                              <TableCell align="left">Link</TableCell>
                              <TableCell align="left">Read me</TableCell>
                              <TableCell align="left">Vote(%)</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {/* {this.state.contractSolutions.map((row) => ( */}
                            {this.state.contractSolutions.length > 0 &&
                              <TableRow >
                                <TableCell component="th" scope="row">
                                  {this.state.contractSolutions[0]}
                                </TableCell>
                                <TableCell align="right"><a style={{ fontSize: 15 }} href={this.state.contractSolutions[1]} target="_blank" >{this.state.contractSolutions[1]}</a></TableCell>

                                <TableCell align="right">
                                  <a style={{ fontSize: 15 }} href={ this.state.contractSolutions[8]} target="_blank" >
                                    {this.state.contractSolutions[8]}  </a>
                                </TableCell>
                                <TableCell align="right">
                                  {this.state.contractSolutions[9]}
                                </TableCell>
                              </TableRow>
                            }
                            {/* ))} */}
                          </TableBody>
                        </Table>
                      </Grid>
                    </Grid>
                  </DialogContent>
                </Grid>
                <DialogActions>
                  <Button
                    onClick={() => {
                      this.setState({ viewDialog: false });
                    }}
                    color="primary"
                    variant="outlined"
                  >
                    Close
          </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={this.state.dappSolutionDialog}
                maxWidth={"md"}
                fullWidth={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">View solutions for Dapp </DialogTitle>
                <Grid container>
                  <DialogContent>
                    <Grid container spacing={2} item xs={12} md={12}>
                      <Grid item xs={12} md={12}>
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Dapp Address</TableCell>
                              <TableCell>Video Link</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {/* {this.state.contractSolutions.map((row) => ( */}
                            {this.state.dappSolutions.length > 0 &&
                              <TableRow >
                                <TableCell component="th" scope="row">
                                  {this.state.dappSolutions[0]}
                                </TableCell>
                                

                                <TableCell align="right">
                                  <a style={{ fontSize: 15 }} href={ this.state.dappSolutions[1]} target="_blank" >
                                    {this.state.dappSolutions[1]}  </a>
                                </TableCell>
                               
                              </TableRow>
                            }
                            {/* ))} */}
                          </TableBody>
                        </Table>
                      </Grid>
                    </Grid>
                  </DialogContent>
                </Grid>
                <DialogActions>
                  <Button
                    onClick={() => {
                      this.setState({ dappSolutionDialog: false });
                    }}
                    color="primary"
                    variant="outlined"
                  >
                    Close
          </Button>
                </DialogActions>
              </Dialog>
            </Card>
            <br />
          </Grid>


        </Grid>
        <Footer />
      </div>
    )
  }
}