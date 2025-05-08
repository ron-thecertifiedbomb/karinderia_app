import React, { useState } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";
import Container from "@/components/shared/Container";
import Label from "@/components/shared/Label";
import { fonts } from "@/constants/Fonts";
import AppTextInput from "../shared/AppTextInput";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(
        `http://10.0.2.2:3001/users?username=${username}&password=${password}`
      );
      const data = await res.json();

      if (data.length > 0) {
 
        router.replace("/(app)/(tabs)/home");
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (err) {
      Alert.alert("Error", "Failed to login");
      console.error(err);
    }
  };

  return (
    <Container>
      <Label lightColor="grey" customTextStyle={styles.heading4} text="User Login" />
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
