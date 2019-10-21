import { connect } from "react-redux";
import {
  setArtist,
  setTitle,
  setVideoId,
  selectVideo,
  addVideo,
  addPlaylist,
  selectPlaylist,
  toggleShowForm,
  nextVideo
} from "../state/actions";

export const formContainer = connect(
  state => ({
    artist: state.form.artist,
    title: state.form.title,
    videoId: state.form.videoId,
    playlists: state.playlists
  }),
  {
    setArtist,
    setTitle,
    setVideoId,
    addVideo
  }
);

export const playerContainer = connect(
  state => ({
    playlists: state.playlists,
    currentPlaylist: state.currentPlaylist,
    currentVideo: state.currentVideo,
    showForm: state.showForm
  }),
  {
    selectVideo,
    toggleShowForm,
    addPlaylist,
    nextVideo
  }
);

export const playlistContainer = connect(
  state => ({
    playlists: state.playlists,
    currentPlaylist: state.currentPlaylist
  }),
  {
    addPlaylist,
    selectPlaylist
  }
);
