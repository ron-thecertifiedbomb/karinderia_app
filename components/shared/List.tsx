import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Label from "@/components/shared/Label";
import { fonts } from "@/constants/Fonts";
import Container from "./Container";

interface ListProps {
  data: any[];
  renderItem: (item: any) => JSX.Element;
  title: string;
  noDataMessage: string;
}

const List = ({ data, renderItem, title, noDataMessage }: ListProps) => {
  if (data.length === 0) {
    return (
      <Container customStyle={styles.container}>
        <Label
          lightColor="black"
          customTextStyle={styles.heading4}
          text={noDataMessage}
        />
      </Container>
    );
  }

  return (
    <>
    <View>
        <Label
        lightColor="black"
        customTextStyle={styles.heading4}
        text={title}
      />
    </View>
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
    fontWeight: 'bold',
    marginLeft: 10,
    textAlign: 'center'
  },
  list: {
    padding: 16,
  },
  container: {
    padding: 0
  }
});

export default List;
