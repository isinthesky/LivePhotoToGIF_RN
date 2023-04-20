import React from "react";
import PropTypes from "prop-types";

import { View, Text, Image, StyleSheet } from "react-native";
import { PickerIOS } from "@react-native-picker/picker";

function OptionScroll({
  selectOptions,
  titleText,
  titleImage,
  typeText,
  onValue,
  value,
}) {
  return (
    <View style={styles.gifOption}>
      <Text style={styles.optionText}>{titleText}</Text>
      <Image source={titleImage} style={styles.optionImage} />
      <PickerIOS
        selectedValue={value}
        itemStyle={styles.picker}
        style={styles.picker}
        onValueChange={onValue}
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
      <Text style={styles.optionValue}>{typeText}</Text>
    </View>
  );
}

OptionScroll.propTypes = {
  selectOptions: PropTypes.array.isRequired,
  titleText: PropTypes.string.isRequired,
  titleImage: PropTypes.string.isRequired,
  typeText: PropTypes.string.isRequired,
  onValue: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
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
  picker: { width: 100, height: 40 },
});

export default OptionScroll;
