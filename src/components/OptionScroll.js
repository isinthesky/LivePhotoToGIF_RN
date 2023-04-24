import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { PickerIOS } from "@react-native-picker/picker";
import { updateValue } from "../features/reducers/optionSlice";
import { SIGNATURE_COLOR } from "../constants/color";

function OptionScroll({ selectOptions, titleText, titleImage, typeText }) {
  const dispatch = useDispatch();
  const [pickerOn, setPickerOn] = useState(false);

  const value = useSelector((state) => state.optionReducer.value[titleText]);

  const update = (e) => {
    dispatch(updateValue({ option: titleText, value: e }));
  };

  const togglePicker = () => {
    setPickerOn(!pickerOn);
  };

  return (
    <View style={pickerOn ? styles.OptionContainer2 : styles.OptionContainer}>
      <View style={styles.gifOption}>
        <Text style={styles.optionText}>{titleText}</Text>
        <Image source={titleImage} style={styles.optionImage} />
        <TouchableOpacity onPress={togglePicker}>
          <Text style={styles.optionValue}>{value}</Text>
        </TouchableOpacity>
        <Text style={styles.optionType}>{typeText}</Text>
      </View>

      {pickerOn && (
        <PickerIOS
          selectedValue={value}
          itemStyle={styles.pickerText}
          style={styles.picker}
          onValueChange={update}
        >
          {selectOptions.map((item) => {
            return (
              <PickerIOS.Item
                label={item.toString()}
                key={item.toString()}
                value={item.toString()}
              />
            );
          })}
        </PickerIOS>
      )}
    </View>
  );
}

OptionScroll.propTypes = {
  selectOptions: PropTypes.array.isRequired,
  titleText: PropTypes.string.isRequired,
  titleImage: PropTypes.any.isRequired,
  typeText: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  OptionContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15,
    width: "100%",
  },
  OptionContainer2: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
  },
  gifOption: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  optionText: { fontSize: 24, width: 130, textAlign: "center" },
  optionValue: {
    fontSize: 24,
    width: 100,
    textAlign: "center",
    fontWeight: "bold",
    color: SIGNATURE_COLOR,
  },
  optionImage: { width: 30, height: 30 },
  optionType: {
    fontSize: 20,
    width: 40,
    textAlign: "left",
  },
  picker: {
    left: 33,
    width: 100,
    height: 80,
    fontSize: 20,
    lineHeight: 19,
    textAlign: "center",
  },
  pickerText: {
    left: 33,
    width: 100,
    height: 100,
    fontSize: 20,
    lineHeight: 19,
    textAlign: "center",
    color: SIGNATURE_COLOR,
    fontWeight: "bold",
  },
});

export default OptionScroll;
