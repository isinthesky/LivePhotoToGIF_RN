import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { PickerIOS } from "@react-native-picker/picker";
import ToggleSwitch from "toggle-switch-react-native";
import Video from "react-native-video";

const optionScale = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
const optionFps = [6, 8, 10, 12, 14, 16, 18, 20];
const optionSpeed = [1.0, 1.2, 1.4, 1.6, 1.8, 2.0];

function Home() {
  const [scale, setScale] = useState("0.5");
  const [fps, setFPS] = useState("10");
  const [speed, setSpeed] = useState(0.5);
  const [flip, setFlip] = useState(false);
  const [mirror, setMirror] = useState(false);
  const [video, setVideo] = useState();

  const selectFile = async () => {
    const video = await launchImageLibrary({
      selectionLimit: 1,
      mediaType: "video",
    });
    setVideo(video);
  };

  const convert = async () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
        <View style={styles.imageInputContainer}>
          <TouchableOpacity onPress={selectFile}>
            <Image
              source={require("../img/addVideo.png")}
              style={styles.bigButtonImage}
            />
            <Video
              source={"https://vjs.zencdn.net/v/oceans.mp4"}
              repeat={true}
              toggleResizeModeOnFullscreen={false}
            ></Video>
          </TouchableOpacity>
        </View>
        <View style={styles.gifOptionsContainer}>
          <View style={styles.gifOption}>
            <Text style={styles.optionText}>Scale</Text>
            <Image
              source={require("../img/option_scale.png")}
              style={styles.optionImage}
            />
            <PickerIOS
              selectedValue={scale}
              itemStyle={styles.picker}
              style={styles.picker}
              onValueChange={(itemValue) => setScale(itemValue)}
            >
              {optionScale.map((item) => {
                return (
                  <PickerIOS.Item
                    label={item.toString()}
                    key={item.toString()}
                    value={item.toString()}
                  />
                );
              })}
            </PickerIOS>
            <Text style={styles.optionValue}>%</Text>
          </View>
          <View style={styles.gifOption}>
            <Text style={styles.optionText}>FPS</Text>
            <Image
              source={require("../img/option_fps.png")}
              style={styles.optionImage}
            />
            <PickerIOS
              removeClippedSubviews={true}
              selectedValue={fps}
              itemStyle={styles.picker}
              style={styles.picker}
              onValueChange={(itemValue) => setFPS(itemValue)}
            >
              {optionFps.map((item) => {
                return (
                  <PickerIOS.Item
                    label={item.toString()}
                    key={item.toString()}
                    value={item.toString()}
                  />
                );
              })}
            </PickerIOS>
            <Text style={styles.optionValue}>fps</Text>
          </View>
          <View style={styles.gifOption}>
            <Text style={styles.optionText}>Speed</Text>
            <Image
              source={require("../img/option_speed.png")}
              style={styles.optionImage}
            />
            <PickerIOS
              removeClippedSubviews={true}
              selectedValue={speed}
              itemStyle={styles.picker}
              style={styles.picker}
              onValueChange={(itemValue) => setSpeed(itemValue)}
            >
              {optionSpeed.map((item) => {
                return (
                  <PickerIOS.Item
                    label={item.toString()}
                    key={item.toString()}
                    value={item.toString()}
                  />
                );
              })}
            </PickerIOS>
            <Text style={styles.optionValue}></Text>
          </View>
          <View style={styles.gifOption}>
            <Text style={styles.optionText}>Flip</Text>
            <Image
              source={require("../img/option_flip.png")}
              style={styles.optionImage}
            />
            <ToggleSwitch
              style={styles.optionToggle}
              isOn={flip}
              onToggle={() => {
                setFlip(!flip);
              }}
            />
            <Text style={styles.optionValue}></Text>
          </View>
          <View style={styles.gifOption}>
            <Text style={styles.optionText}>Mirror</Text>
            <Image
              source={require("../img/option_mirror.png")}
              style={styles.optionImage}
            />
            <ToggleSwitch
              style={styles.optionToggle}
              isOn={mirror}
              onToggle={() => {
                setMirror(!mirror);
              }}
            />
            <Text style={styles.optionValue}></Text>
          </View>
        </View>
        <View style={styles.convertContainer}>
          <TouchableOpacity onPress={convert}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Convert</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={convert}>
            <Image
              source={require("../img/output_link.png")}
              style={styles.bigButtonImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  gifOptionsContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%",
    borderBottomWidth: 3,
  },

  convertContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%",
    borderBottomWidth: 3,
  },
  gifOption: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  button: {
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 3,
    width: "80%",
    height: 60,
  },
  titleImage: { width: 44, height: 56 },
  screen: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 200,
    right: 140,
  },
  optionText: { fontSize: 24, width: 150, textAlign: "center" },
  optionImage: { width: 30, height: 30, borderWidth: 1 },
  optionInput: { width: 80, height: 34, borderWidth: 3, fontSize: 20 },
  optionToggle: { width: 80, height: 34, borderWidth: 1, alignItems: "center" },
  optionValue: {
    fontSize: 20,
    width: 40,
    textAlign: "left",
  },
  bigButtonImage: { width: 60, height: 60 },
  buttonText: { fontSize: 24, width: 220, textAlign: "center" },
  picker: { width: 100, height: 40 },
});

export default Home;
