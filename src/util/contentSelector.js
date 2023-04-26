import { launchImageLibrary } from "react-native-image-picker";

export const selectContent = async function () {
  const selectedVideo = await launchImageLibrary({
    selectionLimit: 1,
    mediaType: "video",
  });

  return selectedVideo.assets ? selectedVideo.assets[0] : null;
};
