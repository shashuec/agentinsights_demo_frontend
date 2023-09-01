"use client";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { PlayAudio } from "./components/PlayAudio";

export default function Home() {
  const [file, setFile] = useState<any>(null);
  const fileTypes = ["MP3", "WAV", "AAC"];
  const handleChange = (file: any) => {
    setFile(URL.createObjectURL(file[0]));
  };
  return (
    <>
      <div className="flex flex-row w-full max-md:flex-col">
        {/* Input div */}
        <div className="flex-1 p-4">
          <div className="flex items-center text-2xl">Input</div>
          {file && <PlayAudio audio={file} />}
          {/* Choose Audio */}
          <div className="mt-4">
            <div className="w-fit p-2 bg-gray-200 text-sm font-mono mb-3">
              Audio
            </div>
            <FileUploader
              multiple={true}
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />
            <span className="text-gray-500">Audio file</span>
          </div>
          {/* Choose Model */}
          <div className="mt-4">
            <div className="w-fit p-2 bg-gray-200 text-sm font-mono">model</div>
            <select className="mt-2 w-full p-3 border-stone-500 border-[1px] border-solid">
              <option>large</option>
              <option>large-v2</option>
            </select>
            <span className="text-gray-500">Choose a whisper model</span>
          </div>
          {/* Choose Transcription */}
          <div className="mt-4">
            <div className="w-fit p-2 bg-gray-200 text-sm font-mono">
              transcription
            </div>
            <select className="mt-2 w-full p-3 border-stone-500 border-[1px] border-solid">
              <option>plain text</option>
              <option>srt</option>
              <option>vtt</option>
            </select>
            <span className="text-gray-500">
              Choose format for transcription
            </span>
          </div>
          {/* Choose Translate */}
          <div className="mt-4">
            <div className="flex items-center">
              <input className="w-5 h-5 mr-2" type="checkbox"></input>
              <span className="w-fit p-2 bg-gray-200 text-sm font-mono">
                translate
              </span>
            </div>
            <div className="text-gray-500 py-2">
              Translate the text to English when set to True
            </div>
          </div>
          {/* Choose Language */}
          <div className="mt-4">
            <div className="w-fit p-2 bg-gray-200 text-sm font-mono">
              language
            </div>
            <select className="mt-2 w-full p-3 border-stone-500 border-[1px] border-solid">
              <option>Hindi</option>
              <option>English</option>
            </select>
            <span className="text-gray-500">
              language spoken in the audio, specify None to perform language
              detection
            </span>
          </div>
          {/* Choose Temperature */}
          <div className="mt-4">
            <div className="w-fit p-2 bg-gray-200 text-sm font-mono">
              temperature
            </div>
            <input
              type="number"
              className="mt-2 w-full p-3 border-stone-500 border-[1px] border-solid"
            ></input>
            <span className="text-gray-500">
              temperature to use for sampling
            </span>
          </div>
          {/* Choose Patience */}
          <div className="mt-4">
            <div className="w-fit p-2 bg-gray-200 text-sm font-mono">
              patience
            </div>
            <input
              type="number"
              className="mt-2 w-full p-3 border-stone-500 border-[1px] border-solid"
            ></input>
            <span className="text-gray-500">
              optional patience value to use in beam decoding, as in
              https://arxiv.org/abs/2204.05424, the default (1.0) is equivalent
              to conventional beam search
            </span>
          </div>
          {/* Choose suppress_tokens */}
          <div className="mt-4">
            <div className="w-fit p-2 bg-gray-200 text-sm font-mono">
              suppress_tokens
            </div>
            <input
              type="text"
              className="mt-2 w-full p-3 border-stone-500 border-[1px] border-solid"
            ></input>
            <span className="text-gray-500">
              comma-separated list of token ids to suppress during sampling; -1
              will suppress most special characters except common punctuations
            </span>
          </div>
          {/* Choose initial_prompt */}
          <div className="mt-4">
            <div className="w-fit p-2 bg-gray-200 text-sm font-mono">
              initial_prompt
            </div>
            <input
              type="text"
              className="mt-2 w-full p-3 border-stone-500 border-[1px] border-solid"
            ></input>
            <span className="text-gray-500">
              optional text to provide as a prompt for the first window.
            </span>
          </div>
          {/* Choose condition_on_previous_text */}
          <div className="mt-4">
            <div className="flex items-center">
              <input className="w-5 h-5 mr-2" type="checkbox"></input>
              <span className="w-fit p-2 bg-gray-200 text-sm font-mono">
                condition_on_previous_text
              </span>
            </div>
            <div className="text-gray-500 py-2">
              if True, provide the previous output of the model as a prompt for
              the next window; disabling may make the text inconsistent across
              windows, but the model becomes less prone to getting stuck in a
              failure loop
            </div>
          </div>
          {/* Choose temperature_increment_on_fallback */}
          <div className="mt-4">
            <div className="w-fit p-2 bg-gray-200 text-sm font-mono">
              temperature_increment_on_fallback
            </div>
            <input
              type="number"
              className="mt-2 w-full p-3 border-stone-500 border-[1px] border-solid"
            ></input>
            <span className="text-gray-500">
              temperature to increase when falling back when the decoding fails
              to meet either of the thresholds below
            </span>
          </div>
          {/* Choose compression_ratio_threshold */}
          <div className="mt-4">
            <div className="w-fit p-2 bg-gray-200 text-sm font-mono">
              compression_ratio_threshold
            </div>
            <input
              type="number"
              className="mt-2 w-full p-3 border-stone-500 border-[1px] border-solid"
            ></input>
            <span className="text-gray-500">
              if the gzip compression ratio is higher than this value, treat the
              decoding as failed
            </span>
          </div>
          {/* Choose logprob_threshold */}
          <div className="mt-4">
            <div className="w-fit p-2 bg-gray-200 text-sm font-mono">
              logprob_threshold
            </div>
            <input
              type="number"
              className="mt-2 w-full p-3 border-stone-500 border-[1px] border-solid"
            ></input>
            <span className="text-gray-500">
              if the average log probability is lower than this value, treat the
              decoding as failed
            </span>
          </div>
          {/* Choose no_speech_threshold */}
          <div className="mt-4">
            <div className="w-fit p-2 bg-gray-200 text-sm font-mono">
              no_speech_threshold
            </div>
            <input
              type="number"
              className="mt-2 w-full p-3 border-stone-500 border-[1px] border-solid"
            ></input>
            <span className="text-gray-500">
              if the probability of the {"<|nospeech|>"} token is higher than
              this value AND the decoding has failed due to `logprob_threshold`,
              consider the segment as silence
            </span>
          </div>
          {/* Submit Div */}
          <div className="mt-4">
            <button className="bg-black text-white p-3">Submit</button>
            <button className="border-[1px] border-solid border-black p-3 ml-3">
              Reset
            </button>
          </div>
        </div>
        {/* Output div */}
        <div className="flex-1 p-4">
          <div className="flex items-center text-2xl">Output</div>
          <div className="pt-4">
            Transcription
            <div className="pt-2 max-h-[200px] overflow-y-auto w-[80%] bg-gray-200 text-sm p-1 font-mono">
              Transcription
            </div>
          </div>
          <div className="pt-4">
            Detected Language
            <div className="pt-2 w-[80%] bg-gray-200 text-sm p-1 font-mono">
              english
            </div>
          </div>
          <div className="pt-4">
            Logs
            <div className="pt-2 max-h-[200px] overflow-y-auto w-[80%] bg-gray-200 text-sm p-1 font-mono">
              loading...
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
