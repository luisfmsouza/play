import React from "react";
import styled from "styled-components";

import { formContainer } from "./container";

const Container = styled.div`
  background-color: white;
  box-sizing: border-box;
  max-width: 300px;
  padding: 10px;
  width: 100%;
  z-index: 1;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.inkLighter};
  display: block;
  font-size: 12px;
  font-weight: 600;
  margin-top: 10px;
  text-transform: uppercase;
`;

const Input = styled.input`
  box-sizing: border-box;
  margin: 0;
  padding: 10px 5px;
  width: 100%;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.inkLighter};
  border-radius: 10px;
  border: 0;
  color: ${({ theme }) => theme.colors.skyLighter};
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  margin-top: 20px;
  padding: 10px;
  text-transform: uppercase;
  transition: all 0.3s;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.ink};
  }
`;

const Form = ({
  artist,
  title,
  videoId,
  hasPlaylists,
  setArtist,
  setTitle,
  setVideoId,
  addVideo
}) => {
  const handleArtistChange = event => {
    setArtist(event.target.value);
  };

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleVideoIdChange = event => {
    setVideoId(event.target.value);
  };

  const handleSubmitForm = event => {
    event.preventDefault();

    addVideo();
  };

  if (hasPlaylists) {
    return (
      <Container>
        <form onSubmit={handleSubmitForm}>
          <Label htmlFor="artist">Artist:</Label>
          <Input
            id="artist"
            required
            type="text"
            value={artist}
            onChange={handleArtistChange}
          />
          <Label htmlFor="title">Title:</Label>
          <Input
            id="title"
            required
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
          <Label htmlFor="videoId">Youtube video ID:</Label>
          <Input
            id="videoId"
            required
            type="text"
            value={videoId}
            onChange={handleVideoIdChange}
          />
          <Button type="submit">Add video</Button>
        </form>
      </Container>
    );
  }

  return <></>;
};

export default formContainer(Form);
