import React, { useEffect, useState } from "react";
import { IoTimerOutline } from "react-icons/io5";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

import moment from "moment";

interface TranscriptBoxProps {
  transcript: Array<{
    start: number;
    end: number;
    text: string;
    speaker: number;
    id: number;
  }>;
}

const TranscriptBox = ({ transcript, currentTime }: any) => {
  const [showMore, setShowMore] = useState(false);
  // const words = transcript.split(" ");

  function formatDuration(seconds: number) {
    const duration = moment.duration(seconds, "seconds");

    // If the duration is less than an hour, format as MM:SS
    if (duration.asHours() < 1) {
      return moment.utc(duration.asMilliseconds()).format("mm:ss");
    }

    // If the duration is an hour or more, format as HH:MM:SS
    return moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
  }

  function highlightTranscript(item: any) {
    if (item.start < currentTime && currentTime < item.end) {
      return "bg-blue-500 text-white";
    }
  }

  return (
    <div className="mt-2 text-sm py-2">
      <div className="text-lg pb-2 font-bold">Transcript</div>
      <div className="text-gray-700 max-h-96 overflow-y-scroll pr-4">
        {typeof transcript == "string"
          ? JSON.stringify(transcript)
          : transcript.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className={`px-3 py-1 mb-1 ${highlightTranscript(
                    item
                  )} rounded-md`}
                >
                  <p className="">
                    <span className="bg-gray-100 px-1 rounded-sm text-gray-700">
                      <span className="text-base">
                        <IoTimerOutline className="inline-block mb-[2px]" />
                      </span>{" "}
                      {formatDuration(item.start)}
                    </span>
                    <span className="ml-1 bg-gray-100 px-1 rounded-sm font-bold text-gray-700">
                      <span className="text-base">
                        <HiOutlineSpeakerWave className="inline-block mb-[2px]" />
                      </span>{" "}
                      Speaker {item.speaker}
                    </span>
                    <span className="ml-2">{item.text}</span>
                  </p>
                </div>
              );
            })}
      </div>
      {/* <div>
        {words.length > 50 && !showMore
          ? `${words.slice(0, 50).join(" ")}...`
          : transcript}
      </div>
      {words.length > 50 && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-blue-500 mt-2"
        >
          {showMore ? "Read Less" : "Read More"}
        </button>
      )} */}
    </div>
  );
};

export default TranscriptBox;
