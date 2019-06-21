import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./components/App";
import CallbackView from "./components/AuthCallback";

import "react-circular-progressbar/dist/styles.css";
import "fomantic-ui-less/semantic.less";
import "./styles/auth.scss";
import "./styles/dumper.scss";

class Main extends React.PureComponent {
  public render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={App} />
          <Route exact path="/authCallback" component={CallbackView} />
        </div>
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
