
import AppHeader from "@/components/shared/AppHeader";
import { Slot } from "expo-router";
import React from "react";

export default function WebLayout() {
  return (
    <>
      <AppHeader />
      <Slot />;
    </>
  );
}
