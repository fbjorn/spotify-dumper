import { IUserInfo, IUserResponse } from "./types";

export function saveUserInfo(response: IUserResponse) {
  localStorage.setItem("username", response.display_name);
  if (response.images.length) {
    localStorage.setItem("avatar", response.images[0].url);
  }
}

export function getUserInfo(): IUserInfo {
  if (getAuthToken()) {
    return {
      avatar: localStorage.getItem("avatar"),
      username: localStorage.getItem("username"),
    };
  } else {
    clearCache();
    return { username: null, avatar: null };
  }
}

export function getAuthToken(): string {
  const match = document.cookie.match(/Authorization=(.*)/);
  const token = match ? decodeURIComponent(match[1]) : null;
  return token;
}

export function setTokenCookie(token: string, expires: number) {
  const expireDate = new Date(new Date().getTime() + expires * 1000);
  document.cookie = `Authorization=${token}; expires=${expireDate.toUTCString()}`;
}

export function clearCache() {
  document.cookie =
    "Authorization=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  localStorage.removeItem("username");
  localStorage.removeItem("avatar");
}

export function saveJSON(json: object, name: string) {
  const jsonString = encodeURIComponent(JSON.stringify(json));
  const dataStr = `data:text/json;charset=utf-8,${jsonString}`;
  const node = document.createElement("a");
  node.setAttribute("href", dataStr);
  node.setAttribute("download", `${name}.json`);
  document.body.appendChild(node); // required for firefox
  node.click();
  node.remove();
}
