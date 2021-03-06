import React from "react";
import {
  Button,
  IconButton,
  Icon
} from "@material-ui/core"
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from "./components/homePage";
// import MaticPage from "./components/rolesPage";
import VoterPage from "./components/voterPage";
import PublisherPage from "./components/publisherPage";
import Footer from "./components/footer";
import EscrowPage from "./components/escrowPage"
import DappPage from "./components/dappProfile"
import EscrowDappPage from "./components/escrowDapp";
// import Chat from "./components/chat";
export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route exact path="/get_roles" component={MaticPage} /> */}
          <Route exact path="/voter_section" component={VoterPage} />
          <Route exact path="/publisher_section" component={PublisherPage} />
          <Route exact path="/escrow_section" component={EscrowPage} />
          <Route exact path="/dapp_section" component={DappPage} />
          <Route exact path="/escrow_section_dapp" component={EscrowDappPage} />
          {/* <Route exact path="/chat_section" component={Chat} /> */}
        </Switch>
      </BrowserRouter>

    )
  }
}