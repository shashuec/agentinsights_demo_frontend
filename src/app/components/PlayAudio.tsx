import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import WaveSurfer from "wavesurfer.js";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";

export const PlayAudio = ({ audio, setCurrentTime }: any) => {
  const containerRef = useRef<any>();
  const waveSurferRef = useRef<any>({
    isPlaying: () => false,
  });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      barWidth: 0,
      barHeight: 0.7,
      cursorWidth: 0,
      waveColor: "#BFDBFE",
      progressColor: "#2563EB",
    });
    waveSurfer.load(audio);
    waveSurfer.on("ready", () => {
      waveSurferRef.current = waveSurfer;
    });

    waveSurfer.on("audioprocess", (currentTime) => {
      if (setCurrentTime) {
        setCurrentTime(currentTime);
      }
    });

    return () => {
      waveSurfer.destroy();
    };
  }, [audio]);
  return (
    <div className="grid grid-cols-[40px_1fr] items-center">
      <button
        onClick={() => {
          waveSurferRef.current.playPause();
          setIsPlaying((play) => {
            return !play;
          });
        }}
        className="w-[30px] h-[10px] mb-1 text-blue-600"
        type="button"
      >
        {isPlaying ? (
          <FaPauseCircle size="2rem" />
        ) : (
          <FaPlayCircle size="2rem" />
        )}
      </button>
      <div className="pl-4 mt-4" ref={containerRef} />
    </div>
  );
};
