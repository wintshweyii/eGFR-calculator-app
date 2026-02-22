import { useHistory } from '@/contexts/historyContext';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const calculationMethods = ['All', 'CKD-EPI', 'Bedside Schwartz']; 

const Search = () => {
  const { filterHistory, loadHistory } = useHistory();

  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [showPicker, setShowPicker] = useState<null | 'fromDate' | 'fromTime' | 'toDate' | 'toTime'>(null);

  const [fromPeriod, setFromPeriod] = useState<'AM' | 'PM'>('AM');
  const [toPeriod, setToPeriod] = useState<'AM' | 'PM'>('AM');


  const [methodVisible, setMethodVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('All');

  const handleReset = async () => {
    setFromDate(undefined);
    setToDate(undefined);
    setSelectedMethod('All');
    setFromPeriod('AM');
    setToPeriod('AM');
    await loadHistory(); 
  };

  const handleConfirm = (date: Date) => {
    if (!showPicker) return;

    const isFrom = showPicker.includes('from');
    const isDate = showPicker.includes('Date');
    const baseDate = isFrom ? (fromDate ? new Date(fromDate) : new Date()) : (toDate ? new Date(toDate) : new Date());
    const period = isFrom ? fromPeriod : toPeriod;

    if (isDate) {
      baseDate.setFullYear(date.getFullYear());
      baseDate.setMonth(date.getMonth());
      baseDate.setDate(date.getDate());
    } else {
      let hours = date.getHours();
      if (period === 'PM' && hours < 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      baseDate.setHours(hours);
      baseDate.setMinutes(date.getMinutes());
    }

    isFrom ? setFromDate(baseDate) : setToDate(baseDate);
    setShowPicker(null);
  };

  const formatDate = (date?: Date) =>
    date ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` : '--/--/----';

  const formatTime = (date?: Date) =>
    date ? `${date.getHours() % 12 || 12}:${date.getMinutes().toString().padStart(2, '0')}` : '--:--';

  return (
    <View style={styles.container}>

      <Text style={styles.label}>From</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.input, { width: 150 }]}
          onPress={() => setShowPicker('fromDate')}
        >
          <Text>{formatDate(fromDate)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.input, { width: 70, marginHorizontal: 8 }]}
          onPress={() => setShowPicker('fromTime')}
        >
          <Text>{formatTime(fromDate)}</Text>
        </TouchableOpacity>

        <View style={styles.periodBox}>
          <TouchableOpacity
            onPress={() => setFromPeriod(prev => (prev === 'AM' ? 'PM' : 'AM'))}
          >
            <Text style={styles.periodText}>{fromPeriod} ▼</Text>
          </TouchableOpacity>
        </View>
      </View>


      <Text style={styles.label}>To</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.input, { width: 150 }]}
          onPress={() => setShowPicker('toDate')}
        >
          <Text>{formatDate(toDate)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.input, { width: 70, marginHorizontal: 8 }]}
          onPress={() => setShowPicker('toTime')}
        >
          <Text>{formatTime(toDate)}</Text>
        </TouchableOpacity>

        <View style={styles.periodBox}>
          <TouchableOpacity
            onPress={() => setToPeriod(prev => (prev === 'AM' ? 'PM' : 'AM'))}
          >
            <Text style={styles.periodText}>{toPeriod} ▼</Text>
          </TouchableOpacity>
        </View>
      </View>


      <Text style={styles.label}>Calculation Method</Text>
      <TouchableOpacity
        style={[styles.input, { width: '50%' }]}
        onPress={() => setMethodVisible(true)}
      >
        <Text>{selectedMethod}</Text>
      </TouchableOpacity>

      <Modal visible={methodVisible} transparent animationType="fade">
        <View style={styles.modal}>
          <FlatList
            data={calculationMethods}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  setSelectedMethod(item);
                  setMethodVisible(false);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      <View style={{ flexDirection: 'row', marginTop: 10, width: '100%', justifyContent: 'space-between' }}>
  
        <TouchableOpacity
          style={{
            backgroundColor: '#3FA1E8',
            padding: 10,
            borderRadius: 8,
            width: '48%',
          }}
          onPress={() =>
            filterHistory({
              method: selectedMethod,
              fromDate,
              toDate,
            })
          }
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#E74C3C',
            padding: 10,
            borderRadius: 8,
            width: '48%',
          }}
         onPress={handleReset}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>
           Reset
          </Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={showPicker !== null}
        mode={showPicker?.includes('Date') ? 'date' : 'time'}
        onConfirm={handleConfirm}
        onCancel={() => setShowPicker(null)}
      />

    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 5,
    marginBottom: 6,
    fontSize: 14,
    color: '#000',
    alignSelf: 'stretch',
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodBox: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    width: 70,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  periodText: {
    color: 'white',
    fontWeight: '600',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  option: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});