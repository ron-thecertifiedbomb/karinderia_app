
import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

interface AppTextInputProps extends TextInputProps {}

const AppTextInput: React.FC<AppTextInputProps> = ({ style, ...rest }) => {
  return <TextInput style={[styles.input, style]} {...rest} />;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    fontFamily: "FS Albert-Regular",
  },
});

export default AppTextInput;
