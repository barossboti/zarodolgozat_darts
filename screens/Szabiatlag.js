import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function Szabiatlag({route}) {
  const [atlagData, setAtlagData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [secondSelectedData, setSecondSelectedData] = useState(null);
  const [thirdSelectedData, setThirdSelectedData] = useState(null); // Harmadik diagram kiválasztott adatai
  const [errorMessage, setErrorMessage] = useState(null);
  const {id,nev}=route.params

  const fetchAverageData = async () => {
    try {
      var adatok = {
        "bevitel1":nev
      }
      const response = await fetch('http://192.168.10.65:3000/meccseredmenylekerdez', {
        method: 'POST',
        body: JSON.stringify(adatok),
        headers: {"Content-type": "application/json; charset=UTF-8"},
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setAtlagData(data);
    } catch (error) {
      console.error('Error fetching average data:', error);
      setErrorMessage('Nem sikerült lekérni az átlag adatokat.');
    }
  };

  useEffect(() => {
    fetchAverageData();
    //alert(id)
    const interval = setInterval(() => {
      fetchAverageData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContainer}
    >
      <Text style={styles.header}>Összes dobásod átlagának változása mérkőzésenként!</Text>

      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      {/* Első diagram - Átlagdobás */}
      <LineChart
        data={{
          labels: atlagData
            .filter(item => item.meccs_elsojatekos === nev || item.meccs_masodikjatekos === nev)
            .sort((a, b) => a.meccs_id - b.meccs_id)
            .map((item, index) => `Meccs ${index + 1}`),
          datasets: [
            {
              data: atlagData
                .filter(item => item.meccs_elsojatekos === nev || item.meccs_masodikjatekos === nev)
                .sort((a, b) => a.meccs_id - b.meccs_id)
                .map(item => {
                  if (item.meccseredmeny_gyoztes === nev) {
                    return item.meccseredmeny_atlaggyoztes || 0;
                  } else if (item.meccseredmeny_vesztes === nev) {
                    return item.meccseredmeny_atlagvesztes || 0;
                  } else {
                    return 0;
                  }
                }),
              color: (opacity = 1) => `rgba(27, 63, 27, ${opacity})`,
              strokeWidth: 2,
            },
          ],
        }}
        width={Dimensions.get('window').width - 30}
        height={220}
        chartConfig={{
          backgroundColor: '#D5E2D5',
          backgroundGradientFrom: '#D5E2D5',
          backgroundGradientTo: '#F7FFF7',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(27, 63, 27, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
          },
        }}
        bezier
        style={{
          marginVertical: 20,
          borderRadius: 16,
        }}
        onDataPointClick={(data) => {
          const index = data.index;
          const filteredData = atlagData
            .filter(item => item.meccs_elsojatekos === nev || item.meccs_masodikjatekos === nev)
            .sort((a, b) => a.meccs_id - b.meccs_id);
          const selectedItem = filteredData[index];
          setSelectedData(selectedItem);
        }}
      />

      {selectedData && (
        <View style={styles.selectedDataContainer}>
          <Text style={styles.selectedDataText}>
            Átlagdobás: {selectedData.meccseredmeny_gyoztes === nev
              ? selectedData.meccseredmeny_atlaggyoztes
              : selectedData.meccseredmeny_atlagvesztes}
          </Text>
        </View>
      )}

      <Text style={styles.header2}>Az első dobásod mérkőzésenként:</Text>

      {/* Második diagram - Legnagyobb dobás */}
      <LineChart
        data={{
          labels: atlagData
            .filter(item => item.meccs_elsojatekos === nev|| item.meccs_masodikjatekos === nev)
            .sort((a, b) => a.meccs_id - b.meccs_id)
            .map((item, index) => `Meccs ${index + 1}`),
          datasets: [
            {
              data: atlagData
                .filter(item => item.meccs_elsojatekos === nev || item.meccs_masodikjatekos === nev)
                .sort((a, b) => a.meccs_id - b.meccs_id)
                .map(item => {
                  if (item.meccseredmeny_gyoztes === nev) {
                    return item.meccseredmeny_gyoztesdobas || 0;
                  } else if (item.meccseredmeny_vesztes === nev) {
                    return item.meccseredmeny_vesztesdobas || 0;
                  } else {
                    return 0;
                  }
                }),
              color: (opacity = 1) => `rgba(27, 63, 27, ${opacity})`,
              strokeWidth: 2,
            },
          ],
        }}
        width={Dimensions.get("window").width - 30}
        height={220}
        chartConfig={{
          backgroundColor: '#D5E2D5',
          backgroundGradientFrom: '#D5E2D5',
          backgroundGradientTo: '#F7FFF7',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(27, 63, 27, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#1B3F1B",
          },
        }}
        bezier
        style={{
          marginVertical: 20,
          borderRadius: 16,
        }}
        onDataPointClick={(data) => {
          const index = data.index;
          const filteredData = atlagData
            .filter(item => item.meccs_elsojatekos === nev || item.meccs_masodikjatekos === nev)
            .sort((a, b) => a.meccs_id - b.meccs_id);
          const selectedItem = filteredData[index];
          setSecondSelectedData(selectedItem);
        }}
      />

      {secondSelectedData && (
        <View style={styles.selectedDataContainer}>
          <Text style={styles.selectedDataText}>
            Első dobás: {secondSelectedData.meccseredmeny_gyoztes === nev
              ? secondSelectedData.meccseredmeny_gyoztesdobas
              : secondSelectedData.meccseredmeny_vesztesdobas}
          </Text>
        </View>
      )}

      <Text style={styles.header2}>A legnagyobb dobásod mérkőzésenként:</Text>

      {/* Harmadik diagram - Legnagyobb dobás */}
      <LineChart
        data={{
          labels: atlagData
            .filter(item => item.meccs_elsojatekos === nev || item.meccs_masodikjatekos === nev)
            .sort((a, b) => a.meccs_id - b.meccs_id)
            .map((item, index) => `Meccs ${index + 1}`),
          datasets: [
            {
              data: atlagData
                .filter(item => item.meccs_elsojatekos === nev || item.meccs_masodikjatekos === nev)
                .sort((a, b) => a.meccs_id - b.meccs_id)
                .map(item => {
                  if (item.meccseredmeny_gyoztes === nev) {
                    return item.meccseredmeny_gyozteslegnagyobb || 0;
                  } else if (item.meccseredmeny_vesztes === nev) {
                    return item.meccseredmeny_veszteslegnagyobb || 0;
                  } else {
                    return 0;
                  }
                }),
              color: (opacity = 1) => `rgba(27, 63, 27, ${opacity})`,
              strokeWidth: 2,
            },
          ],
        }}
        width={Dimensions.get("window").width - 30}
        height={220}
        chartConfig={{
          backgroundColor: '#D5E2D5',
          backgroundGradientFrom: '#D5E2D5',
          backgroundGradientTo: '#F7FFF7',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(27, 63, 27, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#1B3F1B",
          },
        }}
        bezier
        style={{
          marginVertical: 20,
          borderRadius: 16,
        }}
        onDataPointClick={(data) => {
          const index = data.index;
          const filteredData = atlagData
            .filter(item => item.meccs_elsojatekos === nev || item.meccs_masodikjatekos === nev)
            .sort((a, b) => a.meccs_id - b.meccs_id);
          const selectedItem = filteredData[index];
          setThirdSelectedData(selectedItem);
        }}
      />

      {thirdSelectedData && (
        <View style={styles.selectedDataContainer}>
          <Text style={styles.selectedDataText}>
            Legnagyobb dobás: {thirdSelectedData.meccseredmeny_gyoztes === nev
              ? thirdSelectedData.meccseredmeny_gyozteslegnagyobb
              : thirdSelectedData.meccseredmeny_veszteslegnagyobb}
          </Text>
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#D5E2D5',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1B3F1B',
    marginBottom: 20,
    textAlign: 'center',
  },
  header2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1B3F1B',
    marginBottom: 15,
    textAlign: 'center',
    paddingTop: 20,
  },
  error: {
    color: '#FF0000',
    fontSize: 16,
    marginBottom: 20,
  },
  selectedDataContainer: {
    marginTop: 20,
    backgroundColor: '#F7FFF7',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedDataText: {
    fontSize: 16,
    color: '#1B3F1B',
  },
});
