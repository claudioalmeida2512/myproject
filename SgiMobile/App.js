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
  FlatList,
} from 'react-native';

const width = Dimensions.get('screen').width;

const App: () => React$Node = () => {
  const fotos = [
    { id: 1, usuario: 'claudio' },
    { id: 2, usuario: 'alberto' },
    { id: 3, usuario: 'outros' }
  ];
  return (
    <>
      <FlatList style={{"marginTop": 20}}
        keyExtractor={ item => item.id}
        data={fotos}
        renderItem={ ({ item }) =>
          <View>
            <Text>{item.usuario}</Text>
            <Image source={require('./images/cnh.jpg')} style={{ width: width, height: width }} />
          </View>
        }
      />
    </>
  );
};


export default App;
