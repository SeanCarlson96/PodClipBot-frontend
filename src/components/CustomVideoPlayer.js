import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const CustomVideoPlayer = ({ src, filename }) => {
  const handleDownload = () => {
    window.open(src, "_blank");
  };

  return (
    <div style={{ position: "relative" }}>
      <video
        width="152"
        height="270"
        controls
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
    </div>
  );
};

export default CustomVideoPlayer;
