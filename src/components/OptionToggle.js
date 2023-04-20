import React from "react";
import PropTypes from "prop-types";
import ToggleSwitch from "toggle-switch-react-native";

import { View, Text, Image, StyleSheet } from "react-native";

function OptionToggle({ titleText, titleImage, typeText, onValue, value }) {
  return (
    <View style={styles.gifOption}>
      <Text style={styles.optionText}>{titleText}</Text>
      <Image source={titleImage} style={styles.optionImage} />
      <ToggleSwitch
        style={styles.optionToggle}
        isOn={value}
        onToggle={onValue}
      />
      <Text style={styles.optionValue}>{typeText}</Text>
    </View>
  );
}

OptionToggle.propTypes = {
  titleText: PropTypes.string.isRequired,
  titleImage: PropTypes.string.isRequired,
  typeText: PropTypes.string.isRequired,
  onValue: PropTypes.any.isRequired,
  value: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  gifOption: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  optionText: { fontSize: 24, width: 150, textAlign: "center" },
  optionImage: { width: 30, height: 30 },
  optionValue: {
    fontSize: 20,
    width: 40,
    textAlign: "left",
  },
  optionToggle: { width: 80, height: 34, alignItems: "center" },
});

export default OptionToggle;
