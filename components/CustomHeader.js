// CustomHeader.js

import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomHeader = ({Title}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
      <Image source={require('../screens/Seekguru.png')} style={styles.logo} />
      <Text style={styles.title}>{Title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 60,
    paddingHorizontal: 16,
  },
  logo: {
    width:"40%",
    height:"100%",
    marginTop:5,
    marginRight:140
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight:20
  },
});

export default CustomHeader;
