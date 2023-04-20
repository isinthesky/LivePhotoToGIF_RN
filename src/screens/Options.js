import React, { useState } from "react";
import OptionScroll from "../components/OptionScroll";
import OptionToggle from "../components/OptionToggle";

import { View, StyleSheet } from "react-native";

const optionScale = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const optionFps = [6, 8, 10, 12, 14, 16, 18, 20];
const optionSpeed = [1.0, 1.2, 1.4, 1.6, 1.8, 2.0];

function Options() {
  const [scale, setScale] = useState("50");
  const [fps, setFPS] = useState("10");
  const [speed, setSpeed] = useState(0.5);
  const [flip, setFlip] = useState(false);
  const [mirror, setMirror] = useState(false);

  return (
    <View style={styles.gifOptionsContainer}>
      <OptionScroll
        selectOptions={optionScale}
        titleText="Scale"
        titleImage={require("../assets/option_scale.png")}
        typeText="%"
        onValue={setScale}
        value={scale}
      />
      <OptionScroll
        selectOptions={optionFps}
        titleText="FPS"
        titleImage={require("../assets/option_fps.png")}
        typeText="fps"
        onValue={setFPS}
        value={fps}
      />
      <OptionScroll
        selectOptions={optionSpeed}
        titleText="Speed"
        titleImage={require("../assets/option_speed.png")}
        typeText="x"
        onValue={setSpeed}
        value={speed}
      />
      <OptionToggle
        titleText="Flip"
        titleImage={require("../assets/option_flip.png")}
        typeText=""
        onValue={setFlip}
        value={flip}
      />
      <OptionToggle
        titleText="Mirror"
        titleImage={require("../assets/option_mirror.png")}
        typeText=""
        onValue={setMirror}
        value={mirror}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gifOptionsContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%",
    borderBottomWidth: 3,
  },
});

export default Options;
