import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faSearch } from "@fortawesome/free-solid-svg-icons";

const PlaylistItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  background-color: ${(props) => (props.active ? "#998181" : "transparent")};
  border-radius: 5px;
  cursor: pointer;
`;

const Thumbnail = styled.video`
  width: 100px;
  height: auto;
  margin-right: 20px;
`;

const PlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 70px;
`;

const Loader = styled.div`
  display: ${(props) => (props.loading ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 999;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  position: absolute;
  right: 650px;
  top: 30px;
  border: 1px solid #ccc;
  border-radius: 30px;
  width: 600px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 5px;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  color: #2196f3;
`;

const Name = styled.p`
  font-size: 25px;
  display: flex;
  align-self: center;
  margin: 0px 0px 10px 0px;
  color: #2196f3;
`;

const Playlist = ({ videos, onSelectVideo }) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const videoRef = useRef(null);

  useEffect(() => {
    handleVideoClick(0);
  }, []);

  const handleVideoClick = (index) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedVideoIndex(index);
      onSelectVideo(index);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = videos.filter((video) =>
      video.title.toLowerCase().includes(query)
    );
    setFilteredVideos(filtered);
  };

  return (
    <>
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <SearchIcon icon={faSearch} />
      </SearchBar>
      <PlaylistContainer>
        <Name> Playlists for you</Name>
        <Loader loading={loading}>
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </Loader>
        {filteredVideos.map((video, index) => (
          <PlaylistItem
            key={index}
            active={selectedVideoIndex === index}
            onClick={() => handleVideoClick(index)}
          >
            <Thumbnail
              ref={videoRef}
              src={video.sources}
              onClick={() => handleVideoClick(index)}
            />
            {video.title}
          </PlaylistItem>
        ))}
      </PlaylistContainer>
    </>
  );
};

export default Playlist;
