import initialState from "./state";
import {
  ADD_PLAYLIST,
  ADD_VIDEO,
  NEXT_VIDEO,
  SELECT_PLAYLIST,
  SELECT_VIDEO,
  SET_ARTIST,
  SET_TITLE,
  SET_VIDEO_ID,
  TOGGLE_SHOW_FORM
} from "./types";

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PLAYLIST: {
      const playlists = state.playlists ? [...state.playlists, []] : [[]];
      const currentPlaylist = playlists.length - 1;

      return { ...state, playlists, currentPlaylist, showForm: true };
    }

    case ADD_VIDEO: {
      const playlists = state.playlists.map((playlist, index) => {
        const isCurrentPlaylist = index === state.currentPlaylist;

        return isCurrentPlaylist ? [...playlist, state.form] : playlist;
      });

      const form = { artist: "", title: "", videoId: "" };

      const currentVideo = state.currentVideo === null ? 0 : state.currentVideo;

      return {
        ...state,
        playlists,
        form,
        currentVideo,
        showForm: false
      };
    }

    case NEXT_VIDEO: {
      const isPlayingLastVideo = state.currentVideo < state.playlists.length;

      return isPlayingLastVideo
        ? { ...state, currentVideo: state.currentVideo + 1 }
        : { ...state, currentVideo: 0 };
    }

    case SELECT_VIDEO: {
      return { ...state, currentVideo: payload };
    }

    case SELECT_PLAYLIST: {
      return { ...state, currentPlaylist: payload, currentVideo: 0 };
    }

    case SET_ARTIST: {
      return { ...state, form: { ...state.form, artist: payload } };
    }

    case SET_TITLE: {
      return { ...state, form: { ...state.form, title: payload } };
    }

    case SET_VIDEO_ID: {
      return { ...state, form: { ...state.form, videoId: payload } };
    }

    case TOGGLE_SHOW_FORM: {
      return { ...state, showForm: !state.showForm };
    }

    default:
      return state;
  }
};
