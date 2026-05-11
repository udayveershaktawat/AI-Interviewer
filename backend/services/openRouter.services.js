import axios from "axios";

export const askAi = async (messages) => {
  try {
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("messages array is empty");
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "inclusionai/ring-2.6-1t:free",
        messages: messages,
        // max_tokens: 500,
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const content = response.data.choices[0].message.content;

    if (!content || !content.trim()) {
      throw new Error("AI returned empty response");
    }

    return content;
  } catch (error) {
    console.error("openrouter error:", error.response?.data || error.message);

    throw new Error(error.response?.data?.error?.message || error.message);
  }
};
