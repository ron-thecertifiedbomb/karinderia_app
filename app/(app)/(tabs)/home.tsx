import MenuList from "@/components/MenuList/MenuList";
import { fonts } from "@/constants/Fonts";
import { StyleSheet } from "react-native";

const Home = () => (
  <>
<MenuList />
  </>
);

const styles = StyleSheet.create({
  heading4: {
    fontSize: 22,
    fontFamily: "FS Albert-Regular",
    lineHeight: fonts.heading.h4.lineHeight,
  },
});

export default Home;
