import * as React from "react";

interface IArtists {
  [name: string]: number;
}

interface IProps {
  visible: boolean;
  likedSongs: IArtists;
}

interface IState {
  visible: boolean;
}

export default class extends React.PureComponent<IProps, IState> {
  public render() {
    const isRenderNeeded =
      this.props.visible && Object.keys(this.props.likedSongs).length > 1;
    const likedSongArtists = Object.entries(this.props.likedSongs).map(
      ([name, count]) => (
        <div key={`${name}${count}`} className="freqArtist">
          <div>{name}</div>
          <div>{count}</div>
        </div>
      ),
    );
    if (isRenderNeeded) {
      return (
        <div id="frequentArtistsView">
          <h1>Most frequent artists:</h1>
          <div className="freqArtists">{likedSongArtists}</div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
