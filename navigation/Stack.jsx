import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import { useColorScheme } from "react-native";
import { BLACK_COLOR, YELLOW_COLOR } from "../colors";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackButtonDisplayMode: "minimal",
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        headerTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
