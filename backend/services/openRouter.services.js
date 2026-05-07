import axios from "axios";

export const askAi = async (messages) => {
  try {
    if (!message || !Array.isArray(message) || message.length === 0) {
      throw new Error("message error is empty");
    }
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-5.2",
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${Process.env.OPENROUTER_API_KEY}`,
         
          "Content-Type": "application/json",
        },
      },
    );


    const content = response?.data?.choices?.[0]?.message?.content

    if(!content || !content.trim()){
        throw new Error("Ai returned empty response.")
    }


    return content
  } catch (error) {
    console.error("openrouter error:",error.response?.data || error.message);
    throw new Error("OpenRouter API Error")
  }
};
