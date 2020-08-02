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
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      value: 0,
      postReward: "",
      noOfDays: "",
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
                    //  onChange={this.captureFile}
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
                  //  onClick={this.onSubmit}
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