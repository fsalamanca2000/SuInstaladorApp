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

// 🔥 IMPORTANTE: Mapeo de imágenes locales
import { IMAGE_MAP } from "../data/imageMap";

export default function ServiceInfoScreen({ route, navigation }) {
  const { service } = route.params;

  /** ---------------------------
   *  Imagen segura (cubre require, string, URL)
   * --------------------------*/
  const imageSource = IMAGE_MAP[service.image]
    ? IMAGE_MAP[service.image]
    : typeof service.image === "number"
    ? service.image
    : { uri: service.image };

  /** PAYMENT CONTEXT */
  const { cards, transfers, defaultMethod } = usePaymentMethods();
  const { addReservation } = useReservations();

  const [quantity, setQuantity] = useState("1");

  const [paymentType, setPaymentType] = useState(
    defaultMethod ? defaultMethod.type : "Efectivo"
  );

  const [selectedPayment, setSelectedPayment] = useState(
    defaultMethod || (paymentType === "Efectivo" ? { type: "Efectivo" } : null)
  );

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const [hour, setHour] = useState(new Date());
  const [showHour, setShowHour] = useState(false);

  /** Precio numérico seguro */
  const basePrice = useMemo(() => {
    if (typeof service.price === "number") return service.price;
    if (typeof service.price === "string")
      return parseInt(service.price.replace(/\./g, ""), 10);
    return 0;
  }, [service.price]);

  /** Instaladores */
  const installersNeeded = useMemo(() => {
    if (!service.installers) return 1;

    if (typeof service.installers === "number") return service.installers;

    const parts = service.installers.replace("–", "-").split("-");
    const min = parseInt(parts[0], 10) || 1;
    const max = parseInt(parts[1], 10) || min;

    const qty = parseInt(quantity, 10);
    return qty <= 2 ? min : max;
  }, [quantity, service.installers]);

  /** Total */
  const totalPrice = useMemo(() => {
    const q = parseInt(quantity || "1", 10);
    return basePrice * q;
  }, [quantity, basePrice]);

  /** ---------------------------
   *  RESERVAR → guarda en Firebase desde el context
   * --------------------------*/
  const handleReserve = () => {
    if (!selectedPayment) {
      alert("Debes seleccionar un método de pago");
      return;
    }

    const reservation = {
      id: null, // Firebase lo asignará
      title: service.title,
      description: service.description,
      category: service.category,
      subcategory: service.subcategory,

      // 🔥 aquí guardamos solo el string ("cortinas2", etc.)
      image: service.image,

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

  /** Métodos de pago */
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
          <Text style={styles.label}>No tienes tarjetas agregadas.</Text>
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
          <Text style={styles.label}>No tienes cuentas agregadas.</Text>
        ) : (
          transfers.map((t) => (
            <TouchableOpacity
              key={t.id}
              style={[
                styles.methodCard,
                selectedPayment?.id === t.id && styles.methodCardSelected,
              ]}
              onPress={() =>
                setSelectedPayment({ ...t, type: "Transferencia" })
              }
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
        <Image source={imageSource} style={styles.image} />

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

        {/* Métodos de pago */}
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
