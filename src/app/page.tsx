"use client";
import { useState, useEffect, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";
import { PlayAudio } from "./components/PlayAudio";
import { FaCheckCircle } from "react-icons/fa";
import { Spinner, useToast } from "@chakra-ui/react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import exampleAudio from "./assets/example_audio.png";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fileTypes = ["MP3", "WAV", "AAC"];
  const [audioFileUrl, setAudioFileUrl] = useState<any>(null);
  const [audioFile, setAudioFile] = useState<any>(null);
  const [audioFileError, setAudioFileError] = useState<boolean>(false);
  const [logs, setLogs] = useState<string>("");
  const loadingResponsesInterval = useRef<any>(null);
  const [output, setOutput] = useState<any>();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const [currentLog, setCurrentLog] = useState(-1);
  const [startLogging, setStartLogging] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const toast = useToast();

  const setUUIDQueryParam = (uuidValue: any) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    console.log(current);

    if (!uuidValue) {
      current.delete("uuid");
    } else {
      current.set("uuid", uuidValue);
    }

    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";

    const path = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

    router.push(`${path}${query}`);
  };

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
      setLoadingQuestions(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/get_questions`
      );
      console.log(response);
      setLoadingQuestions(false);
      return {
        questions: response.data.questions,
      };
    } catch (err) {
      console.log(err);
      setLoadingQuestions(false);
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

    try {
      let bodyFormData = new FormData();
      bodyFormData.append("file", audioFile[0]);
      bodyFormData.append("direction", "OUTBOUND");

      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/split_audio_file_based`,
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
        },
      });

      //For testing
      // const response: any = SampleResponse;

      console.log(response.data);

      setStartLogging(false);
      setCurrentLog(-1);
      clearInterval(loadingResponsesInterval.current);
      setLogs("");
      setUUIDQueryParam(response.data.uuid);
      setOutput(response.data);
    } catch (err: any) {
      console.log(err);
      clearInterval(loadingResponsesInterval.current);
      toast({
        title: err.response.data.error,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setStartLogging(false);
      setCurrentLog(-1);
    }
  };

  // const fetchExampleAudio = async (url: any) => {
  //   try {
  //     console.log("working");

  //     const response = await axios.get(url);
  //     console.log(response);

  //     const blob = new Blob([response.data], { type: "audio/wav" });
  //     const objectURL = URL.createObjectURL(blob);

  //     setAudioFileUrl(objectURL);
  //   } catch (error) {
  //     console.error("Failed to fetch audio:", error);
  //   }
  // };

  const exampleOutputHandler = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/get_compile_transcript_and_processed_data?uuid=18c24669-4b17-463a-b835-5084ab3008d9`
      );

      setStartLogging(false);
      setCurrentLog(-1);
      setLogs("");
      setUUIDQueryParam(response.data.uuid);
      setOutput(response.data);
      // fetchExampleAudio(response.data.audio_url);
    } catch (err: any) {
      console.log(err);
      toast({
        title: err.response.data.error,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setStartLogging(false);
      setCurrentLog(-1);
    }
  };

  const getBackgroundColor = (score: number) => {
    if (score >= 7 && score <= 10) return "bg-green-500";
    else if (score >= 5 && score <= 6) return "bg-yellow-500";
    else return "bg-red-500";
  };

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
        <div className="flex-1 p-4 relative">
          <div className="flex items-center text-2xl">Input</div>
          {audioFileUrl && <PlayAudio audio={audioFileUrl} />}
          {/* Choose Audio */}
          <div className="mt-4">
            <div className=" rounded-md  w-fit p-2 bg-gray-200 text-sm  font-mono mb-3">
              Audio
            </div>
            {/* <div className="flex max-md:flex-col  gap-4"> */}
            <div className="">
              <FileUploader
                multiple={true}
                handleChange={handleChange}
                name="audioFileUrl"
                types={fileTypes}
              />
            </div>

            {/* <button
                className="bg-black text-white py-3 px-6 shadow-md rounded-md"
                onClick={onSubmit}
              >
                Submit
              </button> */}
            {/* </div> */}

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
            <div className="w-fit p-2 bg-gray-200 shadow-md rounded-md text-sm font-mono">
              Questions
            </div>
            {loadingQuestions ? (
              <div
                className={` ${
                  output || startLogging ? "w-full" : "w-[50%]"
                }  text-center p-4 max-md:w-full flex align-center justify-center gap-2`}
              >
                <div>Loading Questions</div> <Spinner color="blue.500" />
              </div>
            ) : (
              <>
                {fields.map((item: any, index: number) => {
                  return (
                    <div
                      className={` ${
                        output || startLogging ? "w-full" : "w-[50%]"
                      }  max-md:w-full py-3 border-b-[1px] border-gray-300 flex flex-col`}
                      key={item.id}
                    >
                      <div className="col-start-1 col-end-3   max-md: mb-2 max-md:px-1">
                        <Controller
                          name={`questions.${index}.category`}
                          control={control}
                          render={({ field }) => (
                            <div
                              {...field}
                              className="w-full text-lg p-2 mt-[0.2rem] px-1  ml-2 border-black max-md:ml-0"
                            >
                              <div className="font-bold">{item.category}</div>
                              <div className="text-sm text-gray-600">
                                {item.sub_category}
                              </div>
                            </div>
                          )}
                        />
                      </div>
                      <div className=" pl-3 flex  max-md:px-1">
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
                            <div className="flex flex-col">
                              <div
                                placeholder="Question"
                                className="text-black shadow-md rounded-md p-2 border-[1px] border-gray-400 bg-gray-100 w-full outline-none"
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
              </>
            )}

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
          <div
            className={`sticky bottom-0 bg-white p-2 mt-4 ${
              output || startLogging ? "w-full" : "w-[50%]"
            } max-md:w-full max-md:flex max-md:justify-center`}
          >
            <button
              className="bg-black text-white p-3 shadow-md rounded-md"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </button>
            <button className="border-[1px] border-solid border-black p-3 ml-3 shadow-md rounded-md">
              Reset
            </button>
          </div>
        </div>
        {/* Output div */}
        {output ? (
          <>
            <Box
              p={2}
              // bg="white"
              className="w-full flex-1 md:w-[50%] mb-4"
              borderRadius="lg"
              borderWidth="1px"
            >
              <div className="text-2xl text-center border-b mb-2">Output</div>
              <Tabs variant="soft-rounded">
                <TabList mb="1em">
                  <Tab width="50%">Detailed Summary</Tab>
                  <Tab width="50%">AI Feedback</Tab>
                  <Tab width="50%">Transcript</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <div className="flex flex-col ">
                      <div className="font-bold">Score : </div>
                      <div
                        className={`rounded-full w-fit aspect-square p-6 text-center text-white text-4xl font-bold ${getBackgroundColor(
                          output.score
                        )}`}
                      >
                        {output.score}
                      </div>
                    </div>
                    {output.combined_output.map((answer: any) => (
                      <div
                        className=" shadow-md rounded-md p-4 mt-2 bg-blue-950 text-white  max-md:w-full"
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
                    ))}
                  </TabPanel>
                  <TabPanel>
                    <ul className="list-disc shadow-md rounded-md p-4 px-6 bg-blue-950 text-white space-y-3">
                      {output.areas.map((area: any, index: number) => (
                        <li className="" key={index}>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </TabPanel>
                  <TabPanel>
                    <div className="shadow-md rounded-md p-4 bg-blue-950 text-white">
                      {output.source_transcript}
                    </div>
                  </TabPanel>
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
      <div className="p-4 space-y-8">
        <div className="text-2xl py-2 border-b-[1px] border-gray-400 ">
          Example
        </div>
        <div
          onClick={exampleOutputHandler}
          className="flex aspect-square p-2 w-fit shadow-md rounded-md bg-gray-500 hover:scale-105 hover:bg-gray-400"
        >
          <Image src={exampleAudio} alt="" width="200" />
        </div>
      </div>
    </>
  );
}
