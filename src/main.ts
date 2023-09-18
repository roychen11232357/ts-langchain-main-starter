import { APIChain } from "ts-langchain-chain-starter";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {OPEN_METEO_DOCS} from "./consts.js"


const model = new ChatOpenAI({
    temperature: 0,
    azureOpenAIApiKey: "", // In Node.js defaults to process.env.AZURE_OPENAI_API_KEY
    azureOpenAIApiVersion: "", // In Node.js defaults to process.env.AZURE_OPENAI_API_VERSION
    azureOpenAIApiDeploymentName: "GPT4", // In Node.js defaults to process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME
    azureOpenAIBasePath:
      "", // In Node.js defaults to process.env.AZURE_OPENAI_BASE_PATH
  });

export async function run() {
  const chain = APIChain.fromLLMAndAPIDocs(model, OPEN_METEO_DOCS, {
    headers: {
      // These headers will be used for API requests made by the chain.
    },
  });

  const res = await chain.call({
    question:
      "What is the weather like right now in Munich, Germany in degrees Farenheit?",
  });

  console.log(res.output);
}

run();