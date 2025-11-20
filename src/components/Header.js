import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from "../context/UserContext"; 
import Colors from "../constants/Colors";

const Header = () => {
  const navigation = useNavigation();
  const { currentUser } = useUser(); // ✔ Se obtiene del contexto

  const openMenu = () => navigation.navigate('Menu');

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />

        <View style={styles.rightIcons}>
          <TouchableOpacity>
            <Ionicons name="cart-outline" size={24} color="black" style={{ marginRight: 12 }} />
          </TouchableOpacity>

          <TouchableOpacity onPress={openMenu}>
            <View style={styles.profileCircle}>
              {currentUser?.image ? (
                <Image source={{ uri: currentUser.image }} style={styles.profileImage} />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.userRow}>
        <Text style={styles.userText}>
          Hola, <Text style={{ fontWeight: '600' }}>{currentUser?.name ?? "User"}</Text>
        </Text>
        <Text style={styles.addressText}>
          {currentUser?.address ?? "Dirección"}
        </Text>
      </View>
    </View>
  );
};

export default Header;

// ✔ TUS ESTILOS ORIGINALES SE MANTIENEN SIN CAMBIO
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: Colors.background,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileCircle: {
    backgroundColor: '#FFD54F',
    borderRadius: 20,
    padding: 6,
  },
  userRow: {
    marginTop: 8,
  },
  userText: {
    fontSize: 16,
    color: '#000',
  },
  addressText: {
    fontSize: 14,
    color: '#777',
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
