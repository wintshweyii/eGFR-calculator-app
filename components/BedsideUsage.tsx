import methodsandformulas from '@/data/methodsandformulas.json';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const BedsideUsage = () => {
  const method = methodsandformulas.find((m) => m.id === 'bedside');
  if (!method) return <Text>Method not found!</Text>;
  return (
    <View style={styles.container}>
      <Text>BedsideUsage</Text>
      <FlatList
        data={method.usage}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>• {item}</Text>}
      />
    </View>
  )
}

export default BedsideUsage

const styles = StyleSheet.create({
    container: {
    backgroundColor: 'white',
    width: '98%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 15,
    height: 'auto',
    marginTop: 12
  }
})