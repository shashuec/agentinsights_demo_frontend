import axios from "axios";
import React, { useState, useEffect } from "react";
import { RetellWebClient } from "retell-client-js-sdk";
import { FiPhoneCall } from "react-icons/fi";
import { useToast } from "@chakra-ui/react";
import { MdCallEnd } from "react-icons/md";

const agentId = "72161b1e6512585653e9c1c17d94be53";

const BASE_URL = "https://agentinsights-robocall-5yfk5r5eya-uc.a.run.app";

interface RegisterCallResponse {
  callId?: string;
  sampleRate: number;
}

const webClient = new RetellWebClient();

const AICall = () => {
  const toast = useToast();

  const [isCalling, setIsCalling] = useState(false);

  // Initialize the SDK
  useEffect(() => {
    // Setup event listeners
    webClient.on("conversationStarted", () => {
      console.log("conversationStarted");
    });

    webClient.on("audio", (audio: Uint8Array) => {
      console.log("There is audio");
    });

    webClient.on("conversationEnded", ({ code, reason }) => {
      console.log("Closed with code:", code, ", reason:", reason);
      setIsCalling(false); // Update button to "Start" when conversation ends
    });

    webClient.on("error", (error) => {
      console.error("An error occurred:", error);
      setIsCalling(false); // Update button to "Start" in case of error
    });

    webClient.on("update", (update) => {
      // Print live transcript as needed
      console.log("update", update);
    });
  }, []);

  const toggleConversation = async () => {
    if (isCalling) {
      webClient.stopConversation();
    } else {
      const registerCallResponse = await registerCall(agentId);
      if (registerCallResponse.callId) {
        webClient
          .startConversation({
            callId: registerCallResponse.callId,
            sampleRate: registerCallResponse.sampleRate,
            enableUpdate: true,
          })
          .catch(console.error);
        setIsCalling(true); // Update button to "Stop" when conversation starts
      }
    }
  };

  async function registerCall(agentId: string): Promise<RegisterCallResponse> {
    try {
      // Replace with your server url
      let x = `${BASE_URL}/register-call`;
      console.log(x);
      const response = await axios.post(`${BASE_URL}/register-call`, {
        agentId: agentId,
      });

      const data: RegisterCallResponse = await response.data;
      return data;
    } catch (err: any) {
      console.log(err);
      toast({
        title: err.response.data.error,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      throw new Error(err);
    }
  }

  return (
    <button className="font-bold" onClick={toggleConversation}>
      <div className="fixed bottom-2 right-8 rounded-md h-10 z-50 bg-blue-600 text-white flex justify-center items-center">
        {isCalling ? (
          <>
            <span className="inline-block ml-2">
              <MdCallEnd />
            </span>
            <p className="px-2">Stop</p>
          </>
        ) : (
          <>
            <span className="inline-block ml-2">
              <FiPhoneCall />
            </span>
            <p className="px-2">Start a AI Call</p>
          </>
        )}
      </div>
    </button>
  );
};

export default AICall;
