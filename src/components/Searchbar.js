import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color={Colors.dark} />
      <TextInput
        style={styles.input}
        placeholder="Buscar"
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    marginVertical: 15,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: Colors.dark,
  },
});
