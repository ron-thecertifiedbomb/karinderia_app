import React from "react";
import { View, StyleSheet } from "react-native";
import RegisterationForm from "@/components/Registration/Registration";

const RegistrationScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <RegisterationForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", 
    alignContent: "center",
  },
});

export default RegistrationScreen;
