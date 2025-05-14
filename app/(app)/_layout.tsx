import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "@/components/Modal/Modal";
import AppIntroAnimation from "@/components/Animation/Animation";


export default function RootLayout() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<null | boolean>(null);

  useEffect(() => {
    const checkIfFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem("hasLaunched");
      if (hasLaunched === null) {
        // First launch
        await AsyncStorage.setItem("hasLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };

    checkIfFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return null; // Optional loading state
  }

  if (isFirstLaunch) {
    return <AppIntroAnimation onFinish={() => setIsFirstLaunch(false)} />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Modal />
    </>
  );
}
