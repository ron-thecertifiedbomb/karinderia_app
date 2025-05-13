import React from "react";
import { Stack } from "expo-router";
import Modal from "@/components/Modal/Modal";



export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Modal /> 
    </>
  );
}
