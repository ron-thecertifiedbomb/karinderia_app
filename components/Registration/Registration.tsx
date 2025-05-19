// app/register.tsx
import React, { useState } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import AppTextInput from "@/components/shared/AppTextInput";
import Container from "@/components/shared/Container";
import Label from "@/components/shared/Label";
import AppButton from "../shared/AppButton";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert("Validation Error", "Please fill out all fields.");
      return;
    }

    try {
     
      Alert.alert("Success", "Registration complete!");
      router.replace("/(app)/");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Registration failed.");
    }
  };

  return (
    <Container>
      <Label
        text="Register"
        customTextStyle={styles.heading}
        lightColor="grey"
      />
      <View style={styles.inputGroup}>
        <AppTextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <AppTextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <AppButton title="Register" onPress={handleRegister} />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    marginBottom: 16,
  },
  inputGroup: {
    gap: 12,
    marginTop: 12,
    width: 300,
  },
});
