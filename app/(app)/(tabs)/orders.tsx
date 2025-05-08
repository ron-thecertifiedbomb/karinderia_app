import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { useAtom } from "jotai";
import { orderAtom } from "@/store/orderAtom";  // Adjust the path if necessary
import { SafeAreaView } from "react-native-safe-area-context";  // Import SafeAreaView
import Label from "@/components/shared/Label";
import { fonts } from "@/constants/Fonts";
import List from "@/components/shared/List";

const Orders = () => {
  const [orders] = useAtom(orderAtom);  // Retrieve orders from Jotai atom

  // If there are no orders, display a message
  if (orders.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Label
          lightColor="black"
          customTextStyle={styles.heading4}
          text="No orders placed yet."
        />
      </SafeAreaView>
    );
  }

  const renderOrder = ({ item }: any) => (
    <View style={styles.orderItem}>
      <Label lightColor="black" customTextStyle={styles.orderText} text={item.name} />
      <Label lightColor="black" customTextStyle={styles.orderText} text={`₱ ${item.price}`} />
      <Label lightColor="black" customTextStyle={styles.orderText} text={`Quantity: ${item.quantity}`} />
    </View>
  );

  return (
    <List
      data={orders}
      renderItem={renderOrder}
      title="Your Orders"
      noDataMessage="No orders placed yet."
    />
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",  
  },
  heading4: {
    fontSize: 22,
    fontFamily: "FS Albert-Regular",
    lineHeight: fonts.heading.h4.lineHeight,
    marginBottom: 16,
    marginLeft: 10
  },
  list: {
    padding: 16,
  },
  orderItem: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default Orders;
