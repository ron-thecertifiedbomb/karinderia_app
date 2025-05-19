import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import Container from "../shared/Container";

const RegisterLinkButton = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push("/(auth)/registration");
  };

  return (
    <Container style={styles.containerCustomStyle}>
      <View style={styles.textRow}>
        <Text style={styles.normalText}>Not yet registered? </Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.linkText}>Register</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerCustomStyle: {
    display: "flex",
    alignContent: "center",
    alignItems: "flex-start",
    justifyContent: 'center',
    paddingLeft: 65,
    width: "100%",
    marginTop: 15,
  },
  textRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  normalText: {
    fontSize: 16,
    color: "#000",
  },
  linkText: {
    color: "#1E90FF",
    fontSize: 16,
  },
});

export default RegisterLinkButton;
