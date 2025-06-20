import { useCallback, useEffect, useState } from "react";
import { View, useColorScheme } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useAssets } from "expo-asset";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styled";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontLoaded, error] = useFonts({
    Montserrat: require("./assets/Gabarito-VariableFont_wght.ttf"),
  });
  const [assetsLoaded] = useAssets([require("./assets/playus.jpg")]);

  const isReady = fontLoaded && assetsLoaded;

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  const isDark = useColorScheme() === "dark";
  if (!isReady) return null;
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <NavigationContainer>
            <Root />
          </NavigationContainer>
        </View>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
