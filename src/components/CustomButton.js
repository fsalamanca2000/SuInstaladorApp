import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export default function CustomButton({
  title = "Botón",
  icon = "alert-circle-outline",
  color = "#fff",
  backgroundColor = Colors.dark,
  onPress,
  fullWidth = true,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor, width: fullWidth ? "100%" : "auto" },
      ]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={18} color={color} style={styles.icon} />
      <Text style={[styles.text, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    marginBottom: 15,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
