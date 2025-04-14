import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Ip from '../Ip';

export default function Szabiatlag({route}) {
  const [atlagData, setAtlagData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const {id, nev} = route.params;
  const scrollViewRef = useRef(null);

  const fetchAverageData = async () => {
    try {
      var adatok = {
        "bevitel1": nev
      };
      const response = await fetch(Ip.Ipcim+'meccseredmenylekerdez', {
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
      //console.error('Error fetching average data:', error);
      setErrorMessage('Failed to retrieve the average data.');
    }
  };

  useEffect(() => {
    
    fetchAverageData();
    const interval = setInterval(() => {
      fetchAverageData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredData = atlagData
    .filter(item => item.meccs_elsojatekos === nev || item.meccs_masodikjatekos === nev)
    .sort((a, b) => a.meccs_id - b.meccs_id);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [filteredData]);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContainer}
    >
      <Text style={styles.header}>Changes in Your Average Throws per Match!</Text>

      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      <ScrollView 
        horizontal 
        contentContainerStyle={styles.chartContainer}
        ref={scrollViewRef}
      >
        <LineChart
          data={{
            labels: filteredData.map((item, index) => `Match ${index + 1}`),
            datasets: [
              {
                data: filteredData.map(item => {
                  if (item.meccseredmeny_gyoztes === nev) {
                    return item.meccseredmeny_atlaggyoztes || 0;
                  } else if (item.meccseredmeny_vesztes === nev) {
                    return item.meccseredmeny_atlagvesztes || 0;
                  } else {
                    return 0;
                  }
                }),
                color: (opacity = 1) => `rgba(27, 63, 27, ${opacity})`,
                strokeWidth: 3,
              },
            ],
          }}
          width={Math.max(filteredData.length * 90, Dimensions.get('window').width - 40)}
          height={300}
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
              r: "5",
              strokeWidth: "2",
            },
          }}
          bezier
          style={styles.chartStyle}
          onDataPointClick={(data) => {
            const index = data.index;
            const selectedItem = filteredData[index];
            setSelectedData(selectedItem);
          }}
        />
      </ScrollView>

      {selectedData && (
        <View style={styles.selectedDataContainer}>
          <Text style={styles.selectedDataText}>
            Average Throw: {selectedData.meccseredmeny_gyoztes === nev
              ? selectedData.meccseredmeny_atlaggyoztes
              : selectedData.meccseredmeny_atlagvesztes}
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
  error: {
    color: '#FF0000',
    fontSize: 16,
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartStyle: {
    marginVertical: 20,
    borderRadius: 16,
    alignSelf: 'center',
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
