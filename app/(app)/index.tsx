import Login from "@/components/Login/Login";
import { Redirect } from "expo-router";
import React from "react";
import { Platform } from "react-native";


const AppIndex: React.FC = () => {

  return (
    <>
      <Login />
    </>
  );
};

export default AppIndex;
