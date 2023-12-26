"use client";
import { useState, useEffect, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";
import { PlayAudio } from "../components/PlayAudio";
import {
  Icon,
  Spinner,
  useToast,
  CircularProgress,
  CircularProgressLabel,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Divider,
  Progress,
} from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import PopUpForm from "../components/PopUpForm";
import axios from "axios";
import { FcUpload } from "react-icons/fc";
import { FaCheckCircle, FaLightbulb } from "react-icons/fa";
import { FaRegFaceGrimace } from "react-icons/fa6";
import { MdSupportAgent, MdInsights } from "react-icons/md";
import { BsFillFileTextFill } from "react-icons/bs";
import { TbReportAnalytics, TbBulb, TbScript } from "react-icons/tb";
import { PiHandshakeLight } from "react-icons/pi";
import { LuTrendingUp } from "react-icons/lu";

import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";
import { PLACEHOLDER_RESPONSES, EXAMPLES } from "../constants/constants";
import { ThreeDots } from "react-loader-spinner";
import TranscriptBox from "../components/TranscriptBox";
import AppFooter from "../components/AppFooter";
import LandingPageHeader from "../components/LandingPageHeader";
import Image from "next/image";
import { formatDuration } from "../../utils/util";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fileTypes = ["MP3", "WAV", "MP4", "AAC", "AMR", "M4A"];
  // const [isOpen, setIsOpen] = useState(true);
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

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    // Show the form if the cookie is not set
    if (!Cookies.get("formSubmitted")) {
      setIsFormOpen(false);
      // if (process.env.NEXT_PUBLIC_ENV === "developement") {
      //   setIsFormOpen(false);
      // } else {
      //   setIsFormOpen(true);
      // }
    }
  }, []);

  // const closeForm = () => {
  //   setIsFormOpen(false);
  // };

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

    const utmParams: any = {};
    let shouldUpdateCookies = false;

    // Check for UTM parameters in the URL
    [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ].forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        utmParams[key] = value;
        shouldUpdateCookies = true;
      } else {
        // If not present in URL, try getting from cookies
        utmParams[key] = Cookies.get(key) || "";
      }
    });

    // Update cookies if UTM params are present in the URL
    if (shouldUpdateCookies) {
      for (const [key, value] of Object.entries(utmParams)) {
        Cookies.set(key, value as any, { expires: 7 }); // Expires in 30 days
      }
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

  function getTailwindBackgroundColor(answer: any) {
    switch (answer.toLowerCase()) {
      case "yes":
        return "bg-green-200"; // Green for 'Yes'
      case "no":
        return "bg-red-300"; // Red for 'No'
      case "partial":
        return "bg-yellow-200"; // Yellow for 'Partially'
      case "not applicable":
        return "bg-gray-200"; // Gray for 'Not Applicable'
      default:
        return "bg-white"; // Default color, if the answer doesn't match any case
    }
  }

  const getProgressColor = (score: number) => {
    if (score >= 7 && score <= 10) return "green.500";
    else if (score >= 5 && score < 7) return "yellow.300";
    else return "red.500";
  };

  const getProgressColorScheme = (score: number) => {
    if (score >= 7 && score <= 10) return "green";
    else if (score >= 5 && score < 7) return "yellow";
    else return "red";
  };

  const getTextColor = (score: number) => {
    if (score >= 7 && score <= 10) return "text-green-500";
    else if (score >= 5 && score < 7) return "text-yellow-300";
    else return "text-red-500";
  };

  useEffect(() => {
    scrollToBottom();
  }, [output, logs]);

  function calculateNormalizedScore(totalScore: number, maxScore: number) {
    if (maxScore == 0) maxScore = 10;

    let normalizedScore = (totalScore / maxScore) * 10;
    return parseFloat(normalizedScore.toFixed(1));
  }

  return (
    <div className="relative bg-blue-50">
      <LandingPageHeader />
      <div>
        <div className="p-4 text-2xl italic font-bold text-center">
          Upload Your Audio and Experience the Magic
        </div>
        <div className="px-4 grid grid-cols-1 lg:grid-cols-7 space-y-2 lg:space-y-0 lg:gap-2 pb-4 w-full">
          <div className="px-4 pt-2 relative bg-white rounded-sm col-span-3 ">
            {audioFileUrl && (
              <PlayAudio audio={audioFileUrl} setCurrentTime={setCurrentTime} />
            )}
            <div className="overflow-hidden">
              <div>
                <FileUploader
                  multiple={true}
                  handleChange={handleChange}
                  name="audioFileUrl"
                  types={fileTypes}
                />
              </div>

              {audioFileError && (
                <div className="text-sm pt-1 text-red-500">
                  Please upload an audio file!
                </div>
              )}
            </div>
            {showQuestions ? (
              <div className="mt-4">
                <div className="w-fit p-2 text-white bg-blue-600 rounded-md font-bold shadow-md  font-mono">
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
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            ) : (
              <Tabs marginTop={4}>
                <TabList>
                  <Tab fontSize={["xs", "xs", "xs"]}>
                    <Icon as={TbScript} className="text-base" />
                    <span>Transcript</span>
                  </Tab>
                  <Tab fontSize={["xs", "xs", "xs"]}>
                    <Icon as={FaRegFaceGrimace} className="text-base" />
                    <span>&nbsp;</span>
                    <span className="whitespace-nowrap">Bad Words</span>
                    <span>&nbsp;</span>
                    <span>({output?.bad_words.length})</span>
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <TranscriptBox
                      currentTime={currentTime}
                      transcript={output.source_transcript}
                    />
                  </TabPanel>
                  <TabPanel>
                    <div className="w-full">
                      <ul className="list-disc text-base shadow-md rounded-sm px-6 py-4 bg-gray-50 space-y-3">
                        {output.bad_words && output.bad_words.length > 0 ? (
                          output.bad_words.map((item: any, index: number) => (
                            <p key={index}>
                              <span className="bg-gray-100 p-1 rounded-sm text-gray-700">
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
                              <span className="ml-2 text-red-600">
                                {item.bad_word}
                              </span>
                            </p>
                          ))
                        ) : (
                          <p>No bad words found</p>
                        )}
                      </ul>
                    </div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            )}
            {/* Submit Div */}
            {!startLogging && (
              <div className="sticky bottom-0 bg-white py-2 mb-2 mt-4 w-full max-md:flex max-md:justify-center">
                <button
                  className="bg-blue-600 text-white p-2 shadow-md rounded-md"
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
            <div className="col-span-4 bg-white">
              <Box p={2} className="w-full flex-1 mb-4">
                <div className="text-2xl mb-1 flex items-center">
                  <div className="flex flex-wrap py-2 flex-row w-full justify-between items-center gap-4">
                    <div>
                      <span className="text-2xl mr-2">
                        <TbReportAnalytics className="inline text-green-500 mb-1" />
                      </span>
                      <span className="font-medium text-lg">Report</span>
                    </div>
                    {output && (
                      <>
                        {/* <div className="border-l-[1px] h-16">&nbsp;</div> */}
                        <div className="flex md:justify-center items-center">
                          <div
                            className={`font-bold text-xl flex items-center ${getTextColor(
                              calculateNormalizedScore(
                                output.score,
                                output.total_max_score
                              )
                            )}`}
                          >
                            <span className="whitespace-nowrap">
                              <svg
                                className="w-8 h-8 inline"
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M28 14.6667V12H25.3333V9.33333C25.3312 8.62674 25.0496 7.94969 24.55 7.45005C24.0503 6.95041 23.3733 6.66878 22.6667 6.66667H20V4H17.3333V6.66667H14.6667V4H12V6.66667H9.33333C8.62674 6.66878 7.94969 6.95041 7.45005 7.45005C6.95041 7.94969 6.66878 8.62674 6.66667 9.33333V12H4V14.6667H6.66667V17.3333H4V20H6.66667V22.6667C6.66878 23.3733 6.95041 24.0503 7.45005 24.55C7.94969 25.0496 8.62674 25.3312 9.33333 25.3333H12V28H14.6667V25.3333H17.3333V28H20V25.3333H22.6667C23.3733 25.3312 24.0503 25.0496 24.55 24.55C25.0496 24.0503 25.3312 23.3733 25.3333 22.6667V20H28V17.3333H25.3333V14.6667H28ZM22.6667 22.6667H9.33333V9.33333H22.6667V22.6667Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M15.148 10.6667H13.3547L10.6747 21.3334H12.044L12.6627 18.8334H15.7507L16.3534 21.3334H17.7693L15.148 10.6667ZM12.8427 17.7654L14.2 11.9334H14.2614L15.572 17.7654H12.8427ZM18.992 10.6667H20.3254V21.3334H18.992V10.6667Z"
                                  fill="currentColor"
                                />
                              </svg>
                              <span className="text-lg">QA Score: &nbsp;</span>
                            </span>
                          </div>
                          <div>
                            <CircularProgress
                              value={
                                calculateNormalizedScore(
                                  output.score,
                                  output.total_max_score
                                ) * 10
                              }
                              size="70px"
                              color={getProgressColor(
                                calculateNormalizedScore(
                                  output.score,
                                  output.total_max_score
                                )
                              )}
                            >
                              <CircularProgressLabel>
                                <span className="font-bold text-xs">
                                  {calculateNormalizedScore(
                                    output.score,
                                    output.total_max_score
                                  )}
                                  /10
                                </span>

                                {/* {output.max_score == 0 ? 10 : output.max_score} */}
                              </CircularProgressLabel>
                            </CircularProgress>
                          </div>
                        </div>
                        {/* <div className="border-l-[1px] h-16">&nbsp;</div> */}
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2 relative text-sm font-medium text-gray-500">
                            <div className="flex items-center">
                              <span className="flex items-center">
                                <PiHandshakeLight className="inline-block text-lg mr-1" />
                                Call Introduction
                              </span>
                            </div>
                            <div className="flex justify-end items-center">
                              <span className="absolute right-0 -top-3 z-20 text-xs">
                                {calculateNormalizedScore(
                                  output.scores_by_category["Call Introduction"]
                                    .score,
                                  output.scores_by_category["Call Introduction"]
                                    .max_score
                                )}
                                /10
                              </span>

                              <Progress
                                colorScheme={getProgressColorScheme(
                                  calculateNormalizedScore(
                                    output.scores_by_category[
                                      "Call Introduction"
                                    ].score,
                                    output.scores_by_category[
                                      "Call Introduction"
                                    ].max_score
                                  )
                                )}
                                value={
                                  calculateNormalizedScore(
                                    output.scores_by_category[
                                      "Call Introduction"
                                    ].score,
                                    output.scores_by_category[
                                      "Call Introduction"
                                    ].max_score
                                  ) * 10
                                }
                                className="flex-grow"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 items-center relative text-sm font-medium text-gray-500">
                            <div className="flex items-center">
                              <span className="flex items-center">
                                <LuTrendingUp className="inline-block text-lg mr-1" />
                                Call Progression
                              </span>
                            </div>

                            <div className="flex justify-end items-center">
                              <span className="absolute right-0 -top-3 z-20 text-xs">
                                {calculateNormalizedScore(
                                  output.scores_by_category["Call Progression"]
                                    .score,
                                  output.scores_by_category["Call Progression"]
                                    .max_score
                                )}
                                /10
                              </span>

                              <Progress
                                colorScheme={getProgressColorScheme(
                                  calculateNormalizedScore(
                                    output.scores_by_category[
                                      "Call Progression"
                                    ].score,
                                    output.scores_by_category[
                                      "Call Progression"
                                    ].max_score
                                  )
                                )}
                                value={
                                  calculateNormalizedScore(
                                    output.scores_by_category[
                                      "Call Progression"
                                    ].score,
                                    output.scores_by_category[
                                      "Call Progression"
                                    ].max_score
                                  ) * 10
                                }
                                className="flex-grow"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 items-center relative text-sm font-medium text-gray-500">
                            <div className="flex items-center">
                              <span className="flex items-center">
                                <TbBulb className="inline-block text-lg mr-1" />
                                Call Conclusion
                              </span>
                            </div>

                            <div className="flex justify-end items-center">
                              <span className="absolute right-0 -top-3 z-20 text-xs">
                                {calculateNormalizedScore(
                                  output.scores_by_category["Call Conclusion"]
                                    .score,
                                  output.scores_by_category["Call Conclusion"]
                                    .max_score
                                )}
                                /10
                              </span>

                              <Progress
                                colorScheme={getProgressColorScheme(
                                  calculateNormalizedScore(
                                    output.scores_by_category["Call Conclusion"]
                                      .score,
                                    output.scores_by_category["Call Conclusion"]
                                      .max_score
                                  )
                                )}
                                value={
                                  calculateNormalizedScore(
                                    output.scores_by_category["Call Conclusion"]
                                      .score,
                                    output.scores_by_category["Call Conclusion"]
                                      .max_score
                                  ) * 10
                                }
                                className="flex-grow"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <Divider />
                <div className="my-4 mx-2 space-y-1">
                  <p className="font-medium">Purpose of call</p>
                  <ul className="list-disc text-sm shadow-even p-4 px-6 border-l-4 border-l-blue-500 space-y-3">
                    {output?.purpose_of_call &&
                    output?.purpose_of_call?.length > 0 ? (
                      output.purpose_of_call.map(
                        (purpose: any, index: number) => {
                          if (purpose.length > 3) {
                            return (
                              <li className="" key={index}>
                                {purpose}
                              </li>
                            );
                          }
                        }
                      )
                    ) : (
                      <p>Upload Audio File to see the results</p>
                    )}
                  </ul>
                </div>
                <Tabs isFitted>
                  <TabList id="transrcipt-tablist" className="" flexWrap="wrap">
                    <Tab fontSize={["xs", "xs", "xs"]} className="">
                      <Icon as={MdInsights} className="text-xl" />
                      <span>&nbsp;</span>
                      <span className="whitespace-nowrap">
                        Customer Insight
                      </span>
                      <span>&nbsp;</span>
                      {output && (
                        <span>({output.customer_insights.length})</span>
                      )}
                    </Tab>
                    <Tab fontSize={["xs", "xs", "xs"]}>
                      <Icon as={MdSupportAgent} className="text-xl" />
                      <span>&nbsp;</span>
                      <span className="whitespace-nowrap">Agent Actions</span>
                      <span>&nbsp;</span>
                      {output && <span>({output.call_to_actions.length})</span>}
                    </Tab>
                    <Tab fontSize={["xs", "xs", "xs"]}>
                      <Icon as={FaLightbulb} className="text-base" />
                      <span>&nbsp;</span>
                      <span className="whitespace-nowrap">
                        Areas of Improvement
                      </span>
                      <span>&nbsp;</span>
                      {output && <span>({output.areas.length})</span>}
                    </Tab>
                    <Tab fontSize={["xs", "xs", "xs"]}>
                      <Icon as={BsFillFileTextFill} className="text-base" />
                      <span>&nbsp;</span>
                      <span className="whitespace-nowrap">
                        Detailed Summary
                      </span>
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      {output ? (
                        <div className="w-full">
                          <ul className="list-disc text-base shadow-md rounded-sm px-6 py-4 bg-gray-50 space-y-3">
                            {/* <div className="font-bold text-lg">
                          Customer Insights
                        </div> */}
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
                              <p>No customer insights available.</p>
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
                        <div className="w-full">
                          <ul className="list-disc text-base shadow-even rounded-sm p-4 px-6 bg-gray-50 space-y-3">
                            {/* <div className="font-bold text-lg">Agent Actions</div> */}
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
                              <p>No call to actions available.</p>
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
                        <div>
                          <Box className="mt-2">
                            <ul className="list-disc text-base shadow-even rounded-sm p-4 px-6 bg-gray-50 space-y-3">
                              {output.areas && output.areas.length > 0 ? (
                                output.areas.map((area: any, index: number) => (
                                  <li className="" key={index}>
                                    {area}
                                  </li>
                                ))
                              ) : (
                                <p>No areas of improvement available.</p>
                              )}
                            </ul>
                          </Box>
                        </div>
                      ) : (
                        <div className="p-2 text-center text-gray-600">
                          Upload Audio File to see the results
                        </div>
                      )}
                    </TabPanel>

                    <TabPanel>
                      {output &&
                        Object.entries(
                          categorizeResults(output.combined_output)
                        ).map(([category, answers]: any) => (
                          <div
                            key={category}
                            className="mb-6 bg-white border rounded-lg shadow-sm p-2"
                          >
                            <h2 className="text-base font-bold border-b pb-2 text-blue-600">
                              {category}
                            </h2>
                            {answers.map((answer: any) => (
                              <div
                                className="shadow-md rounded-md text-sm p-4 mt-1 bg-gray-50  max-md:w-full"
                                key={answer.question}
                              >
                                <div>
                                  <span className="font-bold">Question: </span>
                                  {answer.question}
                                </div>
                                <div>
                                  <span className="font-bold">Answer: </span>
                                  <span
                                    className={`${getTailwindBackgroundColor(
                                      answer.answer
                                    )} px-2 py-[0.1rem] rounded-md `}
                                  >
                                    {answer.answer}
                                  </span>
                                </div>
                                <div>
                                  <span className="font-bold">Reason: </span>
                                  {answer.reason}
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </div>
          )}
        </div>
      </div>
      <AppFooter />
      {isFormOpen && <PopUpForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
}
