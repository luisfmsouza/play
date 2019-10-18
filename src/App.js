import React from "react";
import { Provider } from "react-redux";
import styled, { ThemeProvider } from "styled-components";

import store from "./state";
import * as colors from "./theme/colors";
import Player from "./components/player";
import Playlist from "./components/playlist";

const Content = styled.div`
  font-family: Roboto, Arial;
  max-width: 1024px;
  margin: auto;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.ink};
  font-size: 24px;
`;

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={{ colors }}>
      <Content>
        <header>
          <Title>LuisTUBE</Title>
        </header>
        <Player />
        <Playlist />
      </Content>
    </ThemeProvider>
  </Provider>
);

export default App;
