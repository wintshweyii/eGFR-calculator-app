import ConfirmModal from '@/components/delete-confirm-modal';
import HeaderComponent from '@/components/header';
import Search from '@/components/search';
import { useHistory } from '@/contexts/historyContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

const History = () => {

  const { history, loadHistory,deleteHistory, deleteAllHistory, exportAllHistory, exportSingleHistory } = useHistory();
  const [modalVisible, setModalVisible] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<'single' | 'all' | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return `${d.toLocaleDateString()} | ${d.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })}`;
  };

  const getGradeColor = (grade: string) => {
  if (!grade) return '#999';

  const upper = grade.toUpperCase();

  if (upper.includes('G1')) return '#2ECC71';       
  if (upper.includes('G2')) return '#27AE60';       
  if (upper.includes('G3A')) return '#F1C40F';      
  if (upper.includes('G3B')) return '#F39C12';      
  if (upper.includes('G4')) return '#E67E22';       
  if (upper.includes('G5')) return '#E74C3C';       

  return '#3498DB'; 
};

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setDeleteType('single');
    setModalVisible(true);
  };

  const handleDeleteAll = () => {
    if (!history || history.length === 0) {
      Alert.alert('No Data', 'No history to delete.');
      return;
    }
    setDeleteType('all');
    setModalVisible(true);
  };

  const handleConfirmDelete = async () => {
  if (deleteType === 'single' && selectedId !== null) {
    await deleteHistory(selectedId);
  }

  if (deleteType === 'all') {
    await deleteAllHistory();
  }

  setModalVisible(false);
  setDeleteType(null);
  setSelectedId(null);
};

  return (
    <View style={{ backgroundColor: '#E6F0FA', flex: 1 }}>

      <HeaderComponent
        text={<AntDesign name="info-circle" size={20} color={'#b5bcbe'} />}
        onAboutPress={() => router.push('/info')}
      />

      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={{ fontSize: 20 }}>EGFR History</Text>
          <Text style={{ color: '#3FA1E8' }}>
            Your past kidney health
          </Text>
        </View>

        <Search />

        <View style={styles.resultCountContainer}>
          <Text style={styles.resultCountText}>
            <Text style={styles.resultCount}>{history.length}</Text> Result{history.length !== 1 ? 's' : ''} Found
          </Text>
          <View style={{flexDirection: 'row'}}>
              <Entypo name="export" size={20} color="#1691E9" onPress={exportAllHistory}/>
              <MaterialIcons name="delete-outline" size={20} color="#1691E9" onPress={handleDeleteAll}/>
          </View>
        </View>

        <ScrollView 
          style={styles.resultContainer}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >

          {history.length === 0 ? (
            <Text style={{ textAlign: 'center', padding: 20 }}>
              {/* No history available */}
            </Text>
          ) : (
            history.map((item) => (

              <View key={item.history_id} style={styles.historyCard}>

                <View style={styles.firstPart}>
                  <Text>
                    <Ionicons
                      name="calendar-outline"
                      size={14}
                    />{' '}
                    {formatDate(item.created_at)}
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 2}}>
                    <Feather name="save" size={18} color="#848488" onPress={() => exportSingleHistory(item.history_id)}/>
                    <MaterialIcons name="delete-outline" size={20} color="#848488" onPress={() => handleDelete(item.history_id)}/>
                  </View>
                </View>     
                <View style={styles.secondPart}>

                  <View style={styles.inputDataBox}>
                    <Text style={styles.inputData}>
                      S cr: {item.serum_creatinine}{' '}
                      {item.creatinine_unit}
                    </Text>

                    {item.age != null && (
                      <Text style={styles.inputData}>
                        Age: {item.age}{' '}
                        Years
                      </Text>
                    )}

                    {item.sex != null && (
                      <Text style={styles.inputData}>
                        Gender: {item.sex}{' '}
                      </Text>
                    )}

                    {item.height != null && (
                      <Text style={styles.inputData}>
                        Height: {item.height}{' '}
                        {item.height_unit}
                      </Text>
                    )}
                  </View>

                  <View style={styles.resultData}>
                    <Text>
                      <Text style={styles.resultValue}>
                        {item.egfr_result}
                      </Text>
                      {' '}ml/min/1.73m²
                    </Text>

                    <Text
                    style={[
                      styles.resultGrade,
                      { backgroundColor: getGradeColor(item.egfr_result_grade) }
                    ]}>
                      {item.egfr_result_grade}
                    </Text>
                  </View>

                </View>
       
                <View style={styles.thirdPart}>
                  <Text style={styles.calculatedMethod}>
                    Calculated with {item.calculation_method}
                  </Text>
                </View>

              </View>

            ))
          )}

        </ScrollView>

      </View>
      <ConfirmModal
          visible={modalVisible}
          confirmText={
            deleteType === 'all'
              ? 'Are you sure you want to delete ALL history records?'
              : 'Are you sure you want to delete this history record?'
          }
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setModalVisible(false);
            setDeleteType(null);
            setSelectedId(null);
          }}
        />
    </View>

  );
  
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '5%',
    marginTop: '35%',
    marginBottom: '20%'
  },
  header: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  resultContainer: {
    borderRadius: 10,
    padding: 8,
    width: '94%',
    margin: 'auto',
    marginBottom: 20
  },
  firstPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
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
    // backgroundColor: '#0f16dc',
    color: 'white',
    borderRadius: 10,
    fontSize: 10,
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
  },
  historyCard: {
  marginBottom: 16, 
  padding: 12,
  backgroundColor: '#fff',
  borderRadius: 12,
},

resultCountContainer: {
  paddingHorizontal: 10,
  paddingBottom: 5,
  justifyContent: 'space-between',
  flexDirection: 'row',
  width: '95%',
  margin: 'auto',
  marginTop: 7,
  marginBottom: 7,
},

resultCountText: {
  fontSize: 13,
  // color: '#1691E9',
  fontWeight: '500'
},
resultCount: {
  fontSize: 16,
  color: '#1691E9',
  fontWeight: '700',
  // backgroundColor: '#1691E9',
},
})