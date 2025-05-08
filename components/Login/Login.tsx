import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Container from "@/components/shared/Container";
import Label from "@/components/shared/Label";
import { fonts } from "@/constants/Fonts";
import AppTextInput from "../shared/AppTextInput";

const Login = () => (
  <Container>
    <Label lightColor="grey" customTextStyle={styles.heading4} text="Login Form" />
    <View style={styles.inputGroup}>
    <AppTextInput placeholder="Username" autoCapitalize="none" />
    <AppTextInput placeholder="Password" secureTextEntry />
    </View>
  </Container>
);

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
    width: 300
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    fontFamily: "FS Albert-Regular",
  },
});

export default Login;
