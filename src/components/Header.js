import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from "../constants/Colors";


const Header = ({ userName = 'User', address = 'Dirección', userImage }) => {
  const navigation = useNavigation();

  const openMenu = () => {
    navigation.navigate('Menu'); // redirige a la pantalla del menú lateral
  };

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
              {userImage ? (
                <Image source={{ uri: userImage }} style={styles.profileImage} />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              )}
            </View>

          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.userRow}>
        <Text style={styles.userText}>Hola, <Text style={{ fontWeight: '600' }}>{userName}</Text></Text>
        <Text style={styles.addressText}>{address}</Text>
      </View>
    </View>
  );
};

export default Header;

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
