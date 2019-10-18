import React from "react";
import styled from "styled-components";

import { formContainer } from "./container";

const Container = styled.div`
  background-color: white;
  max-width: 300px;
  padding: 10px 0;
  width: 100%;
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
  url,
  hasPlaylists,
  setArtist,
  setTitle,
  setUrl,
  addVideo
}) => {
  const handleArtistChange = event => {
    setArtist(event.target.value);
  };

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleUrlChange = event => {
    setUrl(event.target.value);
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
          <Label htmlFor="url">URL:</Label>
          <Input
            id="url"
            required
            type="text"
            value={url}
            onChange={handleUrlChange}
          />
          <Button type="submit">Add video</Button>
        </form>
      </Container>
    );
  }

  return <></>;
};

export default formContainer(Form);
