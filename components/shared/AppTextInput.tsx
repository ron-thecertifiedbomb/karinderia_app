import React from "react";
import { TextInput, StyleSheet, TextInputProps, View } from "react-native";
import Label from "./Label";

interface AppTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const AppTextInput: React.FC<AppTextInputProps> = ({ style, label, error, ...rest }) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[
          styles.input,
          style,
          error ? styles.inputError : null,
        ]}
        {...rest}
      />
      {error && (
        <Label
          text={error}
          type="default"
          customTextStyle={styles.errorText}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  labelSpacing: {
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    fontFamily: "FS Albert-Regular",
  },
  inputError: {
    borderColor: "#e63946",
  },
  errorText: {
    color: "#e63946",
    fontSize: 13,
    marginTop: 4,
  },
});

export default AppTextInput;
