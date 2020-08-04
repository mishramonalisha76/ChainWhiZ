import React from "react";
import {
  Grid,
  TextField,
  Button
} from "@material-ui/core";
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Web3 from "web3";
import fleekStorage from '@fleekhq/fleek-storage-js'
import { contractABI } from "../js/contract";

import { dappABI } from "../js/Dapp";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'} variant={'body2'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));
export default class PostPublisher extends React.Component {
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
    const smartContract = new web3.eth.Contract(contractABI, "0xb5304716b635e3b02e04d8cd90af5830171af269")
    this.setState({ smartContract })


    var account = await web3.eth.getAccounts()
    var fromAcc = account.toString();
    console.log(fromAcc)



  }
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      value: 0,
      postReward: "",
      noOfDays: "",
      smartContract: null,
      dappContract:null,
      web3: null,
      buffer: null,
      account: null,
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
  onDappSubmit = async (event) => {

    var today = new Date();
    var timeStart = today.getTime();
    // console.log(typeof(timeStart))

    var date = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();
    const uploadedFile = await fleekStorage.upload({
      apiKey: 'U3QGDwCkWltjBLGG1hATUg==',
      apiSecret: 'GMFzg7TFJC2fjhwoz9slkfnncmV/TAHK/4WVeI0qpYY=',
      key: this.state.account + date,
      data: this.state.buffer,
    });

    console.log(uploadedFile);
    if (uploadedFile) {
      this.state.smartContract.methods.publisherUploadQues(uploadedFile.hash, this.state.postRewardDappSmartContract, date, timeStart, 1000,"Dapp",2000).send({ from: this.state.account }).then((r) => {
        this.loadBlockchainData();


      })
      this.state.dappContract.methods.publisherUploadDapp(uploadedFile.hash, this.state.postRewardDappSmartContractSecond, date, timeStart, 1000).send({ from: this.state.account }).then((r) => {
        this.loadBlockchainData();
    
    
      })


    }


  }
  
  onContractSubmit = async (event) => {

    var today = new Date();
    var timeStart = today.getTime();
    // console.log(typeof(timeStart))

    var date = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();
    const uploadedFile = await fleekStorage.upload({
      apiKey: 'U3QGDwCkWltjBLGG1hATUg==',
      apiSecret: 'GMFzg7TFJC2fjhwoz9slkfnncmV/TAHK/4WVeI0qpYY=',
      key: this.state.account + date,
      data: this.state.buffer,
    });

    console.log(uploadedFile);
    if (uploadedFile) {
      this.state.smartContract.methods.publisherUploadQues(uploadedFile.hash, this.state.postRewardDappSmartContract, date, timeStart, 1000,"smart contract",0).send({ from: this.state.account }).then((r) => {
        this.loadBlockchainData();


      })
    }


  }
  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    })
  };

  handleChangeIndex = (index) => {
    this.setState({
      value: index
    })
  };
  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={12}>
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Dapp + smart Contract" {...a11yProps(0)} />
                <Tab label="Smart Contract" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={this.state.value} index={0}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography variant="body1" color="inherit" >
                    {"Upload Your Question :-"}
                    <input type="file"
                      onChange={this.captureFile}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>

                  <TextField
                    label="Upload Reward Smart Contract"
                    variant="outlined"
                    required
                    fullWidth
                    type="number"
                    value={this.state.postRewardDappSmartContract}
                    onChange={(e) => { this.setState({ postReward: e.target.value }) }}

                  />
                </Grid>
                <Grid item xs={12} md={6}>

                  <TextField
                    label="No of Days For Smart Contract"
                    variant="outlined"
                    required
                    fullWidth
                    type="number"
                    value={this.state.noOfDaysForSmartContract}
                    onChange={(e) => { this.setState({ noOfDaysForSmartContract: e.target.value }) }}

                  />
                </Grid>
                <Grid item xs={12} md={6}>

                  <TextField
                    label="Upload Reward Dapp"
                    variant="outlined"
                    required
                    fullWidth
                    type="number"
                    value={this.state.postRewardDappSmartContractSecond}
                    onChange={(e) => { this.setState({ postRewardDappSmartContractSecond: e.target.value }) }}

                  />
                </Grid>
                <Grid item xs={12} md={6}>

                  <TextField
                    label="No of Days For Dapp after Smart contract"
                    variant="outlined"
                    required
                    fullWidth
                    type="number"
                    value={this.state.noOfDaysForSmartContractDapp}
                    onChange={(e) => { this.setState({ noOfDaysForSmartContractDapp: e.target.value }) }}

                  />
                </Grid>
                <Grid item xs={12} md={12} style={{ textAlign: "right" }}>

                  <Button
                    disabled={this.state.postReward === "" ? true : false}
                    color="primary" variant="outlined"
                    onClick={this.onDappSubmit}
                  >
                    Post
                       </Button>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={this.state.value} index={1} >
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography variant="body1" color="inherit" >
                    {"Upload Your Question :-"}
                    <input type="file"
                    //  onChange={this.captureFile}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>

                  <TextField
                    label="Upload Reward"
                    variant="outlined"
                    required
                    fullWidth
                    type="number"
                    value={this.state.postReward}
                    onChange={(e) => { this.setState({ postReward: e.target.value }) }}

                  />
                </Grid>
                <Grid item xs={12} md={6}>

                  <TextField
                    label="No of days "
                    variant="outlined"
                    required
                    fullWidth
                    type="number"
                    value={this.state.noOfDays}
                    onChange={(e) => { this.setState({ noOfDays: e.target.value }) }}

                  />
                </Grid>
                <Grid item xs={12} md={12} style={{ textAlign: "right" }}>

                  <Button
                    disabled={this.state.postReward === "" ? true : false}
                    color="primary" variant="outlined"
                  //  onClick={this.onSubmit}
                  >
                    Post
                       </Button>
                </Grid>
              </Grid>
            </TabPanel>
          </Grid>
        </Grid>
      </div>
    )
  }
}