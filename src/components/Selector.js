import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  updateContent,
  removeContent,
} from "../features/reducers/contentSlice";
import { updateValue } from "../features/reducers/optionSlice";
import { selectContent } from "../util/contentSelector";
import { DEFAULT_COLOR, SIGNATURE_COLOR } from "../constants/color";

function Selector() {
  const dispatch = useDispatch();

  const content = useSelector((state) => state.contentReducer.value);

  const selectFile = async () => {
    const content = await selectContent();

    dispatch(removeContent({ content: "video" }));

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
            dispatch(removeContent({ content: "video" }));
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

  return (
    <View style={styles.imageInputContainer}>
      <TouchableOpacity onPress={selectFile}>
        <Image
          source={require("../assets/addVideo_s.png")}
          style={styles.circleButtonImage}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={cancelFile}>
        <View style={styles.imageInfoContainer}>
          <Text style={styles.title}>Video Info</Text>
          <Text style={styles.item}>
            File : {content.video ? content.video.fileName : ""}
          </Text>
          <Text style={styles.item}>
            Duration :{" "}
            <Text style={styles.value}>
              {content.video ? content.video.duration : 0}
            </Text>{" "}
            sec
          </Text>
          <Text style={styles.item}>
            Width : {content.video ? content.video.width : 0} pixel
          </Text>
          <Text style={styles.item}>
            Height : {content.video ? content.video.height : 0} pixel
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imageInputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    backgroundColor: DEFAULT_COLOR,
  },
  imageInfoContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    paddingTop: 5,
    paddingBottom: 5,
    minWidth: 150,
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
  },
  item: {
    fontSize: 16,
  },
  value: {
    color: SIGNATURE_COLOR,
    fontWeight: 600,
  },
  circleButtonImage: { width: 70, height: 70 },
});

export default Selector;
