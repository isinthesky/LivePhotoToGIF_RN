import React from "react";
import PropTypes from "prop-types";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { BACKGROUND_COLOR } from "../constants/color";
import Selector from "../components/Selector";
import GifInfo from "../components/GifInfo";
import Options from "../components/Options";
import Convert from "../components/Convert";

function Main({ navigation }) {
  const { navigate } = navigation;
  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.screen}
      >
        <Selector />
        <GifInfo />
        <Options />
        <Convert />
      </ScrollView>
    </SafeAreaView>
  );
}

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: BACKGROUND_COLOR,
    fontSize: 20,
    borderBottomWidth: 3,
  },
  screen: {
    marginTop: 40,
  },
});

export default Main;
