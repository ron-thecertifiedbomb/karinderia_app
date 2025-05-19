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
      <View style={styles.errorWrapper}>
       {error && (
        <Label
          text={error}
          type="default"
          customTextStyle={styles.errorText}
        />
      )}
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 1,
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
    errorWrapper: {
    color: "#e63946",
    fontSize: 13,
    height: 32,
    paddingLeft: 5

  },
  errorText: {
    color: "#e63946",
    fontSize: 13,
    marginTop: 4,
  },
});

export default AppTextInput;
