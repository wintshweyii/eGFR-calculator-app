import BedsideCalculation from '@/components/BedsideCalculation'
import BedsideFormula from '@/components/BedsideFormula'
import BedsideUsage from '@/components/BedsideUsage'
import HeaderComponent from '@/components/header'
import TabButton from '@/components/TabButton'
import AntDesign from '@expo/vector-icons/AntDesign'
import { router, Stack } from 'expo-router'
import React, { useState } from 'react'
import { Keyboard, Pressable, StyleSheet, View } from 'react-native'

const BedsideMethod = () => {
  const [activeTab, setActiveTab] = useState<'calc' | 'usage' | 'formula'>('calc')

  const renderContent = () => {
    switch (activeTab) {
      case 'calc':
        return <BedsideCalculation />
      case 'usage':
        return <BedsideUsage />
      case 'formula':
        return <BedsideFormula />
    }
  }

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
    <View style={styles.container}>
    <HeaderComponent text={<AntDesign name="info-circle" size={20} color={'#8BC6F0'}/>} onAboutPress={() => router.push('/info')}/>
      <Stack.Screen
        options={{
          title: 'Bedside',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      />        
        <View style={styles.tabContainer}>
          <TabButton
            label="Calculator"
            active={activeTab === 'calc'}
            onPress={() => setActiveTab('calc')}
          />
          <TabButton
            label="Usage"
            active={activeTab === 'usage'}
            onPress={() => setActiveTab('usage')}
          />
          <TabButton
            label="Formula"
            active={activeTab === 'formula'}
            onPress={() => setActiveTab('formula')}
          />
        </View>

        <View style={styles.contentCard}>
          {renderContent()}
        </View>
      </View>
    </Pressable>
  )
}

export default BedsideMethod

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf3fb',
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#8BC6F0',
    borderRadius: 12,
    padding: 4,
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '40%'
  },
  contentCard: {
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    height: 'auto',
  }
})
