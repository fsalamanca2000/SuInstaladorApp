import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";

// Contexto actualizado con Firebase
import { usePaymentMethods } from "../context/PaymentMethodsContext";

export default function PaymentsScreen({ navigation }) {
  const {
    cards,
    transfers,
    addCard,
    addTransfer,
    deleteCard,
    deleteTransfer,
    defaultMethod,
    setDefaultMethod,
  } = usePaymentMethods();

  const [type, setType] = useState("Efectivo");

  // Formularios dinámicos
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");

  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");

  const handleAdd = async () => {
    if (type === "Efectivo") {
      Alert.alert("Método agregado", "El pago en efectivo está disponible.");
      return;
    }

    if (type === "Tarjeta") {
      if (!cardNumber || !expDate) {
        Alert.alert("Error", "Completa número de tarjeta y vencimiento.");
        return;
      }

      await addCard({ cardNumber, expDate });
      Alert.alert("Método agregado", "Tarjeta guardada.");
      setCardNumber("");
      setExpDate("");
      return;
    }

    if (type === "Transferencia") {
      if (!bank || !account) {
        Alert.alert("Error", "Completa los datos bancarios.");
        return;
      }

      await addTransfer({ bank, account });
      Alert.alert("Método agregado", "Cuenta guardada.");
      setBank("");
      setAccount("");
    }
  };

  const renderForm = () => {
    if (type === "Tarjeta") {
      return (
        <>
          <Text style={styles.label}>Número de tarjeta</Text>
          <TextInput
            style={styles.input}
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Vencimiento</Text>
          <TextInput
            style={styles.input}
            value={expDate}
            onChangeText={setExpDate}
            placeholder="MM/AA"
          />
        </>
      );
    }

    if (type === "Transferencia") {
      return (
        <>
          <Text style={styles.label}>Banco</Text>
          <TextInput style={styles.input} value={bank} onChangeText={setBank} />

          <Text style={styles.label}>Número de cuenta</Text>
          <TextInput
            style={styles.input}
            value={account}
            onChangeText={setAccount}
          />
        </>
      );
    }

    return (
      <Text style={styles.label}>
        El pago en efectivo se confirma al finalizar el servicio.
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header userName="User" address="*Dirección*" />

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>Métodos de Pago</Text>

        {/* Selector de tipo */}
        <View style={styles.typeSelector}>
          {["Efectivo", "Tarjeta", "Transferencia"].map((op) => (
            <TouchableOpacity
              key={op}
              style={[
                styles.typeButton,
                type === op && styles.typeButtonActive,
              ]}
              onPress={() => setType(op)}
            >
              <Text
                style={[
                  styles.typeText,
                  type === op && styles.typeTextActive,
                ]}
              >
                {op}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Formulario */}
        {renderForm()}

        <CustomButton
          title="Agregar método"
          backgroundColor={Colors.primary}
          fullWidth
          onPress={handleAdd}
        />

        <Text style={styles.subtitle}>Métodos guardados</Text>

        {/* TARJETAS */}
        {cards.map((c) => (
          <View key={c.id} style={styles.methodCard}>
            <Text style={styles.methodTitle}>Tarjeta</Text>
            <Text style={styles.detail}>•••• •••• •••• {c.cardNumber.slice(-4)}</Text>

            <View style={styles.methodActions}>
              <TouchableOpacity
                onPress={() => setDefaultMethod(c.id, "Tarjeta")}
              >
                <Ionicons
                  name={
                    defaultMethod?.id === c.id
                      ? "checkmark-circle"
                      : "checkmark-circle-outline"
                  }
                  size={26}
                  color={Colors.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteCard(c.id)}>
                <Ionicons name="trash-outline" size={26} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* TRANSFERENCIAS */}
        {transfers.map((t) => (
          <View key={t.id} style={styles.methodCard}>
            <Text style={styles.methodTitle}>Transferencia</Text>
            <Text style={styles.detail}>
              {t.bank} — {t.account}
            </Text>

            <View style={styles.methodActions}>
              <TouchableOpacity
                onPress={() => setDefaultMethod(t.id, "Transferencia")}
              >
                <Ionicons
                  name={
                    defaultMethod?.id === t.id
                      ? "checkmark-circle"
                      : "checkmark-circle-outline"
                  }
                  size={26}
                  color={Colors.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteTransfer(t.id)}>
                <Ionicons name="trash-outline" size={26} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.dark,
    marginBottom: 20,
  },

  typeSelector: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
  },

  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#eee",
    borderRadius: 10,
  },

  typeButtonActive: {
    backgroundColor: Colors.primary,
  },

  typeText: { color: Colors.dark },
  typeTextActive: { color: "#fff", fontWeight: "bold" },

  label: {
    marginBottom: 5,
    marginTop: 10,
    fontSize: 14,
    color: Colors.dark,
  },

  input: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
  },

  subtitle: {
    marginTop: 25,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: Colors.dark,
  },

  methodCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },

  methodTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.dark,
  },

  detail: {
    marginTop: 3,
    color: Colors.gray,
  },

  methodActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 15,
  },
});
