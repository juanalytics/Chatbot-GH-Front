// services/chat.ts
import axios from "axios";

export const sendFeedback = async (token: string, messageId: string, type: "like" | "dislike") => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/feedback`, 
        {
          message_id: messageId,
          feedback: type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  };