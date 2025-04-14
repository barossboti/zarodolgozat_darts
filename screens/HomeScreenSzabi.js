import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button } from 'react-native';
import Ip from '../Ip';

export default function HomeScreenSzabi({ navigation, route }) {
  const { id, nev, dartsThrown, startingPlayer, selectedPlayers, winner, setsWon, legsWon, highestCheckout, avgPoints } = route.params || {};

  const [matchResults, setMatchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchMatchResults = async () => {
    try {
      const data = { bevitel1: nev };
      const response = await fetch(Ip.Ipcim + 'meccseredmenylekerdez', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setMatchResults(result);
    } catch (error) {
      console.error('Error fetching match results:', error);
      setErrorMessage('Failed to retrieve data.');
    }
  };

  const submitMatchResults = async () => {
    try {
      const today = new Date();
      const formattedDate = today.getFullYear() + '-' +
                            ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
                            ('0' + today.getDate()).slice(-2) + ' ' +
                            ('0' + today.getHours()).slice(-2) + ':' +
                            ('0' + today.getMinutes()).slice(-2) + ':' +
                            ('0' + today.getSeconds()).slice(-2);

      const data = {
        winner: winner,
        date: formattedDate,
        dartsThrown: dartsThrown,
        avgPoints: avgPoints,
        highestCheckout: highestCheckout,
        setsWon: setsWon,
        id: id,
      };

      const response = await fetch(Ip.Ipcim + 'meccseredmenyFelvitel', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const message = await response.text();
      alert(message);
    } catch (error) {
      console.error('Error submitting match results:', error);
      setErrorMessage('Failed to submit data.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await submitMatchResults();
      fetchMatchResults();
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Darts Match Results</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Click here to view your statistics!"
          onPress={() => navigation.navigate('Szabiatlag', { id, nev })}
          color="#1B3F1B"
        />
      </View>

      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      
        
      

      <FlatList
        data={matchResults}
        keyExtractor={(item) => item.meccseredmeny_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.matchCard}>
            <View style={styles.matchHeader}>
              <Text style={styles.matchTitle}>Result:</Text>
              <Text style={styles.matchResult}>{item.meccseredmeny_eredmeny}</Text>
            </View>

            <View style={styles.matchDetails}>
              <Text style={styles.matchDetailTitle}>Date:</Text>
              <Text style={styles.matchDetailInfo}>{item.meccseredmeny_datum}</Text>

              <Text style={styles.matchDetailTitle}>Winner:</Text>
              <Text style={styles.matchDetailInfo}>{item.meccseredmeny_gyoztes}</Text>

              <Text style={styles.matchDetailTitle}>Loser:</Text>
              <Text style={styles.matchDetailInfo}>{item.meccseredmeny_vesztes}</Text>
            </View>

            <View style={styles.statContainer}>
              <Text style={styles.statTitle}>Winner's Average:</Text>
              <Text style={styles.statValue}>{item.meccseredmeny_atlaggyoztes}</Text>

              <Text style={styles.statTitle}>Loser's Average:</Text>
              <Text style={styles.statValue}>{item.meccseredmeny_atlagvesztes}</Text>

              <Text style={styles.statTitle}>Winner's Checkout:</Text>
              <Text style={styles.statValue}>{item.meccseredmeny_gyozteskiszallo}</Text>

              <Text style={styles.statTitle}>Highest Checkout:</Text>
              <Text style={styles.statValue}>{item.meccseredmeny_gyozteslegnagyobb}</Text>

              <Text style={styles.statTitle}>Number of Rounds:</Text>
              <Text style={styles.statValue}>{item.meccseredmeny_gyozteskorszam}</Text>

              <Text style={styles.statTitle}>Number of Throws:</Text>
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
