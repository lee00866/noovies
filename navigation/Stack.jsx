import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{ headerBackButtonDisplayMode: "minimal" }}
  >
    <NativeStack.Screen name="Detail" component={Detail} />
  </NativeStack.Navigator>
);

export default Stack;
