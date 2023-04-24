import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Main from "../pages/Main";
import Viewer from "../pages/Viewer";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        <Screen name="Main" component={Main} />
        <Screen name="Viewer" component={Viewer} />
      </Navigator>
    </NavigationContainer>
  );
}
