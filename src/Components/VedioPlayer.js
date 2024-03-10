import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faExpand,
  faCompress,
  faVolumeUp,
  faVolumeMute,
  faCog,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin-left: 20px;
  // margin-top: 80px;
`;

const Video = styled.video`
  width: 100%;
  height: auto;
`;

const Controls = styled.div`
  position: absolute;
  // top: 415px;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;

const VolumeSeekBar = styled.input`
  left: -25px;
  top: -132px;
  appearance: slider-vertical;
  size: 10px;
  position: absolute;
`;

const SeekBar = styled.input`
  width: 100%;
  margin: 0 5px;
`;

const TimeDisplay = styled.div`
  white-space: nowrap;
`;

const SettingsButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;

const SettingsMenu = styled.div`
  position: absolute;
  top: -84px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px;
  display: none;
  border-radius: 10px;
  &.show {
    display: block;
  }
`;

const SettingsItem = styled.div`
  cursor: pointer;
  padding: 5px;
`;

const SpeedSelector = styled.select`
  background-color: white;
  color: black;
  border: none;
  padding: 5px;
  margin-left: 22px;
  border-radius: 8px;
`;

const Title = styled.h2`
  margin-top: 50px;
`;

const LikeButton = styled.button`
  background-color: #3cba9f;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #21825c;
  }
`;

const DislikeButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ba281d;
  }
`;

const VideoPlayer = ({ src, title, description }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [showVolumeBar, setShowVolumeBar] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeStatus, setLikeStatus] = useState(null);

  useEffect(() => {
    const handleKeydown = (event) => {
      switch (event.key) {
        case " ":
          togglePlay();
          break;
        case "ArrowLeft":
          videoRef.current.currentTime -= 10;
          break;
        case "ArrowRight":
          videoRef.current.currentTime += 10;
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [volume]);

  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleSpeedChange = (e) => {
    const selectedSpeed = parseFloat(e.target.value);
    setSpeed(selectedSpeed);
    videoRef.current.playbackRate = selectedSpeed;
  };

  const handleFullScreen = () => {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullScreen(false);
    }
  };

  const toggleSettingsMenu = () => {
    setShowSettings(!showSettings);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const updateTime = () => {
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration);
  };

  const handleVideoClick = () => {
    togglePlay();
  };

  const handleLike = () => {
    if (likeStatus === "liked") {
      setLikeStatus(null);
      setLikes(likes - 1);
    } else {
      setLikeStatus("liked");
      setLikes(likes + 1);
      if (likeStatus === "disliked") {
        setDislikes(dislikes - 1);
      }
    }
  };

  const handleDislike = () => {
    if (likeStatus === "disliked") {
      setLikeStatus(null);
      setDislikes(dislikes - 1);
    } else {
      setLikeStatus("disliked");
      setDislikes(dislikes + 1);
      if (likeStatus === "liked") {
        setLikes(likes - 1);
      }
    }
  };
  return (
    <VideoContainer>
      <Video
        ref={videoRef}
        src={src}
        onTimeUpdate={updateTime}
        onLoadedMetadata={updateTime}
        autoPlay
        onClick={handleVideoClick}
        playbackRate={speed}
        volume={volume}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
      <Controls>
        <ControlButton onClick={togglePlay}>
          {isPlaying ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </ControlButton>
        <ControlButton onClick={() => setShowVolumeBar(!showVolumeBar)}>
          {isMuted ? (
            <FontAwesomeIcon icon={faVolumeMute} />
          ) : (
            <FontAwesomeIcon icon={faVolumeUp} />
          )}
        </ControlButton>
        {showVolumeBar && (
          <VolumeSeekBar
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
          />
        )}
        <SeekBar
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
        />
        <TimeDisplay>
          {formatTime(currentTime)} / {formatTime(duration)}
        </TimeDisplay>
        <SettingsButton onClick={toggleSettingsMenu}>
          <FontAwesomeIcon icon={faCog} />
        </SettingsButton>
        {showSettings && (
          <SettingsMenu className={showSettings ? "show" : ""}>
            <SettingsItem>
              Speed
              <SpeedSelector value={speed} onChange={handleSpeedChange}>
                <option value={0.25}>0.25</option>
                <option value={0.5}>0.5</option>
                <option value={0.75}>0.75</option>
                <option value={1}>Normal</option>
                <option value={1.25}>1.25</option>
                <option value={1.5}>1.5</option>
                <option value={1.75}>1.75</option>
                <option value={2}>2</option>
              </SpeedSelector>
            </SettingsItem>
          </SettingsMenu>
        )}
        <ControlButton onClick={handleFullScreen}>
          {isFullScreen ? (
            <FontAwesomeIcon icon={faCompress} />
          ) : (
            <FontAwesomeIcon icon={faExpand} />
          )}
        </ControlButton>
      </Controls>
      <Title>{title}</Title>
      <p>{description}</p>
      <div>
        <LikeButton onClick={handleLike} isActive={likeStatus === "liked"}>
          <FontAwesomeIcon icon={faThumbsUp} /> {likes}
        </LikeButton>
        <DislikeButton
          onClick={handleDislike}
          isActive={likeStatus === "disliked"}
        >
          <FontAwesomeIcon icon={faThumbsDown} /> {dislikes}
        </DislikeButton>
      </div>
    </VideoContainer>
  );
};

export default VideoPlayer;
