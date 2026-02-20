import methodsandformulas from '@/data/methodsandformulas.json';
import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

const BedsideFormula = () => {
  const openLink1 = () => {
    Linking.openURL('https://www.egfr.app/');
  }
  const openLink2 = () => {
    Linking.openURL('https://calculator.academy/schwartz-formula-calculator/');
  }
  const method = methodsandformulas.find((m) => m.id === 'bedside');
  if (!method) return <Text>Method not found!</Text>;
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bedside Formula</Text>
      <Text style={styles.formulaStyle}>{method.formula}</Text>
      <View style={{gap: 10}}>
      <Text style={{fontWeight: 300, fontStyle: 'italic'}}>Sources: </Text>
      <Pressable onPress={openLink1}>
        <Text style={styles.linkStyle}>https://www.egfr.app/</Text>
      </Pressable>
      <Pressable onPress={openLink2}>
        <Text style={styles.linkStyle}>https://calculator.academy/schwartz-formula-calculator/</Text>
      </Pressable>
      </View>
    </View>
  )
}

export default BedsideFormula

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '98%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 20,
    marginTop: 12,
    height: 'auto'
  },
  heading: {
    fontSize: 20,
    marginBottom: 20
  },
  formulaStyle: {
    lineHeight: 30,
    backgroundColor: '#b6dbf5',
    padding: 7,
    borderRadius: 10,
    color: '#084573',
    fontWeight: 500,
    fontSize: 18,
    marginBottom: 10
  },
  linkStyle: {
    fontWeight: 200,
    fontStyle: 'italic',
    textDecorationLine: 'underline'
  }
})