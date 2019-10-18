import React from "react";
import styled from "styled-components";

import { playerContainer } from "./container";
import VideoForm from "./form";

const Container = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.sky};
  display: grid;
  grid-template-columns: auto 300px;
  grid-template-rows: auto 60px;
  grid-template-areas:
    "player list"
    "title form";
  margin-bottom: 10px;
`;

const PlayerContent = styled.div`
  grid-area: player;
`;

const List = styled.div`
  grid-area: list;
  max-height: 320px;
  overflow: scroll;
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.inkLight};
  font-size: 24px;
  margin: 0;
  text-transform: uppercase;
`;

const VideoButton = styled.button`
  background-color: ${({ theme }) => theme.colors.skyLight};
  border: none;
  cursor: pointer;
  margin: 10px 0;
  padding: 0;
  width: 100%;
`;

const Item = styled.div`
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 100px auto;
  grid-template-areas:
    "video title"
    "video artist";
  overflow: hidden;
  position: relative;

  &:after {
    background-color: ${({ theme }) => theme.colors.inkLightest};
    content: ${({ active }) => active && `""`};
    height: 10px;
    position: absolute;
    right: -5px;
    top: 50%;
    top: calc(50% - 5px);
    transform: rotate(45deg);
    width: 10px;
  }
`;

const Thumbnail = styled.img`
  grid-area: video;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.inkLight};
  font-size: 18px;
  margin: 10px 0 0 10px;
`;

const Artist = styled.h2`
  color: ${({ theme }) => theme.colors.inkLightest};
  font-size: 12px;
  margin: 0 0 0 10px;
`;

const ListTitle = styled.p`
  align-self: flex-end;
  color: ${({ theme }) => theme.colors.inkLight};
  font-size: 16px;
  font-weight: 600;
  grid-area: title;
  margin: 0;
  text-align: left;
`;

const ListArtist = styled.p`
  color: ${({ theme }) => theme.colors.inkLightest};
  grid-area: artist;
  margin: 0;
  text-align: left;
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

const TitleContainer = styled.div`
  grid-area: title;
`;

const Form = styled.div`
  align-items: center;
  display: grid;
  grid-area: form;
  position: relative;
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

const Player = ({
  playlist,
  currentVideo,
  showForm,
  selectVideo,
  toggleShowForm,
  addPlaylist
}) => {
  const hasPlaylist = Boolean(playlist);
  const hasVideo = hasPlaylist && Boolean(playlist.length);

  if (hasVideo) {
    return (
      <Container>
        <PlayerContent>
          <iframe
            width="560"
            height="315"
            src={playlist[currentVideo].url}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={playlist[currentVideo].title}
          ></iframe>
        </PlayerContent>

        <TitleContainer>
          <Title>{playlist[currentVideo].title}</Title>
          <Artist>{playlist[currentVideo].artist}</Artist>
        </TitleContainer>

        <List>
          <SectionTitle>Videos</SectionTitle>
          {playlist.map(({ artist, title, url }, index) => (
            <VideoButton key={index} onClick={() => selectVideo(index)}>
              <Item active={index === currentVideo}>
                <Thumbnail src="https://placekitten.com/100/56" />
                <ListTitle>{title}</ListTitle>
                <ListArtist>{artist}</ListArtist>
              </Item>
            </VideoButton>
          ))}
        </List>

        <Form>
          {showForm && (
            <>
              <Close onClick={toggleShowForm}>
                close <strong>x</strong>
              </Close>
              <VideoForm />
            </>
          )}

          {!showForm && (
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
