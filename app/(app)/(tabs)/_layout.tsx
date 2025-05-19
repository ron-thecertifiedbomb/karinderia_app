import React from "react";
import { Tabs,  useRouter } from "expo-router";
import Icon from "@/components/shared/Icon";
import { StyleSheet } from "react-native";

import AppHeader from "@/components/shared/AppHeader";

export default function TabsLayout() {
  const router = useRouter();



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
          headerShown: true,
            headerLeft: () => <AppHeader />,
          headerStyle: {
         height: 100,
            backgroundColor: "#fff",
          },
          
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} type="AntDesign" />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          headerShown: true,
            headerTitle: "", 
          headerLeft: () => <AppHeader />,
          headerStyle: {
            height: 100, 
            backgroundColor: "#fff",
          },
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



const styles = StyleSheet.create({
  container: {
   flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    padding: 12,
    width: '100%'
  },
 leftSection: {
  flexDirection: 'row',
  gap: 10
 }
});
