import React from "react";
import Icon from "@/components/shared/Icon";
import { Redirect, Tabs } from "expo-router";
import { authenticateAtom } from "@/store/authenticateAtom";
import { useAtom } from "jotai";

export default function TabsLayout() {
  const [user,_] = useAtom(authenticateAtom);

  if (!user?.isLoggedIn) {
    return <Redirect href="/(app)" />;
  }

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "black",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} type="AntDesign" />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="settings-outline"
              size={size}
              color={color}
              type="Ionicons"
            />
          ),
        }}
      />
    </Tabs>
  );
}
