"use client";
import { useState, useEffect, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";
import { PlayAudio } from "../components/PlayAudio";
import { FaCheckCircle } from "react-icons/fa";
import { Icon, Spinner, useToast } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import Cookies from "js-cookie";
import PopUpForm from "../components/PopUpForm";
import { FcUpload } from "react-icons/fc";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { MdSupportAgent, MdInsights } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import { BsFillFileTextFill } from "react-icons/bs";
import axios from "axios";
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";
import { PLACEHOLDER_RESPONSES, EXAMPLES } from "../constants/constants";
// import SampleResponse from "./constants/sample.json";
import { ThreeDots } from "react-loader-spinner";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import TranscriptBox from "../components/TranscriptBox";
import AppFooter from "../components/AppFooter";
import LandingPageHeader from "../components/LandingPageHeader";
import React from "react";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fileTypes = ["MP3", "WAV", "MP4", "AAC"];
  const [isOpen, setIsOpen] = useState(true);
  const [audioFileUrl, setAudioFileUrl] = useState<any>(null);
  const [audioFile, setAudioFile] = useState<any>(null);
  const [audioFileError, setAudioFileError] = useState<boolean>(false);
  const [logs, setLogs] = useState<string>("");
  const loadingResponsesInterval = useRef<any>(null);
  const [output, setOutput] = useState<any>();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [audioFileName, setAudioFileName] = useState("Audio File");

  const [currentLog, setCurrentLog] = useState(-1);
  const [startLogging, setStartLogging] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);

  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const toast = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    // Show the form if the cookie is not set
    if (!Cookies.get("formSubmitted")) {
      setIsFormOpen(true);
    }
  }, []);

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const setUUIDQueryParam = (uuidValue: any) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    console.log(current);

    if (!uuidValue) {
      current.delete("uuid");
    } else {
      current.set("uuid", uuidValue);
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  useEffect(() => {
    if (searchParams.has("uuid")) {
      preComputedOutputHandler(searchParams.get("uuid"));
    }
  }, []);

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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/audio/get_questions`
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
    setAudioFileName(audioFile[0].name);
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
    setShowQuestions(true);

    try {
      let bodyFormData = new FormData();
      bodyFormData.append("file", audioFile[0]);
      bodyFormData.append("direction", "OUTBOUND");

      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/audio/split_audio_file_based`,
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
        },
      });

      //For testing
      // const response: any = SampleResponse;

      console.log(response.data);
      setShowQuestions(false);
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

  const preComputedOutputHandler = async (uuidVal: any) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/audio/get_compile_transcript_and_processed_data?uuid=${uuidVal}`
      );

      setStartLogging(false);
      setCurrentLog(-1);

      setLogs("");
      setUUIDQueryParam(response.data.uuid);
      setOutput(response.data);
      setShowQuestions(false);
      setAudioFileUrl(response.data.audio_url);
    } catch (err: any) {
      console.log(err);
      toast({
        title: "UUID not correct or reselect the file and submit again",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setStartLogging(false);
      setCurrentLog(-1);
    }
  };

  const categorizeResults = (combinedOutput: any) => {
    return combinedOutput.reduce((acc: any, answer: any) => {
      if (!acc[answer.category]) {
        acc[answer.category] = [];
      }
      acc[answer.category].push(answer);
      return acc;
    }, {});
  };

  const getProgressColor = (score: number) => {
    if (score >= 7 && score <= 10) return "green.500";
    else if (score >= 5 && score <= 6) return "yellow.500";
    else return "red.500";
  };

  useEffect(() => {
    scrollToBottom();
  }, [output, logs]);

  return (
    <div className="relative bg-blue-100">
      <LandingPageHeader />
      <div>
        <div className="p-4 text-2xl italic font-bold text-center">
          Upload Your Audio and Experience the Magic
        </div>
        <div className="px-4 grid grid-cols-1 md:grid-cols-7 space-y-2 md:space-y-0  md:gap-2  pb-4 w-full">
          <div className="p-4 pt-2 relative bg-white rounded-sm col-span-3 ">
            {/* <div className="flex items-center text-2xl">Input</div> */}
            {audioFileUrl && <PlayAudio audio={audioFileUrl} />}
            <div className="mt-4">
              <div className=" w-fit p-2 text-white bg-black rounded-md font-bold  font-mono mb-3">
                Audio
              </div>
              <div className="">
                <FileUploader
                  multiple={true}
                  handleChange={handleChange}
                  name="audioFileUrl"
                  types={fileTypes}
                />
              </div>

              {audioFileError ? (
                <div className="text-sm pt-1 text-red-500">
                  Please upload an audio file!
                </div>
              ) : (
                <span className="text-gray-500 flex pt-2 text-xs overflow-hidden">
                  {audioFileName}
                </span>
              )}
            </div>
            {showQuestions ? (
              <div className="mt-4">
                <div className="w-fit p-2 text-white bg-black rounded-md font-bold shadow-md  font-mono">
                  Questions
                </div>
                {loadingQuestions ? (
                  <div className="w-full text-center p-4 max-md:w-full flex align-center justify-center gap-2">
                    <div>Loading Questions</div> <Spinner color="blue.500" />
                  </div>
                ) : (
                  <>
                    {fields.map((item: any, index: number) => {
                      return (
                        <div className="w-full flex flex-col" key={item.id}>
                          <div className="col-start-1 col-end-3 max-md:mb-2 max-md:px-1">
                            <Controller
                              name={`questions.${index}.category`}
                              control={control}
                              render={({ field }) => (
                                <div
                                  {...field}
                                  className="w-full text-lg p-2 px-1 border-black max-md:ml-0"
                                >
                                  <div className="font-bold text-sm">
                                    {item.category}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {item.sub_category}
                                  </div>
                                </div>
                              )}
                            />
                          </div>
                          <div className="px-1 flex  max-md:px-1">
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
                                    className=" text-sm shadow-md rounded-md p-2 border-[1px]  bg-gray-100 w-full outline-none"
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
            ) : (
              <TranscriptBox transcript={output.source_transcript} />
            )}
            {/* Submit Div */}
            {!startLogging && (
              <div className="sticky bottom-0 bg-white p-2 pl-1 mt-4 w-full max-md:flex max-md:justify-center">
                <button
                  className="bg-black text-white p-2 shadow-md rounded-md"
                  onClick={handleSubmit(onSubmit)}
                >
                  Submit
                </button>
                <button className="border-[1px] border-solid border-black p-2 ml-3 shadow-md rounded-md">
                  Reset
                </button>
              </div>
            )}
          </div>
          {startLogging ? (
            <div className="col-span-4 p-4 bg-white rounded-sm">
              {/* <div className="flex items-center text-2xl">Output</div> */}
              <div className="">
                <div className="flex gap-2 items-center py-2 text-xl">
                  <Icon as={FcUpload} />
                  <span>Logs</span>
                </div>
                <div className="p-2 rounded-sm shadow-md max-h-[200px] overflow-y-auto  bg-gray-200 text-sm font-mono whitespace-pre-line max-md:w-full">
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
          ) : (
            <div className="p-2 w-full col-span-4  bg-white space-y-2">
              <Box borderRadius="sm">
                <div className=" flex gap-2 py-2 items-center text-2xl  border-b mb-2">
                  <Icon as={FaWandMagicSparkles} color="blue.400" />{" "}
                  <span>Report</span>
                </div>
                {output ? (
                  <div className="w-full space-y-4">
                    <ul className="list-disc text-sm  p-4 px-6  space-y-3">
                      {output?.purpose_of_call &&
                      output.purpose_of_call.length > 0 ? (
                        output.purpose_of_call.map(
                          (purpose: any, index: number) => (
                            <li className="" key={index}>
                              {purpose}
                            </li>
                          )
                        )
                      ) : (
                        <li>Purpose of the call not available.</li>
                      )}
                    </ul>
                  </div>
                ) : (
                  <div className="p-2  text-gray-600">
                    Upload Audio File to see the results
                  </div>
                )}
                <Tabs variant="line" colorScheme="linkedin">
                  <TabList
                    mb={["1em", "1em", "0"]}
                    flexDir={["column", "column", "row"]}
                    className="flex-wrap font-semibold flex justify-between"
                  >
                    <Tab fontSize={["xs", "xs", "xs"]} className="flex gap-1">
                      <Icon as={MdInsights} className="text-xl" />
                      Customer Insight{" "}
                      {output && (
                        <span>({output.customer_insights.length})</span>
                      )}
                    </Tab>
                    <Tab fontSize={["xs", "xs", "xs"]} className="flex gap-1">
                      <Icon as={MdSupportAgent} className="text-xl" />
                      Agent Actions{" "}
                      {output && <span>({output.call_to_actions.length})</span>}
                    </Tab>
                    <Tab fontSize={["xs", "xs", "xs"]} className="flex gap-1">
                      <Icon as={FaLightbulb} className="text-base" />
                      Areas of Improvement{" "}
                      {output && <span>({output.areas.length})</span>}
                    </Tab>
                    <Tab fontSize={["xs", "xs", "xs"]} className="flex gap-1">
                      <Icon as={BsFillFileTextFill} className="text-base" />
                      Detailed Summary
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      {output ? (
                        <div className="w-full space-y-4">
                          <ul className="list-disc text-sm shadow-md text-black  p-4 px-6 bg-gray-100 space-y-3">
                            {output.customer_insights &&
                            output.customer_insights.length > 0 ? (
                              output.customer_insights.map(
                                (customer_insight: any, index: number) => (
                                  <li className="" key={index}>
                                    {customer_insight}
                                  </li>
                                )
                              )
                            ) : (
                              <li>No customer insights available.</li>
                            )}
                          </ul>
                        </div>
                      ) : (
                        <div className="p-2 text-center text-gray-600">
                          Upload Audio File to see the results
                        </div>
                      )}
                    </TabPanel>
                    <TabPanel>
                      {output ? (
                        <div className="w-full space-y-4">
                          <ul className="list-disc text-sm shadow-md text-black  p-4 px-6 bg-gray-100 space-y-3">
                            {output.call_to_actions &&
                            output.call_to_actions.length > 0 ? (
                              output.call_to_actions.map(
                                (call_to_action: any, index: number) => (
                                  <li className="" key={index}>
                                    {call_to_action}
                                  </li>
                                )
                              )
                            ) : (
                              <li>No call to actions available.</li>
                            )}
                          </ul>
                        </div>
                      ) : (
                        <div className="p-2 text-center text-gray-600">
                          Upload Audio File to see the results
                        </div>
                      )}
                    </TabPanel>
                    <TabPanel>
                      {output ? (
                        <div className="w-full space-y-4">
                          {/* <Box className="w-full p-2 border rounded-md shadow-sm">
                            <Button
                              className="w-full flex justify-between"
                              variant="ghost"
                              onClick={() => setIsOpen(!isOpen)}
                            >
                              <Text>Areas of Improvement</Text>
                              {isOpen ? (
                                <ChevronUpIcon boxSize="6" />
                              ) : (
                                <ChevronDownIcon boxSize="6" />
                              )}
                            </Button>

                            {isOpen && (
                              <Box className="mt-2"> */}
                          <ul className="list-disc text-sm shadow-md text-black  p-4 px-6 bg-gray-100 space-y-3">
                            {output.areas.map((area: any, index: number) => (
                              <li className="" key={index}>
                                {area}
                              </li>
                            ))}
                          </ul>
                          {/* </Box>
                            )}
                          </Box> */}
                        </div>
                      ) : (
                        <div className="p-2 text-center text-gray-600">
                          Upload Audio File to see the results
                        </div>
                      )}
                    </TabPanel>
                    <TabPanel>
                      {output ? (
                        <>
                          <div className="flex  gap-4 align-middle pb-2">
                            <div className="font-bold text-2xl flex  my-auto">
                              AI Score :
                            </div>
                            <div>
                              <CircularProgress
                                value={output.score * 10}
                                size="70px"
                                color={getProgressColor(output.score)}
                              >
                                <CircularProgressLabel>
                                  {output.score}/10
                                </CircularProgressLabel>
                              </CircularProgress>
                            </div>
                          </div>
                          {output &&
                            Object.entries(
                              categorizeResults(output.combined_output)
                            ).map(([category, answers]: any) => (
                              <div
                                key={category}
                                className="mb-6 bg-white border rounded-lg shadow-sm p-2"
                              >
                                <h2 className="text-base font-bold  border-b pb-2 text-blue-600">
                                  {category}
                                </h2>
                                {answers.map((answer: any) => (
                                  <div
                                    className="shadow-md  text-xs p-2 mt-2 bg-gray-100 border "
                                    key={answer.question}
                                  >
                                    <div className="mb-2 ">
                                      <span className="font-bold ">
                                        Question:{" "}
                                      </span>
                                      {answer.question}
                                    </div>
                                    <div className="mb-2 ">
                                      <span className="font-bold ">
                                        Answer:
                                      </span>{" "}
                                      {answer.answer}
                                    </div>
                                    <div className="">
                                      <span className="font-bold ">
                                        Reason:
                                      </span>{" "}
                                      {answer.reason}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ))}
                        </>
                      ) : (
                        <div className="p-2 text-center text-gray-600 ">
                          Upload Audio File to see the results
                        </div>
                      )}
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </div>
          )}
        </div>
        {/* <div className="p-4 space-y-4">
        <div className="text-2xl pt-2 border-b-[1px] border-gray-400 ">
          Example
        </div>
        <div className="flex gap-4 overflow-x-auto">
          {EXAMPLES.map((example) => (
            <div
              key={example.exampleUUID}
              onClick={() => preComputedOutputHandler(example.exampleUUID)}
              className="p-2 min-w-[7rem] shadow-md rounded-md flex justify-center  bg-gray-300 hover:scale-105 hover:bg-gray-400"
            >
              <Image
                src={example.exampleIcon}
                alt=""
                className="p-2"
                width="100"
              />
            </div>
          ))}
        </div>
      </div> */}
      </div>
      <AppFooter />
      {isFormOpen && <PopUpForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
}
