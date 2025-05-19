import React, { useEffect, useState } from "react";
import { Stack, usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "@/components/Modal/Modal";
import AppIntroAnimation from "@/components/Animation/Animation";

export default function RootLayout() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<null | boolean>(null);
  const pathname = usePathname();

  useEffect(() => {
    const checkIfFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem("hasLaunched");
      if (hasLaunched === null) {
        await AsyncStorage.setItem("hasLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };

    checkIfFirstLaunch();
  }, []);

  if (isFirstLaunch === null) return null;

  if (isFirstLaunch) {
    return <AppIntroAnimation onFinish={() => setIsFirstLaunch(false)} />;
  }

  // Hide header for auth login and tabs routes
  const route =
    pathname === "/" || pathname.startsWith("/(tabs)");

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
         
        }}
      />
      <Modal />
    </>
  );
}
