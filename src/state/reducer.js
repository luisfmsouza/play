import initialState from "./state";
import {
  ADD_PLAYLIST,
  ADD_VIDEO,
  NEXT_VIDEO,
  SELECT_PLAYLIST,
  SELECT_VIDEO
} from "./types";

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PLAYLIST: {
      const playlists = state.playlists ? [...state.playlists, []] : [[]];

      return { ...state, playlists };
    }

    case ADD_VIDEO: {
      const playlists = state.playlists.map((playlist, index) => {
        const isCurrentPlaylist = index === state.currentPlaylist;

        return isCurrentPlaylist ? [...playlist, state.form] : playlist;
      });

      const form = { artist: "", title: "", url: "" };

      return {
        ...state,
        playlists,
        form
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

    default:
      return state;
  }
};
