import { connect } from "react-redux";
import {
  setArtist,
  setTitle,
  setUrl,
  selectVideo,
  addVideo,
  addPlaylist,
  selectPlaylist,
  toggleShowForm
} from "../state/actions";

export const formContainer = connect(
  state => ({
    artist: state.form.artist,
    title: state.form.title,
    url: state.form.url,
    hasPlaylists: Boolean(state.playlists)
  }),
  {
    setArtist,
    setTitle,
    setUrl,
    addVideo
  }
);

export const playerContainer = connect(
  state => ({
    playlist: state.playlists && state.playlists[state.currentPlaylist],
    currentVideo: state.currentVideo,
    showForm: state.showForm
  }),
  {
    selectVideo,
    toggleShowForm,
    addPlaylist
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
