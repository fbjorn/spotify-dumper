import Axios from "axios";
import Conf from "../conf";
import { getAuthToken } from "./utils";

class SpotifyAPI {
  public getMe() {
    return this.get("/me");
  }

  public getLikedSongs(offset: number, limit: number) {
    return this.get("/me/tracks", { offset, limit });
  }

  get headers() {
    return {
      Authorization: `Bearer ${getAuthToken()}`,
    };
  }

  public getLoginURL(state: string) {
    return (
      Conf.SPOTIFY_AUTH_URL +
      `?client_id=${Conf.OAUTH_CLIENT_ID}` +
      `&redirect_uri=${encodeURI(Conf.OAUTH_REDIRECT_URI)}` +
      `&scope=${Conf.REQUIRED_SCOPES.join("&")}` +
      `&state=${state}` +
      "&response_type=token"
    );
  }

  private get(path: string, params?: object): Promise<any> {
    const url = `${Conf.SPOTIFY_API_URL}${path}`;
    const requestParams = { headers: this.headers, params: params || {} };
    return Axios.get(url, requestParams).then((response: any) => {
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 429) {
        // handle
        const retryAfter = response.headers["retry-after"];
        // const retryAfter = 1000;
        setTimeout(() => this.get(path, params), retryAfter);
      }
    });
  }
}

export default new SpotifyAPI();
