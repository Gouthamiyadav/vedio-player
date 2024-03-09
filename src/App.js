import React from "react";
// import Playlist from "./Components/PlayList";
import VedioPlayer from "./Components/VedioPlayer";
// import { mediaJSON } from "./mediaJSON";

const App = () => {
  // const { videos } = mediaJSON.categories[0];

  return (
    <div>
      <VedioPlayer src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
    </div>
  );
};

export default App;
