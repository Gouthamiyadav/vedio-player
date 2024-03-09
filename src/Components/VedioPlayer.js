import React, { useRef, useState } from "react";
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
} from "@fortawesome/free-solid-svg-icons";

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const Video = styled.video`
  width: 100%;
  height: auto;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 4px;
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
  top: -48px;
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
  margin-left: 10px;
  border-radius: 8px;
`;

const VideoPlayer = ({ src }) => {
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

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
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
      setIsFullScreen(true);
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

  // const toggleMute = () => {
  //   const newMuted = !isMuted;
  //   videoRef.current.muted = newMuted;
  //   setIsMuted(newMuted);
  // };

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

  return (
    <VideoContainer>
      <Video
        ref={videoRef}
        src={src}
        onTimeUpdate={updateTime}
        onLoadedMetadata={updateTime}
        onEnded={() => setIsPlaying(false)}
        autoPlay
        onClick={handleVideoClick}
        playbackRate={speed}
        volume={volume}
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
    </VideoContainer>
  );
};

export default VideoPlayer;
