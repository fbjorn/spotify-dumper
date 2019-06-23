import * as React from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { LoginView } from "./Auth";
import PlaylistDumper from "./Dumper";

import { IUserInfo } from "../misc/types";
import * as utils from "../misc/utils";

interface IState {
  userInfo: IUserInfo;
}

export default class App extends React.PureComponent<RouteComponentProps> {
  public readonly state: IState = {
    userInfo: utils.getUserInfo(),
  };

  public render() {
    // due to hosting on gh pages there are some weird routing steps
    const authCallbackRequest = this.props.location.pathname.startsWith(
      "/access_token",
    );
    const isLoggedIn = Boolean(this.state.userInfo.username);
    return (
      <div>
        {authCallbackRequest ? (
          <Redirect
            to={{
              pathname: "/authCallback",
              state: this.props.location.pathname,
            }}
          ></Redirect>
        ) : isLoggedIn ? (
          <PlaylistDumper userInfo={this.state.userInfo} />
        ) : (
          <LoginView />
        )}
      </div>
    );
  }
}
