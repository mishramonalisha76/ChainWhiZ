import React from "react";
import { contractABI } from "../js/contract";

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

const chainWiz = {
    backgroundImage: "url(" + chainWizImage + ")",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
}

const btn = {
    color: "white"
}
export default class DappPage extends React.Component {

    async componentWillMount() {
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
        this.setState({ account: accounts[0] })
        const smartContract = new web3.eth.Contract(contractABI, "0xfa85e3187a9642619c810fa2059e045271423c9a")
        this.setState({ smartContract: smartContract })

        // var account = await web3.eth.getAccounts()

        const dappSolutions = await smartContract.methods.returnDappProfile().call({ from: this.state.account });
        console.log(dappSolutions)
        this.setState({ dappSolutions: dappSolutions });


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
            dappSolutions: []

        }
    }

    render() {
        return (
            <div>
                <Grid item xs={12} md={12} >
                    <Table aria-label="simple table" >
                        <TableHead>
                            <TableRow>
                                {/* <TableCell>Question</TableCell> */}
                                <TableCell align="center"> Publisher's address</TableCell>
                                <TableCell align="center"> Question</TableCell>
                                <TableCell align="right"> Video Link</TableCell>
                                <TableCell align="right">Dapp Reward</TableCell>
                                <TableCell align="right">View</TableCell>

                            </TableRow>
                        </TableHead >
                        <TableBody >
                            {this.state.dappSolutions.map((row) => (
                                <TableRow key={row.name}>
                                    {/* <TableCell component="th" scope="row"> */}
                                    {/* {row.question} */}
                                    {/* {this.getQuestion(row.ipfshash)} */}
                                    {/* </TableCell> */}
                                    <TableCell align="center">{row.pub}</TableCell>
                                    <TableCell align="center">{row.ipfshash}</TableCell>
                                   
                                    <TableCell align="right"><a style={{ fontSize: 15 }} href={"https://ipfs.infura.io/ipfs/" + row.videoLink} target="_blank" >
                              {row.videoLink}  </a></TableCell>
                                    <TableCell align="center">{window.web3.utils.fromWei(row.dappreward, 'ether')}</TableCell>
                                    <TableCell align="right">
                                        <Link to={{
                                            pathname: "escrow_section_dapp",
                                            state: {
                                                data: row,
                                                address:this.state.account

                                            }
                                        }}>
                                            <Button color="primary" variant="outlined" size="small"

                                            >View</Button>
                                        </Link>
                                        {/* {
                                            row.typeSol === "dapp" &&
                                            <Button color="primary" variant="outlined" size="small"
                                                onClick={() => {
                                                    this.setState({ dappSolutionDialog: true, currentQues: row });
                                                    this.onDappSol(row.ipfshash);
                                                }}
                                            >Dapp</Button>
                                        } */}

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>


                <Footer style={{ position: "absolute",bottom: "0",width:"100%",height: "50px",paddingTop:"50px"}} />
            </div>
        )
    }
}