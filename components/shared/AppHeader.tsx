import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import Icon from "@/components/shared/Icon";
import AppButton from "@/components/shared/AppButton";
import { authenticateAtom } from "@/store/authenticateAtom";
import { useAtom } from "jotai";
import Label from "./Label";
import { fonts } from "@/constants/Fonts";

const AppHeader = () => {
  const router = useRouter();
  const path = usePathname();
  const [user, setUser] = useAtom(authenticateAtom);
  const isHome = path === "/home";

  return (
    <View style={styles.container}>
      <>
        <Pressable
          onPress={() => router.back()}
          style={[{ marginLeft: 10 }, isHome && { display: "none" }]}
          hitSlop={10}
          disabled={isHome}
        >
          <Icon name="arrow-left" size={24} color="black" type="Feather" />
        </Pressable>
        <Label
          lightColor="black"
          customTextStyle={styles.heading4}
          text={`Welcome ${user?.firstName ?? "User"}!`}
        />
      </>
      <AppButton title="Log out" onPress={() => {}} />
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    width: "100%",
  },
  heading4: {
    fontSize: 22,
    fontFamily: "FS Albert-Regular",
    lineHeight: fonts.heading.h4.lineHeight,
  },
});
