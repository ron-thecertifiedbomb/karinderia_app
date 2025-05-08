import React from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert, // Importing Alert
} from "react-native";
import { useAtom } from "jotai";
import { allMenusAtom } from "@/store/menuAtom";
import useGetAllMenu from "@/hooks/useGetAllMenu";
import { orderAtom } from "@/store/orderAtom";
import Label from "../shared/Label";

const MenuList = () => {
  const [menu] = useAtom(allMenusAtom);
  const [orders, setOrders] = useAtom(orderAtom);
  const { loading, error } = useGetAllMenu();

  const handleOrder = (item: any) => {
    setOrders((prev) => {
      const existing = prev.find((order) => order.id === item.id);
      if (existing) {
        return prev.map((order) =>
          order.id === item.id
            ? { ...order, quantity: order.quantity + 1 }
            : order
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    // Display an alert that the item has been added to the order
    Alert.alert(
      "Order Added",
      `${item.name} has been added to your order.`,
      [{ text: "OK" }]
    );
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <Label lightColor="black" customTextStyle={styles.name} text={item.name} />
      <Label lightColor="black" customTextStyle={styles.name} text={`₱ ${item.price}`} />
      <Label lightColor="black" customTextStyle={styles.name} text={`Available: ${item.availableOrderQty}`} />
      <Button title="Order" onPress={() => handleOrder(item)} />
    </View>
  );

  if (loading) return <ActivityIndicator style={styles.centered} size="large" />;
  if (error) return <Text style={styles.centered}>Error: {error}</Text>;

  return (
    <FlatList
      data={menu}
      // Ensure unique keys by using a combination of id and name or just item.id if unique
      keyExtractor={(item) => `${item.id}-${item.name}`} // or just item.id if it's guaranteed unique
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  item: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    fontSize: 16,
  },
});

export default MenuList;
