import HeaderComponent from '@/components/header'
import Search from '@/components/search'
import AntDesign from '@expo/vector-icons/AntDesign'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

const history = () => {
  return (
    <View style={{backgroundColor: '#E6F0FA', flex: 1}}>
    <HeaderComponent text={<AntDesign name="info-circle" size={20} color={'#b5bcbe'}/>} onAboutPress={() => router.push('/info')}/>    
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontSize: 20}}>EGFR History</Text>
          <Text style={{color: '#3FA1E8'}}>Your past kidney health</Text>
        </View>
        <View>
          <Search />
        </View>

        <ScrollView style={styles.resultContainer}>
          <View style={styles.firstPart}>
            <Text>
              <Ionicons name="calendar-outline" size={14} color="black" /> Date | Time                
            </Text>
            <Text>
              <MaterialCommunityIcons name="dots-vertical-circle-outline" size={20} color="#848488" />
            </Text>       
          </View>
          <View style={styles.secondPart}>
            <View style={styles.inputDataBox}>
              <Text style={styles.inputData}>S cr: 121 mg/dL</Text>
              <Text style={styles.inputData}>Height: 120 cm</Text>
              <Text style={styles.inputData}>Optional</Text>
            </View>
            <View style={styles.resultData}>
              <Text><Text style={styles.resultValue}>72</Text>ml/min/1.43</Text>
              <Text style={styles.resultGrade}>average average average</Text>
            </View>
          </View>
          <View style={styles.thirdPart}>
            <Text style={styles.calculatedMethod}>Calculated with Method Name</Text>
          </View>
        </ScrollView>
        

      </View>
    </View>
  )
}

export default history

const styles = StyleSheet.create({
  container: {
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '35%',
    // padding: 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  resultContainer: {
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
    width: '98%',
  },
  firstPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    // paddingRight: 10,
    paddingTop: 5
  },
  secondPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,

  },
  inputDataBox: {
    paddingTop: 5,
    paddingLeft: 5
  },
  inputData: {
    fontSize: 12
  },
  resultData: {
    paddingRight: 5,
    // justifyContent: 'center',
    alignItems: 'flex-end',
    // marginRight: 15,
    // backgroundColor: 'red'
  },
  resultValue: {
    color: '#1691E9',
    fontSize: 24
  },
  resultGrade: {
    textAlign: 'center',
    backgroundColor: '#0f16dc',
    color: 'white',
    borderRadius: 10,
    fontSize: 12,
    padding: 4,
  },
  thirdPart: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    paddingBottom: 5
  },
  calculatedMethod: {
    fontSize: 12,
    color: '#1691E9',
    padding: 4
  }
})