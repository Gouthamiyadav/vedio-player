import React, { useState } from "react";
import VedioPlayer from "./Components/VedioPlayer";
import UpperNavBar from "./Components/UpNavBar";
import Playlist from "./Components/PlayList";
import styled, { ThemeProvider } from "styled-components";
import { mediaJSON } from "./mediaJSON";

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const lightTheme = {
  background: "#ffffff",
  text: "#000000",
};

const darkTheme = {
  background: "#333333",
  text: "#ffffff",
};

const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
`;

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleSelectVideo = (index) => {
    setCurrentVideoIndex(index);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div>
          <UpperNavBar toggleMode={toggleMode} isDarkMode={isDarkMode} />
          <AppContainer>
            <VedioPlayer
              src={mediaJSON.categories[0].videos[currentVideoIndex].sources}
              title={mediaJSON.categories[0].videos[currentVideoIndex].title}
              description={
                mediaJSON.categories[0].videos[currentVideoIndex].description
              }
            />
            <Playlist
              videos={mediaJSON.categories[0].videos}
              onSelectVideo={handleSelectVideo}
            />
          </AppContainer>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default App;
