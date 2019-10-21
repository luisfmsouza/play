import React from "react";
import styled from "styled-components";
import YouTube from "@u-wave/react-youtube";

import { playerContainer } from "./container";
import VideoForm from "./form";
import VideoQueue from "./queue";

const Container = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.sky};
  display: grid;
  grid-template-columns: auto 300px;
  grid-gap: 0 10px;
  grid-template-rows: auto 60px;
  grid-template-areas:
    "player list"
    "info form";
  margin-bottom: 10px;
`;

const Video = styled.div`
  height: 0;
  grid-area: player;
  padding-bottom: 56.25%;
  position: relative;
`;

const StyledYouTube = styled(YouTube)`
  position: absolute;
`;

const VideoInfo = styled.div`
  grid-area: info;
`;

const VideoTitle = styled.h1`
  color: ${({ theme }) => theme.colors.inkLight};
  font-size: 18px;
  margin: 10px 0 0 10px;
`;

const VideoArtist = styled.h2`
  color: ${({ theme }) => theme.colors.inkLightest};
  font-size: 12px;
  margin: 0 0 0 10px;
`;

const AddVideoButton = styled.button`
  background: transparent;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.inkLighter};
  color: ${({ theme }) => theme.colors.inkLighter};
  cursor: pointer;
  font-weight: 600;
  padding: 10px;
  text-transform: uppercase;
  transition: all 0.3s;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.ink};
    border-color: ${({ theme }) => theme.colors.ink};
    color: ${({ theme }) => theme.colors.skyLighter};
  }
`;

const Form = styled.div`
  align-items: center;
  display: grid;
  grid-area: form;
  position: relative;
`;

const Close = styled.button`
  background-color: white;
  border-radius: 20px;
  border: 0;
  color: ${({ theme }) => theme.colors.inkLight};
  cursor: pointer;
  display: block;
  font-weight: 600;
  margin: 10px auto;
  padding: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.skyLighter};
  }
`;

const AddFirstPlaylist = styled.button`
  background-color: white;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.inkLighter};
  color: ${({ theme }) => theme.colors.inkLighter};
  cursor: pointer;
  display: block;
  font-size: 18px;
  margin: 50px auto;
  padding: 10px;
  transform: all 0.3s;
  width: 230px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.inkLighter};
    color: ${({ theme }) => theme.colors.skyLighter};
  }
`;

const Player = ({
  playlists,
  currentPlaylist,
  currentVideo,
  showForm,
  selectVideo,
  toggleShowForm,
  addPlaylist,
  nextVideo
}) => {
  const playlist = playlists && playlists[currentPlaylist];
  const hasPlaylist = Boolean(playlist);
  const hasVideo = hasPlaylist && Boolean(playlist.length);

  if (hasVideo) {
    return (
      <Container>
        <Video>
          <StyledYouTube
            video={playlist[currentVideo].videoId}
            autoplay
            showRelatedVideos={false}
            showInfo={false}
            height="100%"
            width="100%"
            onStateChange={event => {
              if (event.data === window.YT.PlayerState.ENDED) {
                nextVideo();
              }
            }}
          />
        </Video>

        <VideoInfo>
          <VideoTitle>{playlist[currentVideo].title}</VideoTitle>
          <VideoArtist>{playlist[currentVideo].artist}</VideoArtist>
        </VideoInfo>

        <VideoQueue
          playlist={playlist}
          currentVideo={currentVideo}
          selectVideo={selectVideo}
        />

        <Form>
          {showForm ? (
            <>
              <Close onClick={toggleShowForm}>
                close <strong>x</strong>
              </Close>
              <VideoForm />
            </>
          ) : (
            <AddVideoButton onClick={toggleShowForm}>
              + add new video
            </AddVideoButton>
          )}
        </Form>
      </Container>
    );
  }

  if (hasPlaylist) {
    return <VideoForm />;
  }

  return (
    <AddFirstPlaylist onClick={addPlaylist}>
      + Add your first playlist
    </AddFirstPlaylist>
  );
};

export default playerContainer(Player);
