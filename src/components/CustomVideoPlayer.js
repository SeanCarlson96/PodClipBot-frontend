
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const CustomVideoPlayer = ({ src, filename, clipName }) => {
  const [videoError, setVideoError] = useState(false);
  
  const handleDownload = () => {
    window.open(src, "_blank");
  };

  const handleVideoError = () => {
    setVideoError(true);
  }

  return (
    <div style={{ position: "relative" }}>
      {videoError ? (
        <div className="clip-box flex items-center pb-5">
          <div className="w-full text-center">
            <p className='text-sm text-red-500'>{clipName} not found</p>
          </div>
        </div>
      ) : (
        <>
          <video
            width="152"
            height="270"
            controls
            preload="auto"
            onError={handleVideoError}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div
            className="d-flex justify-content-center"
            style={{
                position: "absolute",
                top: "5%",
                right: "5%",
            }}
          >
            <button
              onClick={handleDownload}
              className="btn btn-secondary"
              style={{ opacity: 0.7 }}
            >
              <FontAwesomeIcon icon={faDownload} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomVideoPlayer;
