import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Modal as RNModal,
} from "react-native";
import { useAtom } from "jotai";
import { isLoadingAtom } from "@/store/menuAtom";

const Modal = () => {

  const [loading] = useAtom(isLoadingAtom);

  if (!loading) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.modalBox}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, 
  },
  modalBox: {
    width: 120,
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default Modal;
