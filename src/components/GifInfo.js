import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { SIGNATURE_COLOR } from "../constants/color";
import { VLCPlayer } from "react-native-vlc-media-player";

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
    <View style={styles.gifContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>GIF Output Info</Text>
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
      {content.video ? (
        <VLCPlayer
          style={styles.player}
          videoAspectRatio="16:10"
          autoplay={true}
          autoReloadLive={true}
          source={{
            uri: content.video ? content.video.uri : "",
            isNetwork: false,
            isAsset: true,
            autoplay: true,
          }}
        />
      ) : (
        <View style={styles.LogoBox}>
          <Text style={styles.Logo1}>
            Video{"     "}
            {"\n"}
            {"     "} to GIF
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  gifContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 3,
  },
  player: {
    width: "55%",
    height: 130,
  },
  infoContainer: {
    alignItems: "flex-start",
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 20,
    width: "45%",
  },
  LogoBox: {
    justifyContent: "space-around",
    alignItems: "center",
    width: 200,
    height: 130,
    backgroundColor: SIGNATURE_COLOR,
  },
  Logo1: {
    textAlign: "left",
    color: "white",
    fontSize: 36,
    fontWeight: 600,
  },
  Logo2: {
    textAlign: "right",
    color: "white",
    fontSize: 36,
    fontWeight: 600,
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
