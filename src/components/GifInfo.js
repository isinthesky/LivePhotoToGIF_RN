import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { SIGNATURE_COLOR } from "../constants/color";

function GifInfo() {
  const [outputWidth, setOutputWidth] = useState(0);
  const [outputHeight, setOutputHeight] = useState(0);
  const [outputCount, setOutputCount] = useState(0);

  const content = useSelector((state) => state.contentReducer.value);
  const option = useSelector((state) => state.optionReducer.value);

  useEffect(() => {
    if (!content.video) return;

    const abs = Math.floor((content.video.width * option.Scale) / 100) % 4;

    setOutputWidth(
      Math.floor((content.video.width * option.Scale) / 100) - abs,
    );

    setOutputHeight(
      Math.floor((content.video.height * option.Scale) / 1000) * 10,
    );

    setOutputCount(Math.floor(content.video.duration * option.FPS));
  }, [content, option]);

  return (
    <View style={styles.convertContainer}>
      <Text style={styles.title}>GIF output info</Text>
      <Text style={styles.item}>
        Width :{" "}
        <Text style={styles.value}>{content.video ? outputWidth : 0}</Text>{" "}
        pixel
      </Text>
      <Text style={styles.item}>
        Height :{" "}
        <Text style={styles.value}>{content.video ? outputHeight : 0}</Text>{" "}
        pixel
      </Text>
      <Text style={styles.item}>
        Frames :{" "}
        <Text style={styles.value}>{content.video ? outputCount : 0}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  convertContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%",
    borderBottomWidth: 3,
  },
  title: {
    textAlign: "left",
    minWidth: 100,
    fontSize: 20,
    fontWeight: 600,
  },
  item: {
    textAlign: "left",
    minWidth: 100,
    fontSize: 16,
  },
  value: {
    color: SIGNATURE_COLOR,
    fontWeight: 600,
  },
});

export default GifInfo;
