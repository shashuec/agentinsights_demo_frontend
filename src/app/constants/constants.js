import example_1 from "../assets/example_1.png";
import example_2 from "../assets/example_2.png";
import example_3 from "../assets/example_3.png";
import example_4 from "../assets/example_4.png";

export const EXAMPLES = [
  {
    exampleUUID: "428e6953-a268-405b-a67f-ca0a1d453e9e",
    exampleIcon: example_1,
  },
  {
    exampleUUID: "b92803ff-bb68-4d79-ad7c-32d2c74a7484",
    exampleIcon: example_2,
  },
  {
    exampleUUID: "296ebb6e-75ba-48aa-8869-3ca6f24ba019",
    exampleIcon: example_3,
  },
  {
    exampleUUID: "f55d2b86-d158-4b69-921e-be3c666863e8",
    exampleIcon: example_4,
  },
];

export const PLACEHOLDER_RESPONSES = [
  "Uploading the File: Initializing and validating audio file upload",
  "File Verification: Checking audio file format and ensuring compatibility",
  "Preparation for Splitting: Analyzing the audio file to determine optimal split points",
  "Audio Splitting: Dividing the audio file into smaller, manageable chunks",
  "Initialization of Transcription: Preparing the system to convert audio chunks into text",
  "Running Transcription: Transcribing each audio chunk into its text equivalent",
  "Audio Classification: Identifying representative and customer audio sections",
  "AI Model Preparation: Loading AI models and readying them for analysis",
  "Running AI Analysis: Applying AI models on each audio chunk for deeper insights",
  "Compilation & Delivery: Assembling all the processed data and preparing it for return",
];
