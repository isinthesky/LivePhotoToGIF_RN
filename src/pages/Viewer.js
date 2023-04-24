import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { BACKGROUND_COLOR, SIGNATURE_COLOR } from "../constants/color";
import RNFetchBlob from "rn-fetch-blob";
import { SERVER_URL } from "@env";

function Viewer({ navigation }) {
  const { navigate } = navigation;
  const content = useSelector((state) => state.contentReducer.value);

  const handleBack = () => {
    navigate("Main");
  };

  const handleDownload = () => {
    const { dirs } = RNFetchBlob.fs;
    const dirToSave = dirs.DocumentDir;

    const configfb = {
      fileCache: true,
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: content.gif.filename,
      path: `${dirToSave}/${content.gif.filename}`,
    };

    RNFetchBlob.config({
      fileCache: configfb.fileCache,
      title: configfb.title,
      path: configfb.path,
    })
      .fetch("GET", SERVER_URL + content.gif.url)
      .then((res) => {
        RNFetchBlob.ios.previewDocument(res.data);
      })
      .catch((err) => {
        console.error("RNFetchBlob error ", err);
      });
  };

  return (
    <SafeAreaView style={styles.viewContainer}>
      <TouchableOpacity style={styles.backHeader} onPress={handleBack}>
        <Text style={styles.backButton}>&lt; Back</Text>
      </TouchableOpacity>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <TouchableOpacity onPress={handleDownload}>
          <Image
            source={{ uri: SERVER_URL + content.gif.url }}
            style={styles.gifImage}
          />
        </TouchableOpacity>
        <View style={styles.box}>
          <Text style={styles.item}>
            Width:{" "}
            <Text style={styles.value}>
              {content.gif ? content.gif.width : 0}
            </Text>
          </Text>
          <Text style={styles.item}>
            Height:{" "}
            <Text style={styles.value}>
              {content.gif ? content.gif.height : 0}
            </Text>
          </Text>
          <Text style={styles.item}>
            FileSize:{" "}
            <Text style={styles.value}>
              {content.gif ? content.gif.size / 1000 : 0}
            </Text>
            KB
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

Viewer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  viewContainer: {
    width: "100%",
    height: "98%",
    backgroundColor: BACKGROUND_COLOR,
    fontSize: 20,
  },
  backHeader: {
    alignContent: "flex-start",
    margin: 5,
  },
  backButton: {
    textAlign: "center",
    width: 80,
    padding: 5,
    backgroundColor: SIGNATURE_COLOR,
    fontWeight: 500,
    fontSize: 20,
  },
  gifImage: {
    alignItems: "center",
    width: "100%",
    height: 320,
    borderColor: SIGNATURE_COLOR,
    borderWidth: 2,
  },
  box: {
    padding: 10,
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

export default Viewer;
