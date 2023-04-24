import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import Options from "./Options";
import { selectContent } from "../util/contentSelector";
import { putVideoFile } from "../features/api";
import { useSelector, useDispatch } from "react-redux";
import {
  updateContent,
  cancelContent,
} from "../features/reducers/contentSlice";
import { updateValue } from "../features/reducers/optionSlice";
import { SERVER_URL } from "@env";
import {
  BACKGROUND_COLOR,
  DEFAULT_COLOR,
  SIGNATURE_COLOR,
} from "../constants/color";

function Home() {
  const dispatch = useDispatch();

  const [imageUrl, setImageURL] = useState();
  const [outputWidth, setOutputWidth] = useState(0);
  const [outputHeight, setOutputHeight] = useState(0);
  const [outputCount, setOutputCount] = useState(0);

  const content = useSelector((state) => state.contentReducer.value);
  const option = useSelector((state) => state.optionReducer.value);

  const selectFile = async () => {
    const content = await selectContent();

    if (content.fileName.lastIndexOf("-") > 0) {
      content.fileName = content.fileName.slice(
        content.fileName.lastIndexOf("-") + 1,
      );
    }

    content.duration = Math.round(content.duration * 100) / 100;

    dispatch(updateContent({ content: "video", value: content }));
    dispatch(updateValue({ option: "width", value: content.width }));
    dispatch(updateValue({ option: "height", value: content.height }));
  };

  const cancelFile = async () => {
    if (!content.video) return;
    Alert.alert(
      "취소",
      "등록된 영상을 취소하시겠습니까?",
      [
        {
          text: "OK",
          onPress: () => {
            dispatch(cancelContent({ content: "video" }));
          },
          style: "OK",
        },
        {
          text: "Cancel",
          onPress: () => {},
        },
      ],
      { cancelable: false },
    );
  };

  const sendVideoFile = async () => {
    if (!content.video) return;

    const res = await putVideoFile(content.video, option);

    if (res.data.ok) {
      setImageURL(`${SERVER_URL}/images/${res.data.filename}.gif`);
    }
  };

  useEffect(() => {
    if (!content.video) return;

    const abs =
      Math.floor(Number(content.video.width) * (Number(option.Scale) / 100)) %
      4;

    setOutputWidth(
      Math.floor(Number(content.video.width) * (Number(option.Scale) / 100)) -
        abs,
    );

    setOutputHeight(
      Math.floor(Number(content.video.height) * (Number(option.Scale) / 1000)) *
        10,
    );

    setOutputCount(
      Math.floor(Number(content.video.duration) * Number(option.FPS)),
    );
  }, [content, option]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.imageInputContainer}>
        <TouchableOpacity onPress={selectFile}>
          <Image
            source={require("../assets/addVideo_s.png")}
            style={styles.circleButtonImage}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={cancelFile}>
          <View style={styles.imageInfoContainer}>
            <Text style={styles.infoTitle}>Video Info</Text>
            <Text>File : {content.video ? content.video.fileName : ""}</Text>
            <Text>
              Duration : {content.video ? content.video.duration : 0} sec
            </Text>
            <Text>Width : {content.video ? content.video.width : 0} pixel</Text>
            <Text>
              Height : {content.video ? content.video.height : 0} pixel
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.convertContainer}>
        <Text style={styles.infoTitle}>GIF output info</Text>
        <Text>
          Width :{" "}
          <Text style={styles.outputText}>
            {content.video ? outputWidth : 0}
          </Text>
        </Text>
        <Text>
          Height :{" "}
          <Text style={styles.outputText}>
            {content.video ? outputHeight : 0}
          </Text>
        </Text>
        <Text>
          Image Count :{" "}
          <Text style={styles.outputText}>
            {content.video ? outputCount : 0}
          </Text>
        </Text>
      </View>

      <Options />

      <View style={styles.convertContainer}>
        <TouchableOpacity onPress={sendVideoFile}>
          <View
            style={
              content.video ? styles.enableSendButton : styles.disableSendButton
            }
          >
            <Text style={styles.buttonText}>Convert</Text>
          </View>
        </TouchableOpacity>
        <Image source={{ uri: imageUrl }} style={styles.gifImage} />
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
    backgroundColor: BACKGROUND_COLOR,
    fontSize: 20,
  },
  imageInputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 50,
    padding: 10,
    width: "100%",
    borderTopWidth: 3,
    borderBottomWidth: 3,
    backgroundColor: DEFAULT_COLOR,
  },
  imageInfoContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "left",
    paddingTop: 5,
    paddingBottom: 5,
    width: "100%",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 600,
  },
  outputText: {
    color: SIGNATURE_COLOR,
    fontWeight: 600,
  },
  convertContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%",
    borderBottomWidth: 3,
  },
  disableSendButton: {
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 3,
    width: "80%",
    height: 60,
    backgroundColor: BACKGROUND_COLOR,
  },
  enableSendButton: {
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 3,
    width: "80%",
    height: 60,
    backgroundColor: SIGNATURE_COLOR,
  },
  circleButtonImage: { width: 60, height: 60 },
  gifImage: { width: 300, height: 300 },
  buttonText: { fontSize: 24, width: 220, textAlign: "center" },
});

export default Home;
