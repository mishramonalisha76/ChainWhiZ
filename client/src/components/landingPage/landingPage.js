import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
// import chainWizImage from "../BG2.png";
// import chainWizImage from "./pic.jpg";
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
    height: 650,
    textAlign: "center"
    // marginTop:-100
}
const letteres = {
    fontFamily: "Times New Roman, Times, serif",
    // color:"black"
}
export default class LandingPage extends React.Component {
    componentDidMount() {
        var strings = "abc,0xF1DC4557b975d046f0ab0f3741705e731bcc7d56,12,323,3244,23,0x0000000000000000000000000000000000000000,,,true,#,abc1,0xF1DC4557b975d046f0ab0f3741705e731bcc7d56,112,1323,311244,231,0x0000000000000000000000000000000000000000,,,true,#,xyz,0xF1DC4557b975d046f0ab0f3741705e731bcc7d56,1,100,10000,10,0x0000000000000000000000000000000000000000,,,true"
        var arr=strings.split(",#,")
        console.log(arr)
    }
    render() {

        return (
            <div style={{ backgroundColor: "#F9FAFA" }} >
                <Grid container >
                    <Grid item xs={12} md={12} style={chainWiz}>
                        <br />   <br />  <br /> <br />  <br />  <br />   <br />  <br />
                        <Typography variant="h1" style={letteres}>
                            {"ChainWiz"}
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
                        hello
                    </Grid>
                </Grid>
            </div>

        )
    }
}