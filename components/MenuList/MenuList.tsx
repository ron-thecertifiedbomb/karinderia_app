import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useAtom } from "jotai";
import { allMenusAtom } from "@/store/menuAtom";
import useGetAllMenu from "@/hooks/useGetAllMenu";
import { orderAtom } from "@/store/orderAtom";
import Label from "../shared/Label";
import List from "../shared/List";
import { Menu } from "@/interfaces/menu";
import AppButton from "../shared/AppButton";
import ImageContainer from "../shared/ImageContainer"; 

const MenuList = () => {
  const [_, setOrders] = useAtom(orderAtom);
  const { loading, error } = useGetAllMenu();
  const [menu, setMenu] = useAtom(allMenusAtom);

  const handleOrder = (item: Menu) => {
    if (item.availableOrderQty <= 0) {
      Alert.alert("Out of Stock", `${item.name} is no longer available.`, [
        { text: "OK" },
      ]);
      return;
    }

    const now = new Date().toISOString();

    setOrders((prev) => {
      const existing = prev.find((order) => order.id === item.id);
      if (existing) {
        return prev.map((order) =>
          order.id === item.id
            ? { ...order, quantity: order.quantity + 1 }
            : order,
        );
      }
      return [...prev, { ...item, quantity: 1, dateOrdered: now }];
    });

    setMenu((prevMenu) =>
      (prevMenu ?? []).map((menuItem) =>
        menuItem.id === item.id
          ? {
              ...menuItem,
              availableOrderQty: Math.max(
                0,
                (menuItem.availableOrderQty ?? 1) - 1,
              ),
            }
          : menuItem,
      ),
    );
    Alert.alert("Order Added", `${item.name} has been added to your order.`, [
      { text: "OK" },
    ]);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <ImageContainer
        source={{ uri: item.image }} 
        style={styles.menuImage}
      />

      <Label
        lightColor="black"
        customTextStyle={styles.name}
        text={item.name}
      />
      <Label
        lightColor="black"
        customTextStyle={styles.name}
        text={`₱ ${item.price}`}
      />
      <Label
        lightColor="black"
        customTextStyle={styles.name}
        text={`Availability: ${item.availableOrderQty}`}
      />
      <AppButton
        title={item.availableOrderQty <= 0 ? "Out of Stock" : "Order"}
        onPress={() => handleOrder(item)}
        disabled={item.availableOrderQty <= 0}
      />
    </View>
  );

  if (loading)
    return <ActivityIndicator style={styles.centered} size="large" />;
  if (error) return <Text style={styles.centered}>Error: {error}</Text>;

  if (!menu) return null;

  return (
    <List
      data={menu}
      renderItem={renderItem}
      title="Menu"
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
  menuImage: {
    width: "100%", // Full width of the container
    height: 200, // Fixed height (can be adjusted)
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default MenuList;
