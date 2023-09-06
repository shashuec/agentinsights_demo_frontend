"use client";
import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { PlayAudio } from "./components/PlayAudio";
import crossImage from "./assets/cross.svg";
import Image from "next/image";
import axios from "axios";
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";

export default function Home() {
  const fileTypes = ["MP3", "WAV", "AAC"];
  const [audioFileUrl, setAudioFileUrl] = useState<any>(null);
  const [audioFile, setAudioFile] = useState<any>(null);
  const [audioFileError, setAudioFileError] = useState<boolean>(false);
  const [output, setOutput] = useState<any>(null);
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      questions: [
        {
          category: "Counsellor",
          question: "What is the language?",
        },
        {
          category: "Manager",
          question: "Pace of speaking?",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const handleChange = (audioFile: any) => {
    setAudioFileError(false);
    setAudioFile(audioFile);
    setAudioFileUrl(URL.createObjectURL(audioFile[0]));
  };

  const onSubmit: SubmitHandler<any> = async (values) => {
    console.log("submit", values);
    if (!audioFile) {
      setAudioFileError(true);
      return;
    }
    const inputResponse = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        audio: audioFile,
        questions: values.questions,
      }
    );
    setOutput(inputResponse.data);
  };

  return (
    <>
      <div className="flex flex-row w-full max-md:flex-col">
        {/* Input div */}
        <div className="flex-1 p-4">
          <div className="flex items-center text-2xl">Input</div>
          {audioFileUrl && <PlayAudio audio={audioFileUrl} />}
          {/* Choose Audio */}
          <div className="mt-4">
            <div className="w-fit p-2 bg-gray-200 text-sm font-mono mb-3">
              Audio
            </div>
            <FileUploader
              multiple={true}
              handleChange={handleChange}
              name="audioFileUrl"
              types={fileTypes}
            />
            {audioFileError ? (
              <div className="text-sm pt-1 text-red-500">
                Please upload an audio file!
              </div>
            ) : (
              <span className="text-gray-500">Audio file</span>
            )}
          </div>
          {/* Choose Questions Form */}
          <div className="mt-4">
            <div className="w-fit p-2 bg-gray-200 text-sm font-mono">
              questions
            </div>
            {fields.map((item: any, index: number) => {
              return (
                <div
                  className="grid grid-cols-10 py-3 border-b-[1px] border-gray-300"
                  key={item.id}
                >
                  <div className="col-start-1 col-end-3 w-full flex items-start justify-center">
                    <Controller
                      name={`questions.${index}.category`}
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="w-full text-sm p-2 mt-[0.2rem] px-1 border-[1px] ml-2 border-black"
                        >
                          <option value={item.category}>{item.category}</option>
                        </select>
                      )}
                    />
                  </div>
                  <div className="col-start-3 col-end-10 pl-3 flex items-center justify-center">
                    <Controller
                      name={`questions.${index}.question`}
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "This field cannot be empty",
                        },
                      }}
                      render={({ field }) => (
                        <div className="flex flex-col w-full">
                          <input
                            {...field}
                            placeholder="Question"
                            className="text-black p-2 border-[1px] border-gray-400 w-full outline-none"
                            type="text"
                          ></input>
                          {errors?.questions?.at?.(index)?.question
                            ?.message && (
                            <div className="text-sm pt-1 text-red-500">
                              {
                                errors?.questions?.at?.(index)?.question
                                  ?.message
                              }
                            </div>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="w-full h-full flex items-start mt-2 justify-center cursor-pointer">
                    <Image
                      src={crossImage}
                      width={25}
                      height={25}
                      alt="Remove item"
                      onClick={() => {
                        console.log(index);
                        remove(index);
                      }}
                    />
                  </div>
                </div>
              );
            })}
            <div
              className="p-2 mt-2 mb-3 border-2 rounded-sm font-semibold border-black w-fit cursor-pointer text-sm"
              onClick={() =>
                append({
                  category: "Counsellor",
                  question: "What is the language?",
                })
              }
            >
              + Add Question
            </div>
          </div>
          {/* Submit Div */}
          <div className="mt-4">
            <button
              className="bg-black text-white p-3"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </button>
            <button className="border-[1px] border-solid border-black p-3 ml-3">
              Reset
            </button>
          </div>
        </div>
        {/* Output div */}
        <div className="flex-1 p-4">
          <div className="flex items-center text-2xl">Output</div>
          {output && (
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  );
}
