import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button, ScrollView } from 'react-native';
import Ip from '../Ip';

export default function HomeScreenSzabi({ navigation, route }) {
  const { id, nev, dartsThrown,startingPlayer, selectedPlayers, winner, setsWon,legsWon, highestCheckout,avgPoints} = route.params || {};

  const [meccsEredmeny, setMeccsEredmeny] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  //alert(id)
  const fetchMatchResults = async () => {
    try {
      const adatok = { bevitel1: nev };
      const response = await fetch(Ip.Ipcim+'meccseredmenylekerdez', {
        method: 'POST',
        body: JSON.stringify(adatok),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMeccsEredmeny(data);
    } catch (error) {
      console.error('Error fetching match results:', error);
      setErrorMessage('Nem sikerült lekérni az adatokat.');
    }
  };
  const fetchMeccseredmeny = async () => {
    try {
      const today = new Date();
  
      // A dátum és idő formázása 'YYYY-MM-DD HH:MM:SS' formátumban
      const formattedDate = today.getFullYear() + '-' +
                            ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
                            ('0' + today.getDate()).slice(-2) + ' ' +
                            ('0' + today.getHours()).slice(-2) + ':' +
                            ('0' + today.getMinutes()).slice(-2) + ':' +
                            ('0' + today.getSeconds()).slice(-2);
  
      const adatok = {
        winner: winner,
        date: formattedDate,
        dartsThrown: dartsThrown,
        avgPoints: avgPoints,
        highestCheckout: highestCheckout,
        setsWon: setsWon,
        id: id,

      };
  
      const response = await fetch(Ip.Ipcim+'meccseredmenyFelvitel', {
        method: 'POST',
        body: JSON.stringify(adatok),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const szoveg = await response.text();
      alert(szoveg);
    } catch (error) {
      console.error('Error fetching match results:', error);
      setErrorMessage('Nem sikerült felvinni az adatokat.');
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      await fetchMeccseredmeny(); // Megvárja, amíg ez lefut
      fetchMatchResults(); // Csak ezután hívja meg a másodikat
    };
  
    fetchData();
  }, []);
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Darts Mérkőzés Eredményei</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="A statisztikáid megjelenítéséhez kattints ide!"
          onPress={() => navigation.navigate('Szabiatlag', { id, nev })}
          color="#1B3F1B"
        />
      </View>

      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      {/* Csak akkor jelenik meg, ha van dartsThrown érték */}
      {dartsThrown !== undefined && (
        <View style={styles.dartsStatsContainer}>
          <Text style={styles.statsHeader}>Mostani</Text>
          <Text style={styles.statsText}>Dobások száma: {dartsThrown}</Text>
          <Text style={styles.statsText}>Első: {startingPlayer}</Text>
          <Text style={styles.statsText}>Első: {selectedPlayers}</Text>
          <Text style={styles.statsText}>Első: {winner}</Text>
          <Text style={styles.statsText}>Első: {setsWon}</Text>
          <Text style={styles.statsText}>Első: {legsWon}</Text>
          <Text style={styles.statsText}>Első: {avgPoints}</Text>
        </View>
      )}

     
        <FlatList
          data={meccsEredmeny}
          keyExtractor={(item) => item.meccseredmeny_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.matchCard}>
              <View style={styles.matchHeader}>
                <Text style={styles.matchTitle}>Eredmény:</Text>
                <Text style={styles.matchResult}>{item.meccseredmeny_eredmeny}</Text>
              </View>

              <View style={styles.matchDetails}>
                <Text style={styles.matchDetailTitle}>Dátum:</Text>
                <Text style={styles.matchDetailInfo}>{item.meccseredmeny_datum}</Text>

                <Text style={styles.matchDetailTitle}>Győztes:</Text>
                <Text style={styles.matchDetailInfo}>{item.meccseredmeny_gyoztes}</Text>

                <Text style={styles.matchDetailTitle}>Vesztes:</Text>
                <Text style={styles.matchDetailInfo}>{item.meccseredmeny_vesztes}</Text>
              </View>

              <View style={styles.statContainer}>
                <Text style={styles.statTitle}>Győztes átlaga:</Text>
                <Text style={styles.statValue}>{item.meccseredmeny_atlaggyoztes}</Text>

                <Text style={styles.statTitle}>Vesztes átlaga:</Text>
                <Text style={styles.statValue}>{item.meccseredmeny_atlagvesztes}</Text>

                <Text style={styles.statTitle}>Győztes kiszálló:</Text>
                <Text style={styles.statValue}>{item.meccseredmeny_gyozteskiszallo}</Text>

                <Text style={styles.statTitle}>Legnagyobb kiszálló:</Text>
                <Text style={styles.statValue}>{item.meccseredmeny_gyozteslegnagyobb}</Text>

                <Text style={styles.statTitle}>Körök száma:</Text>
                <Text style={styles.statValue}>{item.meccseredmeny_gyozteskorszam}</Text>

                <Text style={styles.statTitle}>Dobások száma:</Text>
                <Text style={styles.statValue}>{item.meccseredmeny_gyoztesdobas}</Text>
              </View>

              <View style={styles.iconContainer}>
                <Image
                  source={require('../assets/darts-icon.png')}
                  style={styles.dartsIcon}
                />
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D5E2D5',
    padding: 15,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B3F1B',
    textAlign: 'center',
    marginVertical: 15,
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  error: {
    color: '#FF0000',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  dartsStatsContainer: {
    backgroundColor: '#F7FFF7',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  statsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B3F1B',
  },
  statsText: {
    fontSize: 18,
    color: '#333',
  },
  matchCard: {
    backgroundColor: '#F7FFF7',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  matchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B3F1B',
  },
  matchResult: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  matchDetails: {
    marginVertical: 10,
  },
  matchDetailTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B3F1B',
  },
  matchDetailInfo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  statContainer: {
    marginTop: 10,
  },
  statTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B3F1B',
  },
  statValue: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  dartsIcon: {
    width: 50,
    height: 50,
    tintColor: '#1B3F1B',
  },
});
