/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';

const width = Dimensions.get('screen').width;

const App: () => React$Node = () => {
  const fotos = [
    { id: 1, usuario: 'rafael' },
    { id: 2, usuario: 'alberto' },
    { id: 3, usuario: 'vitor' }
  ];
  return (
    <>
      <ScrollView style={{ marginTop: 20 }}>
        {fotos.map(foto =>
          <View key={foto.id}>
            <Text>{foto.usuario}</Text>
            <Image source={require('./images/cnh.jpg')} style={{ width: width, height: width }} />
          </View>
        )}
      </ScrollView>
    </>
  );
};


export default App;
