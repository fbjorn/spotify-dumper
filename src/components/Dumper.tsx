import * as React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

import API from "../misc/api";
import { ITrack, ITracksResponse, IUserInfo } from "../misc/types";
import * as utils from "../misc/utils";
import FrequentArtists from "./FrequentArtists";

interface IProps {
  userInfo: IUserInfo;
}
interface IState {
  isFetching: boolean;
  total: number;
  current: number;
  percentage: number;
  offsetLength: number;
  tracks: ITrack[];
  frequentArtists: { [name: string]: number };
}

export default class PlaylistDumper extends React.Component<IProps, IState> {
  public readonly initialState: IState = {
    current: 0,
    frequentArtists: {},
    isFetching: false,
    offsetLength: 20,
    percentage: 0,
    total: 0,
    tracks: [],
  };
  public readonly state: IState = this.initialState;

  public logout = () => {
    utils.clearCache();
  };

  public downloadJSON = () => {
    utils.saveJSON(this.state.tracks, "spotify");
  };

  public startSongsFetching = () => {
    this.setState({ ...this.initialState, isFetching: true }, () =>
      this.fetchSongs(),
    );
  };

  public fetchSongs = () => {
    // refactor with async await?
    API.getLikedSongs(this.state.current, this.state.offsetLength).then(
      (response: ITracksResponse) => {
        const isFetching = response.next ? true : false;
        const total = response.total;
        const current = response.next
          ? this.state.current + this.state.offsetLength
          : total;
        const percentage = Math.round(
          (response.next ? current / total : 1) * 100,
        );
        let frequentArtists = JSON.parse(
          JSON.stringify(this.state.frequentArtists),
        ); // bad
        const items = response.items.map((item: any) => ({
          artists: item.track.artists.map((artist: any) => {
            const name = artist.name;
            const currentCount = frequentArtists[name] || 0;
            frequentArtists[name] = currentCount + 1;
            return { name };
          }),
          id: item.track.id,
          name: item.track.name,
        }));

        if (!isFetching) {
          // sort by songs count and reduce it to top 5 results
          frequentArtists = Object.keys(frequentArtists)
            .sort((a, b) => frequentArtists[b] - frequentArtists[a])
            .slice(0, 5)
            .reduce((acc: any, cur: string) => {
              acc[cur] = frequentArtists[cur];
              return acc;
            }, {});
        }
        this.setState(
          {
            current,
            frequentArtists,
            isFetching,
            percentage,
            total,
            tracks: this.state.tracks.concat(items),
          },
          () => {
            if (response.next) {
              this.fetchSongs();
            }
          },
        );
      },
    );
  };

  public render() {
    const { current, total, percentage, tracks, isFetching } = this.state;
    const tracksReady = !isFetching && tracks.length > 0;
    const actionButton = tracksReady ? (
      <button onClick={this.downloadJSON} className="btn">
        Save
      </button>
    ) : (
      <button
        disabled={this.state.isFetching}
        onClick={this.startSongsFetching}
        className="btn"
      >
        Start
      </button>
    );
    const defaultAvatar = require("../assets/no-avatar.png");
    return (
      <div id="dumperView">
        <div className="userInfo">
          <img src={this.props.userInfo.avatar || defaultAvatar} />
          <h1>Hello, {this.props.userInfo.username}</h1>
        </div>
        <div className="card-deck">
          <article className="card">
            <header>Export your Liked Songs</header>
            <footer className="dumper-content">
              <div>
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    pathColor: "#1db954",
                    textColor: "#1db954",
                    // trailColor: "white"
                  })} // unable to apply css rules here for some dumb reason
                />
              </div>
              <div>{actionButton}</div>
            </footer>
          </article>
          <article className="card">
            <header>Export your playlists</header>
            <footer>Coming soon</footer>
          </article>
        </div>
        <FrequentArtists
          visible={!isFetching}
          likedSongs={this.state.frequentArtists}
        ></FrequentArtists>
      </div>
    );
  }
}
