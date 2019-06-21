export interface IUserResponse {
  display_name: string;
  images: Array<{ url: string }>;
}

export interface IUserInfo {
  username: string;
  avatar: string;
}

export interface ITrack {
  name: string;
  id: string;
  artists: Array<{ name: string }>;
}

export interface ITracksResponse {
  next: string;
  items: Array<{ added_at: string; track: ITrack }>;
  total: number;
}
