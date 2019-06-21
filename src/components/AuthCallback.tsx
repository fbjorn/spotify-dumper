import * as React from "react";
import { BrowserRouter as Router, RouteComponentProps } from "react-router-dom";

import API from "../misc/api";
import { IUserResponse } from "../misc/types";
import * as utils from "../misc/utils";

export default class CallbackView extends React.PureComponent<
  RouteComponentProps
> {
  public render() {
    const regexp = /access_token=(.*?)\&.*expires_in=(\d+)/;
    const match = this.props.location.hash.match(regexp);
    let label = <p>Something went wrong please try again</p>;
    if (match) {
      const [_, token, expires] = match;
      utils.setTokenCookie(token, Number(expires));
      API.getMe().then((response: IUserResponse) => {
        utils.saveUserInfo(response);
        this.props.history.push("/"); //   maybe using some registered link?
      });
      label = <p>Authorization..</p>;
    }

    return <div>{label}</div>;
  }
}
