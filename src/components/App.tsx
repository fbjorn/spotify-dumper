import * as React from "react";
import { LoginView } from "./Auth";
import PlaylistDumper from "./Dumper";

import { IUserInfo } from "../misc/types";
import * as utils from "../misc/utils";

interface IState {
  userInfo: IUserInfo;
}

export default class App extends React.Component<{}, IState> {
  public readonly state: IState = {
    userInfo: utils.getUserInfo(),
  };

  public render() {
    const isLoggedIn = Boolean(this.state.userInfo.username);
    return (
      <div>
        {isLoggedIn ? (
          <PlaylistDumper userInfo={this.state.userInfo} />
        ) : (
          <LoginView />
        )}
      </div>
    );
  }
}
