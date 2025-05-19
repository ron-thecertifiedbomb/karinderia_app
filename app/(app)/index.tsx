import React from "react";
import { Redirect } from "expo-router";
import { useAtom } from "jotai";
import { authenticateAtom } from "@/store/authenticateAtom";

export default function RootIndex() {
  const [user] = useAtom(authenticateAtom);

  if (!user?.isLoggedIn) {
    return <Redirect href="/(auth)" />
  }

  return <Redirect href='/(tabs)/home' />;

}
