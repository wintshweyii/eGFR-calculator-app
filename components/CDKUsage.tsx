import methodsandformulas from '@/data/methodsandformulas.json';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';


const CDKUsage = () => {
  const method = methodsandformulas.find((m) => m.id === 'ckd');
  if (!method) return <Text>Method not found!</Text>;
  return (
    <View style={styles.container}>
      <Text>CDKUsage</Text>
      <FlatList
        data={method.usage}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>• {item}</Text>}
      />
    </View>
  )
}

export default CDKUsage

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '98%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    // padding: 15,
    height: '78%',
    marginTop: 12,
    padding: 15
  }
})