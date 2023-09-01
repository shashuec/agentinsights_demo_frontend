import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import WaveSurfer from "wavesurfer.js";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";

export const PlayAudio = ({ audio }: any) => {
  console.log(audio);
  const containerRef = useRef<any>();
  const waveSurferRef = useRef<any>({
    isPlaying: () => false,
  });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      barWidth: 0,
      barHeight: 1,
      cursorWidth: 0,
      waveColor: "#900090",
      progressColor: "#450476",
    });
    waveSurfer.load(audio);
    waveSurfer.on("ready", () => {
      waveSurferRef.current = waveSurfer;
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
        className="w-[30px] h-[30px]"
        type="button"
      >
        {isPlaying ? <FaPauseCircle size="3em" /> : <FaPlayCircle size="3em" />}
      </button>
      <div className="pl-4 mt-4" ref={containerRef} />
    </div>
  );
};
