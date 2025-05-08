import React from "react";
import { FlatList, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { useAtom } from "jotai";
import { allMenusAtom } from "@/store/menuAtom";
import useGetAllMenu from "@/hooks/useGetAllMenu"; // adjust path as needed

const MenuList = () => {
  const [menu] = useAtom(allMenusAtom);
  const { loading, error } = useGetAllMenu();

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>₱{item.price}</Text>
      <Text>Available: {item.availableOrderQty}</Text>
    </View>
  );

  if (loading) return <ActivityIndicator style={styles.centered} size="large" />;
  if (error) return <Text style={styles.centered}>Error: {error}</Text>;

  return (
    <FlatList
      data={menu}
      keyExtractor={(item) => item.id.toString()}
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
