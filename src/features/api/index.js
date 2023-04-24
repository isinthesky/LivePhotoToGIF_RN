import { SERVER_URL } from "@env";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
});

export const putVideoFile = async (video, option) => {
  if (!video) return;
  try {
    const formData = new FormData();
    formData.append("file", {
      uri: video.uri,
      type: "multipart/form-data",
      name: video.fileName,
    });

    formData.append("option", JSON.stringify(option));

    const res = await axiosInstance.put("/video/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (error) {
    console.error("putVideoFile err:", error);
  }
};
