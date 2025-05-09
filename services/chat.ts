// services/chat.ts
import axios from "axios";

export const sendPrompt = async (token: string, prompt: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/query`,
      { 
        query: prompt
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending promp:", error);
  }
};

