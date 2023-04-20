import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Options from "./Options";
import { selectContent } from "../util/contentSelector";
import { putVideoFile } from "../features/api";

function Home() {
  const [video, setVideo] = useState();

  const selectFile = async () => {
    setVideo(await selectContent());
  };

  const sendVideoFile = async () => {
    const res = await putVideoFile(video ? video : null);
    console.info("sendVideoFile res:", res);
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.imageInputContainer}>
        <TouchableOpacity onPress={selectFile}>
          <Image
            source={require("../assets/addVideo.png")}
            style={styles.circleButtonImage}
          />
          <Text>{video ? video.fileName : ""}</Text>
          <Text>{video ? video.duration : ""}</Text>
        </TouchableOpacity>
      </View>
      <Options />
      <View style={styles.convertContainer}>
        <TouchableOpacity onPress={sendVideoFile}>
          <View style={styles.sendButton}>
            <Text style={styles.buttonText}>Convert</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  imageInputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 50,
    padding: 15,
    width: "100%",
    borderTopWidth: 3,
    borderBottomWidth: 3,
  },
  convertContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%",
    borderBottomWidth: 3,
  },
  sendButton: {
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 3,
    width: "80%",
    height: 60,
  },
  circleButtonImage: { width: 60, height: 60 },
  buttonText: { fontSize: 24, width: 220, textAlign: "center" },
});

export default Home;
