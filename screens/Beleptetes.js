import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import Ip from '../Ip';

export default function Beleptetes({ navigation,route }) {
  const { avgPoints,dartsThrown, startingPlayer, selectedPlayers, winner, setsWon,legsWon, highestCheckout, } = route.params;
  //alert(dartsThrown)
  const [felhasznaloNev, setFelhasznalonev] = useState('');
  const [jelszo, setJelszo] = useState('');
  const [belepett, setBelepett] = useState(false);
  const [id, setId] = useState(false);
  const [nev, setNev] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const belepesFv = async () => {
    var adatok = {
      "bevitel1": felhasznaloNev,
      "bevitel2": jelszo,
    };
    const x = await fetch(Ip.Ipcim+"beleptetes", {
      method: "POST",
      body: JSON.stringify(adatok),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    const y = await x.json();
    if (y.length == 0) {
      alert("Helytelen felhasználónév vagy jelszó");
    } else {
      setBelepett(true);
      setNev(y[0].felhasznalo_nev);
      setId(y[0].felhasznalo_id);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={showModal}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Megerősítés</Text>
            <Text style={styles.modalText}>Biztosan ki szeretnél lépni?</Text>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={[styles.modalButton, { backgroundColor: '#B22222' }]}
                onPress={() => {
                  setShowModal(false);
                  setBelepett(false);
                }}
              >
                <Text style={styles.modalButtonText}>Kilépés</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, { backgroundColor: '#1E441E' }]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalButtonText}>Mégse</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {belepett ? (
        <View style={styles.loggedInContainer}>
          <Text style={styles.welcomeText}>
            Üdvözöllek {nev} ({id})
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home", { id: id, nev: nev,dartsThrown:dartsThrown,startingPlayer:startingPlayer,selectedPlayers:selectedPlayers,winner:winner,setsWon:setsWon,legsWon:legsWon,highestCheckout:highestCheckout,avgPoints:avgPoints })}
          >
            <Text style={styles.buttonText}>Tovább</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#B22222" }]}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.buttonText}>Kilépés</Text>
          </TouchableOpacity>
          
        </View>
      ) : (
        <View style={styles.loginContainer}>
          <Text style={styles.header}>Belépés</Text>

          <TextInput
            style={styles.input}
            onChangeText={setFelhasznalonev}
            placeholder="Felhasználónév"
            value={felhasznaloNev}
          />
          <TextInput
            style={styles.input}
            onChangeText={setJelszo}
            placeholder="Jelszó"
            value={jelszo}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={belepesFv}>
            <Text style={styles.buttonText}>Belépés</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.noAccountText}>Még nem rendelkezel fiókkal?</Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#1E441E" }]}
              onPress={() => navigation.navigate("Regisztracio")}
            >
              <Text style={[styles.buttonText, { color: "#FFFF" }]}>Regisztráció</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B3F1B',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    elevation: 5,
  },
  loggedInContainer: {
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  button: {
    width: '80%',
    backgroundColor: '#D3E7D3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#F0F0F',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  noAccountText: {
    fontSize: 14,
    color: '#666',
  },
});
