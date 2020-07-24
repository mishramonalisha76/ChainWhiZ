import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
// import chainWizImage from "../BG2.png";
import chainWizImage from "./CWZalternative.png";
import {
    Grid,
    CardContent,
    Card,
    Typography,
    Button,
} from "@material-ui/core";
const chainWiz = {
    // backgroundImage: "url(" + chainWizImage + ")",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    // height: 650,
    textAlign: "center"
    // marginTop:-100
}
const letteres = {
    fontFamily: "Times New Roman, Times, serif",
    // color:"black"
}
export default class LandingPage extends React.Component {
    componentDidMount() {
        var strings = "0:tuple(string,address,uint256,uint256,uint256,string,address,string,string,bool,string)[]: ipfshash,0xcBC3A159604E17d975B0d20A79Ca9B62AaE1bb3d,23,123,1233,12-04-2020,0x0000000000000000000000000000000000000000,,,true,#"
        var arr = strings.split(":")
        var arr1 = arr[3]
        console.log(arr)
    }
    render() {

        return (
            <div style={{ backgroundColor: "#F9FAFA" }} >
                <Grid container >
                    <Grid item xs={12} md={2}>
                        <div style={{ width: "80%", marginLeft: 30 }}>
                            <img src={chainWizImage} style={{ width: "100%" }} />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={10} >
                        <Button>
                            hello
                           </Button>
                    </Grid>

                    <Grid item xs={12} md={12} style={chainWiz}>
                        <br />   <br />  <br /> <br />
                        <Typography variant="h1" style={letteres}>
                            {"ChainWhiZ"}
                        </Typography>
                        <Typography variant="h2" style={letteres}>
                            {"Ask | Answer | Approve"}
                        </Typography>
                        <Typography variant="h5" style={letteres}>
                            {<b>Ask</b>}   {"questions and get quality products."}
                        </Typography>
                        <Typography variant="h5" style={letteres}>
                            {<b>Answer</b>} {" solutions and get rewarded."}
                        </Typography>
                        <Typography variant="h5" style={letteres}>
                            {<b>Approve</b>}  {" solutions and run the community"}
                        </Typography>
                        <Button color="primary" variant="contained">
                            Get started
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={12}>

                    </Grid>
                </Grid>
            </div>

        )
    }
}