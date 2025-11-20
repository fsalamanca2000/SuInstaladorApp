import React, { useState, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import { usePaymentMethods } from "../context/PaymentMethodsContext";
import { useReservations } from "../context/ReservationsContext";

export default function ServiceInfoScreen({ route, navigation }) {
  const { service } = route.params;

  /** 🔹 PAYMENT CONTEXT */
  const {
    cards,
    transfers,
    defaultMethod,
  } = usePaymentMethods();

  const { addReservation } = useReservations();

  /** 🔹 ESTADO DE FORMULARIO */
  const [quantity, setQuantity] = useState("1");

  const [paymentType, setPaymentType] = useState(
    defaultMethod ? defaultMethod.type : "Efectivo"
  );

  const [selectedPayment, setSelectedPayment] = useState(defaultMethod || null);

  // Fecha seleccionada
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  // Hora seleccionada
  const [hour, setHour] = useState(new Date());
  const [showHour, setShowHour] = useState(false);


  /** Convertir precio "70.000" → 70000 */
  const basePrice = useMemo(() => {
    if (!service.price) return 0;
    return parseInt(service.price.replace(/\./g, ""), 10);
  }, [service.price]);

  /** Calcular instaladores según rango */
  const installersNeeded = useMemo(() => {
    if (!service.installers) return 1;

    if (!service.installers.includes("a")) {
      return parseInt(service.installers, 10);
    }

    const [min, max] = service.installers.split(" a ").map(Number);

    if (parseInt(quantity) <= 2) return min;
    return max;
  }, [quantity, service.installers]);

  /** Total */
  const totalPrice = useMemo(() => {
    const q = parseInt(quantity || "1", 10);
    return basePrice * q;
  }, [quantity, basePrice]);


  /** -----------------------
   * RESERVAR SERVICIO
   * ----------------------*/
  const handleReserve = () => {
    if (!selectedPayment) {
      alert("Debes seleccionar un método de pago");
      return;
    }

    const reservation = {
      ...service,
      date: date.toLocaleDateString("es-CO"),
      hour: hour.toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      quantity,
      installersNeeded,
      totalPrice,
      paymentMethod: selectedPayment,
    };

    addReservation(reservation);

    alert("¡Reserva realizada!");
    navigation.navigate("MyReservations");
  };


  /** RENDER DE MÉTODOS DE PAGO */
  const renderPaymentOptions = () => {
    switch (paymentType) {
      case "Efectivo":
        return (
          <Text style={styles.label}>
            El pago en efectivo se realiza al finalizar el servicio.
          </Text>
        );

      case "Tarjeta":
        return cards.length === 0 ? (
          <Text style={styles.label}>No tienes tarjetas guardadas.</Text>
        ) : (
          cards.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={[
                styles.methodCard,
                selectedPayment?.id === c.id && styles.methodCardSelected,
              ]}
              onPress={() => setSelectedPayment({ ...c, type: "Tarjeta" })}
            >
              <Text style={styles.methodTitle}>
                Tarjeta **** {c.cardNumber.slice(-4)}
              </Text>
            </TouchableOpacity>
          ))
        );

      case "Transferencia":
        return transfers.length === 0 ? (
          <Text style={styles.label}>No tienes cuentas guardadas.</Text>
        ) : (
          transfers.map((t) => (
            <TouchableOpacity
              key={t.id}
              style={[
                styles.methodCard,
                selectedPayment?.id === t.id && styles.methodCardSelected,
              ]}
              onPress={() => setSelectedPayment({ ...t, type: "Transferencia" })}
            >
              <Text style={styles.methodTitle}>
                {t.bank} — {t.account}
              </Text>
            </TouchableOpacity>
          ))
        );

      default:
        return null;
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Header userName="User" address="*Dirección*" />

      <ScrollView style={styles.scroll}>
        {/* Imagen */}
        <Image source={{ uri: service.image }} style={styles.image} />

        <Text style={styles.title}>{service.title}</Text>
        <Text style={styles.description}>{service.description}</Text>

        {/* Instaladores */}
        <Text style={styles.label}>Instaladores necesarios</Text>
        <Text style={styles.value}>{installersNeeded}</Text>

        {/* Fecha */}
        <Text style={styles.label}>Fecha del servicio</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowDate(true)}>
          <Text style={styles.inputText}>{date.toLocaleDateString("es-CO")}</Text>
        </TouchableOpacity>

        {showDate && (
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={(event, selected) => {
              setShowDate(false);
              if (selected) setDate(selected);
            }}
          />
        )}

        {/* Hora */}
        <Text style={styles.label}>Hora del servicio</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowHour(true)}>
          <Text style={styles.inputText}>
            {hour.toLocaleTimeString("es-CO", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </TouchableOpacity>

        {showHour && (
          <DateTimePicker
            value={hour}
            mode="time"
            display="spinner"
            onChange={(event, selected) => {
              setShowHour(false);
              if (selected) setHour(selected);
            }}
          />
        )}

        {/* Cantidad */}
        <Text style={styles.label}>Cantidad requerida</Text>
        <TextInput
          placeholder="Ej: 1"
          style={styles.input}
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />

        {/* Selección de método de pago */}
        <Text style={styles.label}>Método de pago</Text>

        <View style={styles.typeSelector}>
          {["Efectivo", "Tarjeta", "Transferencia"].map((op) => (
            <TouchableOpacity
              key={op}
              style={[
                styles.typeButton,
                paymentType === op && styles.typeButtonActive,
              ]}
              onPress={() => {
                setPaymentType(op);
                if (op === "Efectivo") setSelectedPayment({ type: "Efectivo" });
              }}
            >
              <Text
                style={[
                  styles.typeText,
                  paymentType === op && styles.typeTextActive,
                ]}
              >
                {op}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderPaymentOptions()}

        <Text style={styles.total}>
          Total: ${totalPrice.toLocaleString("es-CO")}
        </Text>

        <CustomButton
          title="Reservar"
          backgroundColor={Colors.primary}
          fullWidth
          onPress={handleReserve}
        />
      </ScrollView>

      {/* WhatsApp */}
      <View style={styles.footer}>
        <CustomButton
          title="Servicio al cliente"
          backgroundColor={Colors.dark}
          icon="logo-whatsapp"
          color="#fff"
          onPress={() =>
            Linking.openURL("https://api.whatsapp.com/send/?phone=573235050110")
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 20 },

  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.dark,
  },

  description: {
    fontSize: 15,
    color: Colors.gray,
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: Colors.dark,
  },

  value: {
    fontSize: 15,
    marginBottom: 15,
    color: Colors.gray,
  },

  input: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  inputText: {
    color: Colors.dark,
    fontSize: 15,
  },

  typeSelector: {
    flexDirection: "row",
    marginBottom: 15,
    gap: 10,
  },

  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#eee",
    borderRadius: 10,
  },

  typeButtonActive: {
    backgroundColor: Colors.primary,
  },

  typeText: {
    color: Colors.dark,
  },

  typeTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },

  methodCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  methodCardSelected: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },

  methodTitle: {
    color: Colors.dark,
    fontWeight: "600",
  },

  total: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
    color: Colors.dark,
  },

  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
