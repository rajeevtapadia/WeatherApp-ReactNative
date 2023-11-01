/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  GestureResponderEvent,
  InputAccessoryView,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const [city, setCityState] = React.useState('');
  const [currTemp, setTemp] = React.useState(null);
  const [aqi, setAqi] = React.useState(null);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const setCity = async (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    console.log('data from api', e.nativeEvent.text);
    setCityState(e.nativeEvent.text);
    setTemp(null);
  };

  const getData = async () => {
    if (!city) {
      console.log('no city selected');
      return;
    }
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=fc4349aabf5b4513843135646233110&q=${city}&aqi=yes`,
    );
    const data = await res.json();
    setTemp(data.current.temp_c);
    setAqi(data.current.air_quality.pm2_5);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Text>Weather app</Text>
        <TextInput
          placeholder="Enter name of your city"
          onChange={e => setCity(e)}
        />
        <Button title="Fetch" onPress={getData} />
        {currTemp && (
          <View>
            <Text>Selected City: {city}</Text>
          <Text>
            Current Temperature: {currTemp} deg C
          </Text>
          <Text>
            Current Air Quality: {aqi} pm2.5
          </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
