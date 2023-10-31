import React, { useState } from "react";

interface TranscriptBoxProps {
  transcript: string;
}

const TranscriptBox = ({ transcript }: TranscriptBoxProps) => {
  const [showMore, setShowMore] = useState(false);
  const words = transcript.split(" ");

  return (
    <div className=" mt-2 text-sm py-2 ">
      <div className=" text-lg pb-2 font-bold">Transcript</div>
      <div>
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
      )}
    </div>
  );
};

export default TranscriptBox;
