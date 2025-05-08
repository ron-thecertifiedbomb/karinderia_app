import React from "react";
import { View, StyleSheet } from "react-native";
import { useAtom } from "jotai";
import { orderAtom } from "@/store/orderAtom";
import Label from "@/components/shared/Label"; 

const TotalPrice = () => {
  const [orders] = useAtom(orderAtom);

  // Calculate total price
  const totalPrice = orders.reduce((acc, order) => {
    return acc + (order.price * order.quantity);
  }, 0);

  return (
    <View style={styles.container}>
      <Label lightColor="black" customTextStyle={styles.totalText} text="Total Price:" />
      <Label lightColor="black" customTextStyle={styles.price} text={`₱ ${totalPrice.toFixed(2)}`} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    color: "grey",
  },
});

export default TotalPrice;
