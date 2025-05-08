import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  availableOrderQty: number;
}

const MenuList = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch("http://10.0.2.2:3001/menu") 
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => console.error("Error fetching menu:", err));
  }, []);

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>₱{item.price}</Text>
      <Text>Available: {item.availableOrderQty}</Text>
    </View>
  );

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
});

export default MenuList;
