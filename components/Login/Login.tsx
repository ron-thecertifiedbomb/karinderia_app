import React, { useState } from "react";
import { Alert, Button, StyleSheet, View, Keyboard } from "react-native";
import Container from "@/components/shared/Container";
import Label from "@/components/shared/Label";
import { fonts } from "@/constants/Fonts";
import AppTextInput from "../shared/AppTextInput";
import { useRouter } from "expo-router";
import { authenticateAtom } from "@/store/authenticateAtom";
import { useAtom, useSetAtom } from "jotai";
import { timeCreated } from "@/utilities/util";
import { FormLogInData } from "@/interfaces/authenticate";
import { isLoadingAtom } from "@/store/menuAtom";

const Login = () => {
  const router = useRouter();
    const setLoading = useSetAtom(isLoadingAtom);
  const [_, setFormData] = useAtom(authenticateAtom);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const URL =
    "https://nextjs-server-rho.vercel.app/api/users/authenticate/route";

  const payLoad: FormLogInData = {
    username,
    password,
    timeCreated,
    isLoggedIn: true,
  };

const handleLogin = async () => {

   Keyboard.dismiss(); 
  try {
        setLoading(true)
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payLoad),
    });

    if (!response.ok) {
          setLoading(false)
      throw new Error("Failed to authenticate");

    }
    const result = await response.json();
    router.replace("/(app)/(tabs)/home");
    setFormData(result);
    return result;
  } catch (err) {
    console.error("Login error:", err);
    Alert.alert("Error", "Failed to login");
  }
};

  return (
    <Container>
      <Label
        lightColor="grey"
        customTextStyle={styles.heading4}
        text="User Login"
      />
      <View style={styles.inputGroup}>
        <AppTextInput
          placeholder="Username"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
        <AppTextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  heading4: {
    fontSize: 22,
    fontFamily: "FS Albert-Regular",
    lineHeight: fonts.heading.h4.lineHeight,
    marginBottom: 16,
  },
  inputGroup: {
    gap: 12,
    marginTop: 12,
    width: 300,
  },
});

export default Login;
