import React from "react";
import styled from "styled-components";

import { playlistContainer } from "./container";

const Container = styled.div`
  display: grid;
  grid-template-columns: 220px auto;
`;

const List = styled.div`
  overflow: scroll;
  white-space: nowrap;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.inkLight};
  font-size: 24px;
  margin: 0 5px;
  text-transform: uppercase;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  margin: 5px;
  padding: 0;
  position: relative;
`;

const Thumbnail = styled.img`
  display: block;
  height: 118px;
  width: 210px;
`;

const Overlay = styled.div`
  align-items: center;
  background-color: #c4cdd5a1;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: all 0.3s;

  &:hover {
    background-color: #454f5ba1;
  }
`;

const Video = styled.span`
  font-size: 12px;
  color: #fff2fc;
`;

const AddVideoPlaylist = styled.button`
  background: transparent;
  border: none;
  background-color: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.skyLighter};
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  height: 118px;
  margin: 5px;
  padding: 0;
  text-transform: uppercase;
  transition: all 0.3s;
  vertical-align: bottom;
  width: 210px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.inkLighter};
  }
`;

const Playlist = ({
  playlists,
  currentPlaylist,
  selectPlaylist,
  addPlaylist
}) =>
  playlists && (
    <>
      <Title>Playlists</Title>
      <Container>
        <AddVideoPlaylist onClick={addPlaylist}>
          + add playlist
        </AddVideoPlaylist>
        <List>
          {playlists.map((playlist, index) => (
            <Button key={index} onClick={() => selectPlaylist(index)}>
              <Thumbnail src="https://placekitten.com/210/118" />
              {index !== currentPlaylist && (
                <Overlay>
                  <Video>Play {playlist.length} videos</Video>
                </Overlay>
              )}
            </Button>
          ))}
        </List>
      </Container>
    </>
  );

export default playlistContainer(Playlist);