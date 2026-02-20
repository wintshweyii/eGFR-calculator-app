import HeaderComponent from '@/components/header';
import methodsandformulas from '@/data/methodsandformulas.json';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const info = () => {
  const method = methodsandformulas.find((m) => m.id === 'general');
  if (!method) return <Text>Method not found!</Text>;
  return (
    <View style={{backgroundColor: '#E6F0FA', flex: 1}}> 
    <HeaderComponent onAboutPress={() => router.push('/(tabs)')} />  
     <ScrollView style={{marginTop: '30%'}}>
      <View style={[styles.container, {backgroundColor: '#ffffff'}]}>
        <Text style={styles.subHeading}>What is eGFR?</Text>
        <Text style={styles.content}>{method.info?.definition}</Text>
      </View>
      <View style={[styles.container, {backgroundColor: '#d1e7f3'}]}>
        <Text style={styles.subHeading}>Why is eGFR important?</Text>
        <Text style={styles.content}>{method.info?.importance}</Text>
      </View>
      <View style={[styles.container, {backgroundColor: '#f7e3f6'}]}>
        <Text style={styles.subHeading}>How is eGFR calculated?</Text>
        <Text style={styles.content}>{method.info?.calculation_methods}</Text>
      </View>
      <View style={[styles.container, {backgroundColor: '#dfe4da'}]}>
        <Text style={styles.subHeading}>eGFR Grades</Text>
        <Text style={styles.content}>{method.info?.normal_ranges}</Text>
      </View>
      <View style={[styles.container, {backgroundColor: '#ecdce2'}]}>
        <Text style={styles.subHeading}>Factors affecting eGFR</Text>
        <Text style={styles.content}>{method.info?.factors_affecting_eGFR}</Text>
      </View>
      <View style={[styles.container, {backgroundColor: '#c1cac4', marginBottom: 100}]}>
        <Text style={styles.subHeading}>Limitations</Text>
        <Text style={styles.content}>{method.info?.limitations}</Text>
      </View>
    </ScrollView>
    </View>
  )
}

export default info

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '10%',
    padding: 10,
    borderRadius: 10
  },
  subHeading: {
    fontWeight: 300,
    fontSize: 20
  },
  content: {
    lineHeight: 20,
    textAlign: 'justify'
  }
})