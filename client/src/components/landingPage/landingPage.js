import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
// import chainWizImage from "../BG2.png";
import chainWizImage from "./CWZalternative.png";
import mainBackground from "./hero.jpg";
import {
    Grid,
    CardContent,
    Card,
    Typography,
    Button,
} from "@material-ui/core";
const chainWiz = {
    backgroundImage: "url(" + mainBackground + ")",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 600,
    textAlign: "center"
    // marginTop:-100
}
const letteres = {
    fontFamily: "Times New Roman, Times, serif",
    color:"white"
    // color:"black"
}
export default class LandingPage extends React.Component {
    render() {

        return (
            <div style={{ backgroundColor: "#F9FAFA" }} >
                <Grid container >


                    <Grid container item xs={12} md={12} style={chainWiz}>
                        <Grid item xs={12} md={2}>
                            <br/>
                            <div style={{ width: "80%", marginLeft: 30 }}>
                                <img src={chainWizImage} style={{ width: "100%" }} />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={10} style={{ textAlign: "center" }} >
                            <Button>
                                hello
                           </Button>
                        </Grid>
                        <Grid item xs={12} md={12} style={{ textAlign: "center" }} >
                            {/* <Typography variant="h1" style={letteres}>
                                {"ChainWhiZ"}
                            </Typography> */}
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
                        <br />   <br />  <br /> <br />

                    </Grid>
                    <Grid item xs={12} md={12}>

                    </Grid>
                </Grid>
            </div>

        )
    }
}