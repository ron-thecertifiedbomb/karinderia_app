import React from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert, 
} from "react-native";
import { useAtom } from "jotai";
import { allMenusAtom } from "@/store/menuAtom";
import useGetAllMenu from "@/hooks/useGetAllMenu";
import { orderAtom } from "@/store/orderAtom";
import Label from "../shared/Label";
import List from "../shared/List";
import { Menu } from "@/interfaces/menu/menu";

const MenuList = () => {
  const [menu] = useAtom(allMenusAtom);
  const [_, setOrders] = useAtom(orderAtom);
  const { loading, error } = useGetAllMenu();

  const handleOrder = (item: Menu) => {
    const now = new Date().toISOString();
  
    setOrders((prev) => {
      const existing = prev.find((order) => order.id === item.id);
      if (existing) {
        return prev.map((order) =>
          order.id === item.id
            ? { ...order, quantity: order.quantity + 1 }
            : order
        );
      }
  
      return [...prev, { ...item, quantity: 1, dateOrdered: now }];
    });
  
    Alert.alert("Order Added", `${item.name} has been added to your order.`, [{ text: "OK" }]);
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

  if (!menu) return null;

  return (
    <List
    data={menu}
    renderItem={renderItem}
    title="Karinderia Menu"
    noDataMessage="No menu items available."
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
