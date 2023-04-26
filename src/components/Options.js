import React from "react";
import { View, StyleSheet } from "react-native";
import OptionScroll from "./OptionScroll";
import OptionToggle from "./OptionToggle";
import { DEFAULT_COLOR } from "../constants/color";

const optionScale = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const optionFps = [6, 8, 10, 12, 14, 16, 18, 20];
const optionSpeed = [1.0, 1.2, 1.4, 1.6, 1.8, 2.0];

function Options() {
  return (
    <View style={styles.gifOptionsContainer}>
      <OptionScroll
        selectOptions={optionScale}
        titleText="Scale"
        titleImage={require("../assets/option_scale.png")}
        typeText="%"
      />
      <OptionScroll
        selectOptions={optionFps}
        titleText="FPS"
        titleImage={require("../assets/option_fps.png")}
        typeText="fps"
      />
      <OptionScroll
        selectOptions={optionSpeed}
        titleText="Speed"
        titleImage={require("../assets/option_speed.png")}
        typeText="x"
      />
      <OptionToggle
        titleText="Flip"
        titleImage={require("../assets/option_flip.png")}
        typeText=""
      />
      <OptionToggle
        titleText="Mirror"
        titleImage={require("../assets/option_mirror.png")}
        typeText=""
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gifOptionsContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
    borderBottomWidth: 3,
    backgroundColor: DEFAULT_COLOR,
  },
});

export default Options;
