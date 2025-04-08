// services/chat.ts
import axios from "axios";

export const sendPrompt = async (prompt: string, token: string, userID: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/query`,
    { query: prompt, user_id: userID },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

