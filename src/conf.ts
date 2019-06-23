declare var PRODUCTION: boolean; // set by webpack

const config = {
  OAUTH_CLIENT_ID: "dd307fd1c1b94a5cbaaef0e208b82c16",
  OAUTH_REDIRECT_URI: "http://localhost:8080/",
  PUBLIC_URL: "/",
  REQUIRED_SCOPES: ["user-library-read"],
  SPOTIFY_API_URL: "https://api.spotify.com/v1",
  SPOTIFY_AUTH_URL: "https://accounts.spotify.com/authorize",
};

if (PRODUCTION) {
  config.OAUTH_REDIRECT_URI = "https://fbjorn.github.io/spd-pages/";
  config.PUBLIC_URL = "/spd-pages";
}

export default config;
