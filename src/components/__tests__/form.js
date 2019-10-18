import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import * as colors from "../../theme/colors";

import Form from "../form";

describe("Form component", () => {
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
            <Form store={store} />
          </ThemeProvider>
        </Provider>
      )
      .toJSON();
  };

  describe("when there is playlists", () => {
    it("renders default component", () => {
      const state = {
        playlists: [[]],
        currentPlaylist: 0,
        currentVideo: null,
        form: { artist: "artist", title: "title", url: "https://url.com" },
        showForm: true
      };

      const expected = build(state);

      expect(expected).toMatchSnapshot();
    });
  });

  describe("when does not have playlists", () => {
    it("does not render the Form", () => {
      const state = {
        playlists: null,
        currentPlaylist: null,
        currentVideo: null,
        form: { artist: "", title: "", url: "" },
        showForm: false
      };

      const expected = build(state);

      expect(expected).toMatchSnapshot();
    });
  });
});
