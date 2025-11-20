import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ServicesScreen from "../screens/ServicesScreen";
import ServiceInfoScreen from "../screens/ServiceInfoScreen";
import MenuScreen from "../screens/MenuScreen";
import SettingsScreen from "../screens/SettingsScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import MyReservationsScreen from "../screens/MyReservationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PaymentsScreen from "../screens/PaymentsScreen";
import ReportesScreen from "../screens/ReportesScreen";

import { ReservationsProvider } from "../context/ReservationsContext";
import { UserProvider } from "../context/UserContext";
import { PaymentMethodsProvider } from "../context/PaymentMethodsContext";
import { ReportesProvider } from "../context/ReportesContext";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <PaymentMethodsProvider>
        <UserProvider>
          <ReservationsProvider>
            <ReportesProvider>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Services" component={ServicesScreen} />
                <Stack.Screen name="ServiceInfo" component={ServiceInfoScreen} />
                <Stack.Screen name="Menu" component={MenuScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="MyReservations" component={MyReservationsScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Payments" component={PaymentsScreen} />
                <Stack.Screen name="Reports" component={ReportesScreen} />
              </Stack.Navigator>
            </ReportesProvider>
          </ReservationsProvider>
        </UserProvider>
      </PaymentMethodsProvider>
    </NavigationContainer>
  );
}
