import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateContent } from "../features/reducers/contentSlice";

import { putVideoFile } from "../features/api";
import { BACKGROUND_COLOR, SIGNATURE_COLOR } from "../constants/color";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";

function Convert() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const content = useSelector((state) => state.contentReducer.value);
  const option = useSelector((state) => state.optionReducer.value);

  const sendVideoFile = async () => {
    if (!content.video) return;

    setLoading(true);

    const res = await putVideoFile(content.video, option);

    setLoading(false);

    if (!res.data) return;

    if (res.data.ok) {
      dispatch(
        updateContent({
          content: "gif",
          value: res.data.gif,
        }),
      );
      navigation.navigate("Viewer");
    }
  };

  return (
    <View style={styles.convertContainer}>
      <TouchableOpacity onPress={sendVideoFile}>
        <View
          style={
            content.video ? styles.enableSendButton : styles.disableSendButton
          }
        >
          <Text style={styles.buttonText}>Convert</Text>
        </View>
        <Spinner
          visible={loading}
          size="large"
          overlayColor="rgba(0, 0, 0, 0.5)"
          animation="fade"
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  convertContainer: {
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%",
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
  buttonText: { fontSize: 24, width: 220, textAlign: "center" },
  spinnerTextStyle: {
    color: SIGNATURE_COLOR,
  },
});

export default Convert;
