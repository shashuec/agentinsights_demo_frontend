"use client";
import { useState, useEffect, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";
import { PlayAudio } from "./components/PlayAudio";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";
import { PLACEHOLDER_RESPONSES } from "./constants/constants";
// import SampleResponse from "./constants/sample.json";

import { ThreeDots } from "react-loader-spinner";
import Header from "./components/Header";

import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

export default function Home() {
  const fileTypes = ["MP3", "WAV", "AAC"];
  const [audioFileUrl, setAudioFileUrl] = useState<any>(null);
  const [audioFile, setAudioFile] = useState<any>(null);
  const [audioFileError, setAudioFileError] = useState<boolean>(false);
  const [logs, setLogs] = useState<string>("");
  const loadingResponsesInterval = useRef<any>(null);
  const [output, setOutput] = useState<any>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const [currentLog, setCurrentLog] = useState(-1);
  const [startLogging, setStartLogging] = useState(false);

  const scrollToBottom = () => {
    if (window.innerWidth < 768) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const getAllQuestions = async () => {
    try {
      const response = await axios.get(
        "https://agentinsights-v1-5yfk5r5eya-el.a.run.app/get_questions"
      );
      console.log(response);
      return {
        questions: response.data.questions,
      };
    } catch (err) {
      console.log(err);
    }
  };
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: getAllQuestions,
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

  useEffect(() => {
    if (!startLogging) return; // If logging hasn't started, don't do anything

    if (currentLog < PLACEHOLDER_RESPONSES.length) {
      // Check to prevent index out of bounds
      const timer = setTimeout(() => {
        setCurrentLog((prev) => prev + 1);
      }, 10000); // Load a new log every 10 seconds
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });

      return () => clearTimeout(timer);
    }
  }, [currentLog, startLogging]);

  const onSubmit: SubmitHandler<any> = async (values) => {
    if (!audioFile) {
      setAudioFileError(true);
      return;
    }

    setStartLogging(true);
    setCurrentLog(0);
    // initiateLoadResponses();

    try {
      let bodyFormData = new FormData();
      bodyFormData.append("file", audioFile[0]);
      bodyFormData.append("direction", "OUTBOUND");

      const response = await axios({
        method: "post",
        url: "https://agentinsights-v1-5yfk5r5eya-el.a.run.app/split_audio_file_based",
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
        },
      });

      //For testing
      // const response: any = SampleResponse;

      setStartLogging(false);
      setCurrentLog(-1);
      clearInterval(loadingResponsesInterval.current);
      let outputContent: any = [];
      let outputLen = response.data.source_transcript.length;
      for (let i = 0; i < outputLen; i++) {
        let chunk = {
          transcript: response.data.source_transcript[i].data,
          answers: response.data.processed_data[`chunk${i + 1}`],
        };
        outputContent.push(chunk);
      }
      setLogs("");

      setOutput(outputContent);
      console.log(outputContent);
    } catch (err) {
      console.log(err);
      clearInterval(loadingResponsesInterval.current);
      setOutput(err);
      setStartLogging(false);
      setCurrentLog(-1);
    }
  };

  // const initiateLoadResponses = async () => {
  //   setOutput([]);
  //   setLogs(`${PLACEHOLDER_RESPONSES[0]}\n`);
  //   let i = 1;
  //   loadingResponsesInterval.current = setInterval(() => {
  //     setLogs(
  //       (loadingResponses) => `${loadingResponses}${PLACEHOLDER_RESPONSES[i]}\n`
  //     );
  //     if (i == 9) {
  //       clearInterval(loadingResponsesInterval.current);
  //     }
  //     i++;
  //   }, 10000);
  // };

  useEffect(() => {
    scrollToBottom();
  }, [output, logs]);

  return (
    <>
      <Header />
      <div className="p-4 text-2xl italic font-bold text-center">
        {
          '"AI-Powered Analytics and Training for Enhanced Agent-Customer Interactions"'
        }
      </div>
      <div className="px-4 flex flex-row w-full max-md:flex-col">
        {/* Input div */}
        <div className="flex-1 p-4">
          <div className="flex items-center text-2xl">Input</div>
          {audioFileUrl && <PlayAudio audio={audioFileUrl} />}
          {/* Choose Audio */}
          <div className="mt-4">
            <div className=" rounded-md  w-fit p-2 bg-gray-200 text-sm  font-mono mb-3">
              Audio
            </div>
            <div className="flex max-md:flex-col  gap-4">
              <div className="">
                <FileUploader
                  multiple={true}
                  handleChange={handleChange}
                  name="audioFileUrl"
                  types={fileTypes}
                />
              </div>

              <button
                className="bg-black text-white py-3 px-6 shadow-md rounded-md"
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </button>
            </div>

            {audioFileError ? (
              <div className="text-sm pt-1 text-red-500">
                Please upload an audio file!
              </div>
            ) : (
              <span className="text-gray-500 flex pt-2">Audio file</span>
            )}
          </div>
          {/* Choose Questions Form */}
          <div className="mt-4">
            <div className="w-fit p-2 bg-gray-200 text-sm font-mono">
              Questions
            </div>
            {fields.map((item: any, index: number) => {
              return (
                <div
                  className="grid grid-cols-9 py-3 border-b-[1px] border-gray-300 max-md:flex max-md:flex-col"
                  key={item.id}
                >
                  <div className="col-start-1 col-end-3 w-full flex items-start justify-center max-md: mb-2 max-md:px-1">
                    <Controller
                      name={`questions.${index}.category`}
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="w-full text-sm p-2 mt-[0.2rem] px-1 border-[1px] ml-2 border-black max-md:font-semibold max-md:ml-0"
                        >
                          <option value={item.category}>{item.category}</option>
                        </select>
                      )}
                    />
                  </div>
                  <div className="col-start-3 col-end-10 pl-3 flex items-center justify-center max-md:px-1">
                    <Controller
                      name={`questions.${index}.question_template`}
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "This field cannot be empty",
                        },
                      }}
                      render={({ field }) => (
                        <div className="flex flex-col w-full">
                          <div
                            placeholder="Question"
                            className="text-black p-2 border-[1px] border-gray-400 bg-gray-100 w-full outline-none"
                          >
                            {field.value}
                          </div>
                          {/* <input
                            {...field}
                            placeholder="Question"
                            className="text-black p-2 border-[1px] border-gray-400 w-full outline-none"
                            type="text"
                            disabled
                          ></input> */}
                          {(errors?.questions as any)?.at?.(index)
                            ?.question_template?.message && (
                            <div className="text-sm pt-1 text-red-500">
                              {
                                (errors?.questions as any)?.at?.(index)
                                  ?.question_template?.message
                              }
                            </div>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  {/* <div className="w-full h-full flex items-start mt-2 justify-center cursor-pointer">
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
                  </div> */}
                </div>
              );
            })}
            {/* <div
              className="p-2 mt-2 mb-3 border-2 rounded-sm font-semibold border-black w-fit cursor-pointer text-sm"
              onClick={() =>
                append({
                  category: "Counsellor",
                  question: "What is the language?",
                })
              }
            >
              + Add Question
            </div> */}
          </div>
          {/* Submit Div */}
          <div className="mt-4 max-md:w-full max-md:flex max-md:justify-center">
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
        {output && output.length ? (
          <>
            <Box
              p={2}
              // bg="white"
              className="w-full md:w-[50%] mb-4"
              borderRadius="lg"
              borderWidth="1px"
            >
              <div className="text-2xl text-center border-b mb-2">Output</div>
              <Tabs variant="soft-rounded">
                <TabList mb="1em">
                  <Tab width="50%">Detailed Summary</Tab>
                  <Tab width="50%">Transcript</Tab>
                  <Tab width="50%">AI Feedback</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {output.map(
                      (chunk: any, idx: number) =>
                        chunk.answers &&
                        chunk.answers.map((answer: any) => (
                          <div
                            className="p-1 shadow-md rounded-md pt-4 mt-2 bg-gray-200  max-md:w-full"
                            key={answer.question}
                          >
                            <div>
                              <span className="font-bold">Question: </span>
                              {answer.question}
                            </div>
                            <div>
                              <span className="font-bold">Answer:</span>
                              {answer.answer}
                            </div>
                            <div>
                              <span className="font-bold">Reason:</span>
                              {answer.reason}
                            </div>
                          </div>
                        ))
                    )}
                  </TabPanel>
                  <TabPanel>
                    {output.map((chunk: any, idx: number) => (
                      <div
                        className="p-2 shadow-md rounded-md mt-2 bg-gray-200"
                        key={idx}
                      >
                        <div>{chunk.transcript}</div>
                      </div>
                    ))}
                  </TabPanel>
                  <TabPanel>AI FeedBack</TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </>
        ) : (
          <></>
        )}

        {startLogging && (
          <>
            <div className="flex-1 p-4">
              <div className="flex items-center text-2xl">Output</div>
              <div className="pt-2">
                <div className="p-2 text-xl font-bold">Logs</div>
                <div className="p-2 rounded-xl shadow-md max-h-[200px] overflow-y-auto  bg-gray-200 text-sm font-mono whitespace-pre-line max-md:w-full">
                  {PLACEHOLDER_RESPONSES.slice(0, currentLog + 1).map(
                    (log, index) => (
                      <div key={index} className="grid grid-cols-10 gap-4 p-2">
                        <span className="col-span-8">{log}</span>
                        <span className="col-span-2 flex justify-center mx-auto align-middle">
                          {index < currentLog ? (
                            <FaCheckCircle
                              color="green"
                              fontSize="1.5rem"
                              className="my-auto"
                            />
                          ) : (
                            <span className="flex  justify-center">
                              <ThreeDots
                                height="10"
                                width="50"
                                radius="9"
                                color="#000"
                                ariaLabel="three-dots-loading"
                                visible={true}
                                wrapperStyle={{}}
                                wrapperClass="flex  justify-center"
                              />
                            </span>
                          )}
                        </span>
                      </div>
                    )
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
