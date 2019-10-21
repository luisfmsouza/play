import React from "react";
import styled from "styled-components";

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

const Video = styled.div`
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

const VideoTitle = styled.p`
  align-self: flex-end;
  color: ${({ theme }) => theme.colors.inkLight};
  font-size: 16px;
  font-weight: 600;
  grid-area: title;
  margin: 0;
  text-align: left;
`;

const VideoArtist = styled.p`
  color: ${({ theme }) => theme.colors.inkLightest};
  grid-area: artist;
  margin: 0;
  text-align: left;
`;

const Queue = ({ playlist, currentVideo, selectVideo }) => (
  <List>
    <SectionTitle>Videos</SectionTitle>
    {playlist.map(({ artist, title, videoId }, index) => (
      <VideoButton key={index} onClick={() => selectVideo(index)}>
        <Video active={index === currentVideo}>
          <Thumbnail
            src={`https://img.youtube.com/vi/${videoId}/default.jpg`}
            width="100"
          />

          <VideoTitle>{title}</VideoTitle>
          <VideoArtist>{artist}</VideoArtist>
        </Video>
      </VideoButton>
    ))}
  </List>
);

export default Queue;
