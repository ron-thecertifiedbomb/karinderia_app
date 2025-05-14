import React from "react";
import MenuList from "@/components/MenuList/MenuList";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, StyleSheet, View } from "react-native";
import { fonts } from "@/constants/Fonts";
import Label from "@/components/shared/Label";
import { useAtom, useSetAtom } from "jotai";
import { authenticateAtom } from "@/store/authenticateAtom";
import AppButton from "@/components/shared/AppButton";
import { User } from "@/interfaces/authenticate";
import { router } from "expo-router";
import { timeCreated } from "@/utilities/util";
import useGetAllMenu from "@/hooks/useGetAllMenu";
import { allMenusAtom, isLoadingAtom } from "@/store/menuAtom";


const Home = () => {

  const { error } = useGetAllMenu();
  const setMenu = useSetAtom(allMenusAtom);
  const [user, setUser] = useAtom(authenticateAtom);
  const URL = "https://nextjs-server-rho.vercel.app/api/users/logout/route";

  const setLoading = useSetAtom(isLoadingAtom);

  const payLoad: User = {
    username: user?.username ?? "",
    lastLoggedIn: timeCreated,
    isLoggedIn: false,
  };

  const confirmAndLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: handleLogOut,
        },
      ],
      { cancelable: true },
    );
  };

const handleLogOut = async () => {
  try {
    setLoading(true);
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payLoad),
    });
    if (!response.ok) {
      throw new Error("Failed to logout");
    }
    setMenu(null);
    setUser(null);
    router.replace("/");
  } catch (err) {
    console.error("Logout error:", err);
    Alert.alert("Logout failed", "Please try again later.");
  } finally {
    setLoading(false); 
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topSection}>
        <Label
          lightColor="black"
          customTextStyle={styles.heading4}
          text={`Welcome ${user?.firstName ?? "User"}!`}
        />
        <AppButton
          title="Log out"
          onPress={confirmAndLogout}
          containerStyle={styles.buttonStyle}
        />
      </View>
      <MenuList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    padding: 16,
  },
  heading4: {
    fontSize: 22,
    fontFamily: "FS Albert-Regular",
    lineHeight: fonts.heading.h4.lineHeight,
    marginBottom: 16,
  },
  buttonStyle: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#ff4d4d",
    borderRadius: 6,
  },
});

export default Home;
