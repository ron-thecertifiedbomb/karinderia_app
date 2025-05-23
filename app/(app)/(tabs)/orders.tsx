import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useAtom } from "jotai";
import { orderAtom } from "@/store/orderAtom";
import { allMenusAtom } from "@/store/menuAtom";
import Label from "@/components/shared/Label";
import { fonts } from "@/constants/Fonts";
import List from "@/components/shared/List";
import AppButton from "@/components/shared/AppButton";
import ImageContainer from "@/components/shared/ImageContainer";
import TotalPrice from "@/components/TotalPrice/TotalPrice";
import { Menu } from "@/interfaces/menu";
import { OrderItem } from "@/interfaces/order";


const Orders = () => {
  const [orders, setOrders] = useAtom(orderAtom);
  const [menu, setMenu] = useAtom(allMenusAtom);

  const handleDelete = (id: number) => {
    const orderToRemove = orders.find((order) => order.id === id);
    if (!orderToRemove) return;
  
    setMenu((prevMenu) =>
      (prevMenu ?? []).map((menuItem) =>
        menuItem.id === id
          ? {
              ...menuItem,
              availableOrderQty:
                (menuItem.availableOrderQty ?? 0) + orderToRemove.quantity,
            }
          : menuItem
      )
    );
  
    setOrders((prev) => prev.filter((order) => order.id !== id));
  
    // ✅ Alert after successful delete
    Alert.alert("Order Deleted", `"${orderToRemove.name}" has been removed.`);
  };

  const renderOrder = ({ item }: { item: OrderItem }) => (
    <View style={styles.orderItem}>
      <ImageContainer source={{ uri: item.image }} style={styles.orderImage} />
      <Label lightColor="black" customTextStyle={styles.orderName} text={item.name} />
      <Label lightColor="black" customTextStyle={styles.orderText} text={`₱ ${item.price}`} />
      <Label lightColor="black" customTextStyle={styles.orderText} text={`Quantity: ${item.quantity}`} />
      <Label
        lightColor="black"
        customTextStyle={styles.orderText}
        text={`Date ordered: ${new Date(item.dateOrdered).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`}
      />
      <AppButton title="Delete Order" onPress={() => handleDelete(item.id)} disabled={false} />
    </View>
  );

  return (
    <View style={styles.container}>
      <List
        data={orders}
        renderItem={renderOrder}
        title="Your Orders"
        noDataMessage="No orders placed yet."
      />
      {orders.length > 0 && <TotalPrice />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
  orderItem: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  orderImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 8,
  },
  orderName: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
});

export default Orders;
