import Image from "next/image";
import { formatDuration } from "../../utils/util";

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
  function highlightTranscript(item: any) {
    if (item.start < currentTime && currentTime < item.end) {
      return "bg-blue-500 text-white";
    }
  }

  return (
    <div className="mt-1 text-sm py-2">
      <div className="text-lg pb-2 font-bold">Transcript</div>
      <div className="text-gray-700 max-h-96 overflow-y-scroll pr-3">
        {typeof transcript == "string"
          ? JSON.stringify(transcript)
          : transcript.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className={`p-1 ${highlightTranscript(item)} rounded-md`}
                >
                  <p>
                    <span className="bg-gray-100 px-1 rounded-sm text-gray-700 inline-block w-[4.5rem] text-center">
                      <span className="text-base">
                        <Image
                          className="inline-block mb-[2px]"
                          alt="alarm-icon"
                          width={15}
                          height={15}
                          src="/alarm.svg"
                        />
                      </span>{" "}
                      {formatDuration(item.start)}
                    </span>
                    <span className="ml-1 bg-gray-50 rounded-sm">
                      {item.speaker == 1 ? (
                        <Image
                          className="inline-block mb-[2px] "
                          alt="speaker-one-icon"
                          width={20}
                          height={20}
                          src="/onev2.svg"
                        />
                      ) : (
                        <Image
                          className="inline-block mb-[2px]"
                          alt="speaker-two-icon"
                          width={20}
                          height={20}
                          src="/twov2.svg"
                        />
                      )}
                    </span>
                    <span className="ml-2">{item.text}</span>
                  </p>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default TranscriptBox;
