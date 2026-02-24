import HeaderComponent from '@/components/header';
import methodsandformulas from '@/data/methodsandformulas.json';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const Info = () => {
  const method = methodsandformulas.find((m) => m.id === 'general');
  if (!method) return <Text>Method not found!</Text>;

  const sections = [
    {
      title: 'What is eGFR?',
      content: method.info?.definition,
    },
    {
      title: 'Why is eGFR important?',
      content: method.info?.importance,
    },
    {
      title: 'How is eGFR calculated?',
      content: method.info?.calculation_methods,
    },
    {
      title: 'eGFR Grades',
      content: method.info?.normal_ranges,
    },
    {
      title: 'Factors affecting eGFR',
      content: method.info?.factors_affecting_eGFR,
    },
    {
      title: 'Limitations',
      content: method.info?.limitations,
    },
  ];

  return (
    <View style={styles.screen}>
      <HeaderComponent onAboutPress={() => router.push('/(tabs)')} />
      <View style={{height: '90%'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {sections.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.content}</Text>
          </View>
        ))}
      </ScrollView>
      </View>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#E6F0FA',
  },

  scrollContainer: {
    paddingTop: 120,
    paddingHorizontal: 18,
    paddingBottom: 40,
    marginTop: '10%'
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1B3A57',
    marginBottom: 8,
  },

  text: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
    textAlign: 'justify',
  },
});