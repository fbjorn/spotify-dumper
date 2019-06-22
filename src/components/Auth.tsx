import * as React from "react";
// import { Button } from "semantic-ui-react";
import Button from "react-bootstrap/Button";

import API from "../misc/api";
import { IUserResponse } from "../misc/types";
import * as utils from "../misc/utils";

export class LoginView extends React.Component {
  public login() {
    const state = "state";
    const url = API.getLoginURL(state);
    window.open(url, "_self");
  }
  public fetchUserInfo() {
    API.getMe().then((response: IUserResponse) => utils.saveUserInfo(response));
  }
  public render() {
    return (
      <div id="loginView">
        <img
          className="logo"
          src={require("../assets/spotify-icon-green.png")}
        />
        <h1>Sign in with your Spotify account</h1>
        <Button onClick={this.login}>Sign in</Button>
      </div>
    );
  }
}
