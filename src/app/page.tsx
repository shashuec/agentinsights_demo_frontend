"use client";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { PlayAudio } from "./components/PlayAudio";

export default function Home() {
  const [file, setFile] = useState<any>(null);
  const [questions, setQuestions] = useState<any>([
    {
      key: "Counsellor",
      question: "What is the language?",
      answer: "",
    },
    {
      key: "Manager",
      question: "Pace of speaking?",
      answer: "",
    },
  ]);
  const [createdQuestions, setCreatedQuestions] = useState<any>([]);
  const fileTypes = ["MP3", "WAV", "AAC"];
  const handleChange = (file: any) => {
    setFile(URL.createObjectURL(file[0]));
  };
  const handleCreateQuestion = () => {
    setCreatedQuestions((createdQuestions: any) => {
      return [
        ...createdQuestions,
        {
          key: "Counsellor",
          question: "What is the language?",
          answer: "English",
        },
      ];
    });
  };
  const handleDeleteQuestion = (idx: number) => {
    setCreatedQuestions((questions: any) =>
      questions.filter((data: any, i: number) => i !== idx)
    );
  };
  const handleDefaultAnswer = (answer: string, idx: number) => {
    let existingQuestions = questions;
    existingQuestions[idx].question = answer;
    // console.log(questions, existingQuestions);
    setQuestions(existingQuestions);
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
          {/* Choose Questions Form */}
          <div className="mt-4">
            <div className="w-fit p-2 bg-gray-200 text-sm font-mono">
              questions
            </div>
            {questions &&
              questions.map((question: any, idx: number) => {
                return (
                  <div
                    className="grid grid-cols-9 py-4 border-b-[1px] border-gray-300"
                    key={idx}
                  >
                    <div className="col-start-1 col-end-3 w-full flex items-center justify-center">
                      <select className="w-full border-[1px] ml-2 border-black">
                        <option>{question.key}</option>
                      </select>
                    </div>
                    <div className="col-start-3 col-end-10 pl-3 flex items-center justify-center">
                      <input
                        className="text-black border-[1px] px-2 border-gray-400 w-full outline-none"
                        placeholder="xyz"
                        type="text"
                        value={question.question}
                        onChange={(e) => {
                          handleDefaultAnswer(e.target.value, idx);
                        }}
                      ></input>
                    </div>
                  </div>
                );
              })}
            {createdQuestions &&
              createdQuestions.map((question: any, idx: number) => {
                return (
                  <div
                    className="grid grid-cols-10 py-4 border-b-[1px] border-gray-300"
                    key={idx}
                  >
                    <div className="col-start-1 col-end-3 w-full flex items-center justify-center">
                      <select className="w-full border-[1px] ml-2 border-black">
                        <option>{question.key}</option>
                      </select>
                    </div>
                    <input
                      className="bg-gray-200 col-start-3 col-end-7 ml-4 flex items-center text-black border-[1px] px-2 border-gray-400 w-full outline-none"
                      placeholder={question.question}
                      type="text"
                    ></input>
                    <div className="ml-4 col-start-7 col-end-10 pl-3 flex items-center justify-center">
                      <input
                        className="text-black border-[1px] px-2 border-gray-400 w-full outline-none"
                        placeholder="xyz"
                        type="text"
                      ></input>
                    </div>
                    <div
                      className="col-start-10 flex items-center justify-center cursor-pointer font-extrabold text-xl"
                      onClick={() => {
                        handleDeleteQuestion(idx);
                      }}
                    >
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-red-200 pb-[0.2rem]">
                        -
                      </span>
                    </div>
                  </div>
                );
              })}
            <div
              className="p-2 mt-2 mb-3 bg-gray-200 w-fit cursor-pointer text-sm"
              onClick={handleCreateQuestion}
            >
              + Add Question
            </div>
            <select className="mt-2 w-full p-3 border-stone-500 border-[1px] border-solid">
              <option>large</option>
              <option>large-v2</option>
            </select>
            <span className="text-gray-500">Choose a whisper model</span>
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
