import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import * as colors from "../../theme/colors";

import Playlist from "../playlist";

describe("Playlist component", () => {
  const build = state => {
    const store = {
      getState: () => state,
      dispatch: jest.fn(),
      subscribe: jest.fn()
    };

    return renderer
      .create(
        <Provider store={store}>
          <ThemeProvider theme={{ colors }}>
            <Playlist store={store} />
          </ThemeProvider>
        </Provider>
      )
      .toJSON();
  };

  describe("when there is playlists", () => {
    it("renders default component", () => {
      const state = {
        playlists: [
          [
            {
              artist: "Artist 1",
              title: "Title 1",
              videoId: "MeSu5_Do8P8"
            },
            {
              artist: "Artist 2",
              title: "Title 2",
              videoId: "249i5jNRClU"
            }
          ],
          [],
          [
            {
              artist: "Artist 3",
              title: "Title 3",
              videoId: "qSeaR7Dqvdc"
            },
            {
              artist: "Artist 4",
              title: "Title 4",
              videoId: "Dw5orx_47uY"
            },
            {
              artist: "Artist 5",
              title: "Title 5",
              videoId: "sNFndSeEt0w"
            }
          ],
          [
            {
              artist: "Artist 6",
              title: "Title 6",
              videoId: "ykHiSn1K1E"
            }
          ]
        ],
        currentPlaylist: 0,
        currentVideo: 1,
        form: { artist: "", title: "", videoId: "" }
      };

      const expected = build(state);

      expect(expected).toMatchSnapshot();
    });

    describe("when does not have videos on playlist", () => {
      it("renders a placeholder message", () => {
        const state = {
          playlists: [[]],
          currentPlaylist: 0,
          currentVideo: 1,
          form: { artist: "", title: "", videoId: "" }
        };

        const expected = build(state);

        expect(expected).toMatchSnapshot();
      });
    });
  });

  describe("when does not have playlists", () => {
    it("renders nothing", () => {
      const state = {
        playlists: null,
        currentPlaylist: null,
        currentVideo: null,
        form: { artist: "", title: "", videoId: "" }
      };

      const expected = build(state);

      expect(expected).toMatchSnapshot();
    });
  });
});
