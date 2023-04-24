import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Image, StyleSheet } from "react-native";
import { updateValue } from "../features/reducers/optionSlice";

import ToggleSwitch from "toggle-switch-react-native";
import { SIGNATURE_COLOR } from "../constants/color";

function OptionToggle({ titleText, titleImage, typeText }) {
  const dispatch = useDispatch();

  const update = (e) => {
    dispatch(updateValue({ option: titleText, value: e }));
  };

  const value = useSelector((state) => state.optionReducer.value[titleText]);

  return (
    <View style={styles.gifOption}>
      <Text style={styles.optionText}>{titleText}</Text>
      <Image source={titleImage} style={styles.optionImage} />
      <ToggleSwitch
        style={styles.optionToggle}
        onColor={SIGNATURE_COLOR}
        isOn={value}
        onToggle={update}
      />
      <Text style={styles.optionValue}>{typeText}</Text>
    </View>
  );
}

OptionToggle.propTypes = {
  titleText: PropTypes.string.isRequired,
  titleImage: PropTypes.any.isRequired,
  typeText: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  gifOption: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "100%",
  },
  optionText: { fontSize: 24, width: 130, textAlign: "center" },
  optionImage: { width: 30, height: 30 },
  optionValue: {
    fontSize: 20,
    width: 40,
    textAlign: "left",
  },
  optionToggle: {
    width: 100,
    height: 34,
    alignItems: "center",
  },
});

export default OptionToggle;
