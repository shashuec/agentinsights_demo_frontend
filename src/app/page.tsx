"use client";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { PlayAudio } from "./components/PlayAudio";
import crossImage from "./assets/cross.svg";
import Image from "next/image";
import { useForm, Controller, useFieldArray } from "react-hook-form";

export default function Home() {
  const fileTypes = ["MP3", "WAV", "AAC"];
  const [file, setFile] = useState<any>(null);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      audioFile: null,
      questions: [
        {
          key: "Counsellor",
          question: "What is the language?",
        },
        {
          key: "Manager",
          question: "Pace of speaking?",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

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
          {/* Choose Questions Form */}
          <div className="mt-4">
            <div className="w-fit p-2 bg-gray-200 text-sm font-mono">
              questions
            </div>
            {fields.map((item: any, index: number) => {
              return (
                <div
                  className="grid grid-cols-10 py-4 border-b-[1px] border-gray-300"
                  key={item.id}
                >
                  <div className="col-start-1 col-end-3 w-full flex items-center justify-center">
                    <select className="w-full text-sm p-2 px-1 border-[1px] ml-2 border-black">
                      <option>{item.key}</option>
                    </select>
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
                      render={({ field: { onChange, ...field } }) => (
                        <input
                          {...field}
                          placeholder="Question"
                          className="text-black p-2 border-[1px] border-gray-400 w-full outline-none"
                          type="text"
                          value={item.question}
                          onChange={(e) => {}}
                        ></input>
                      )}
                    />
                  </div>
                  <div className="w-full h-full flex items-center justify-center cursor-pointer">
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
                  key: "Counsellor",
                  question: "What is the language?",
                })
              }
            >
              + Add Question
            </div>
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
