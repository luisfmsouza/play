import {
  ADD_PLAYLIST,
  ADD_VIDEO,
  NEXT_VIDEO,
  SELECT_PLAYLIST,
  SELECT_VIDEO,
  SET_ARTIST,
  SET_TITLE,
  SET_URL
} from "./types";

export const addPlaylist = () => ({
  type: ADD_PLAYLIST
});

export const addVideo = () => ({
  type: ADD_VIDEO
});

export const nextVideo = () => ({
  type: NEXT_VIDEO
});

export const selectVideo = videoId => ({
  type: SELECT_VIDEO,
  payload: videoId
});

export const selectPlaylist = playlistId => ({
  type: SELECT_PLAYLIST,
  payload: playlistId
});

export const setArtist = artist => ({
  type: SET_ARTIST,
  payload: artist
});

export const setTitle = title => ({
  type: SET_TITLE,
  payload: title
});

export const setUrl = url => ({
  type: SET_URL,
  payload: url
});
