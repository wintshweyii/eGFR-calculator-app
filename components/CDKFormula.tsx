import methodsandformulas from '@/data/methodsandformulas.json';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const CDKFormula = () => {
  const method = methodsandformulas.find((m) => m.id === 'ckd');
  if (!method) return <Text>Method not found!</Text>;
  const openLink1 = () => {
    Linking.openURL('https://www.egfr.app/');
  }
  const openLink2 = () => {
    Linking.openURL('https://www.kidney.org/professionals/ckd-epi-creatinine-equation-2021');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>CKD-EPI Creatinine Equation (2021) Formula</Text>
      <ScrollView>
          <Text style={styles.formulaStyle}>{method.formula}</Text>
      </ScrollView>
      <Text style={styles.abbravation}>
        <Text>Scr = standardized serum creatinine in mg/dL{'\n'}</Text>
        <Text>κ = 0.7 (females) or 0.9 (males){'\n'}</Text>
        <Text>α = -0.241 (female) or -0.302 (male){'\n'}</Text>
        <Text>min(Scr/κ, 1) is the minimum of Scr/κ or 1.0{'\n'}</Text>
        <Text>max(Scr/κ, 1) is the maximum of Scr/κ or 1.0{'\n'}</Text>
        <Text>Age (years)</Text>
      </Text>
      <View style={{gap: 10, marginTop: 10}}>
      <Text style={{fontWeight: 300, fontStyle: 'italic'}}>Sources: </Text>
      <Pressable onPress={openLink1}>
        <Text style={styles.linkStyle}>https://www.egfr.app/</Text>
      </Pressable>
      <Pressable onPress={openLink2}>
        <Text style={styles.linkStyle}>https://www.kidney.org/professionals/ckd-epi-creatinine-equation-2021</Text>
      </Pressable>
      </View>
    </View>
  )
}

export default CDKFormula

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '98%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 20,
    marginTop: 12,
    height: '79%'
  },
  heading: {
    fontSize: 20,
    marginBottom: 20
  },
  formulaStyle: {
    lineHeight: 30,
    backgroundColor: '#d2e8f7',
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
  },
  abbravation: {
    lineHeight: 18,
    color: '#333',
  }
})