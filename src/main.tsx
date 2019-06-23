import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import App from "./components/App";
import CallbackView from "./components/AuthCallback";
import Conf from "./conf";

import "react-circular-progressbar/dist/styles.css";
import "./styles/auth.scss";
import "./styles/dumper.scss";

class Main extends React.PureComponent {
  public render() {
    return (
      <Router basename={Conf.PUBLIC_URL}>
        <Switch>
          <Route exact path="/authCallback" component={CallbackView} />
          <Route path="/" component={App} />
        </Switch>
      </Router>
    );
  }
}

window.onload = () => {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    ReactDOM.render(<Main />, rootElement);
  }
};
