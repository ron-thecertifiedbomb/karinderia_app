import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Label from "@/components/shared/Label";
import { fonts } from "@/constants/Fonts";

interface ListProps {
  data: any[];
  renderItem: (item: any) => JSX.Element;
  title: string;
  noDataMessage: string;
}

const List = ({ data, renderItem, title, noDataMessage }: ListProps) => {
  if (data.length === 0) {
    return (
      <>
        <Label
          lightColor="black"
          customTextStyle={styles.heading4}
          text={noDataMessage}
        />
      </>
    );
  }

  return (
    <>
      <Label
        lightColor="black"
        customTextStyle={styles.heading4}
        text={title}
      />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </>
  );
};

const styles = StyleSheet.create({

  heading4: {
    fontSize: 22,
    fontFamily: "FS Albert-Regular",
    lineHeight: fonts.heading.h4.lineHeight,
    marginBottom: 16,
    marginLeft: 10,
  },
  list: {
    padding: 16,
  },
});

export default List;
