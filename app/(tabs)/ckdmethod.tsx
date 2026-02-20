import CDKCalculation from '@/components/CDKCalculation'
import CDKFormula from '@/components/CDKFormula'
import CDKUsage from '@/components/CDKUsage'
import HeaderComponent from '@/components/header'
import TabButton from '@/components/TabButton'
import AntDesign from '@expo/vector-icons/AntDesign'
import { router, Stack } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

const CKDMethod = () => {
  const [activeTab, setActiveTab] = useState<'calc' | 'usage' | 'formula'>('calc')

  const renderContent = () => {
    switch (activeTab) {
      case 'calc':
        return <CDKCalculation />
      case 'usage':
        return <CDKUsage />
      case 'formula':
        return <CDKFormula />
    }
  }

  return (
    <>
    <View style={styles.container}>
      <HeaderComponent text={<AntDesign name="info-circle" size={20} color={'#b5bcbe'}/>} onAboutPress={() => router.push('/info')}/>  
      <Stack.Screen
        options={{
          title: 'CKD–EPI 2021',
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
    </>
  )
}

export default CKDMethod

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
    height: 'auto'
  }
})
