import { useHistory } from '@/contexts/historyContext';
import Octicons from '@expo/vector-icons/Octicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomDropdown from './DropDown';

const calculationMethods = ['All', 'CKD-EPI', 'Bedside'];

const Search = () => {
  const { filterHistory, loadHistory } = useHistory();
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [selectedMethod, setSelectedMethod] = useState('All');

  const handleReset = async () => {
    setFromDate(undefined);
    setToDate(undefined);
    setSelectedMethod('All');
    await loadHistory();
  };

  const formatDate = (date?: Date) =>
    date ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` : '--/--/----';

  return (
    <View style={styles.container}>

      <View style={{flexDirection: 'row'}}>
      <View style={styles.inlineRow}>
        <Text style={[styles.labelSmall, {marginRight: 16}]}>From</Text>
        <TouchableOpacity style={styles.compactInput} onPress={() => setShowStartPicker(true)}>
          <Text style={styles.inputText}>{formatDate(fromDate)}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inlineRow}>
        <Text style={[styles.labelSmall, {marginLeft: 20}]}>To</Text>
        <TouchableOpacity style={styles.compactInput} onPress={() => setShowEndPicker(true)}>
          <Text style={styles.inputText}>{formatDate(toDate)}</Text>
        </TouchableOpacity>
      </View>
      </View>
      <View style={styles.methodRow}>
        <Text style={styles.labelSmall}>Method</Text>
          <CustomDropdown
            data={calculationMethods.map((method) => ({ id: method, name: method }))}
            selectedValue={selectedMethod}
            onSelect={(selectedId) => setSelectedMethod(selectedId as string)}
          />
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.searchButton]} onPress={() => filterHistory({ method: selectedMethod, fromDate, toDate })}>
            <Text style={styles.buttonText}><Octicons name="search" size={12} color="white" /> Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
            <Text style={styles.buttonText}><Octicons name="filter-remove" size={12} color="white" /> Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal transparent visible={showStartPicker} animationType='fade'>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <DateTimePicker
              value={fromDate || new Date()}
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setFromDate(selectedDate);
                }
              }}
            />

            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setShowStartPicker(false)}
            >
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={showEndPicker} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <DateTimePicker
              value={toDate || new Date()}
              mode="date"
              minimumDate={fromDate}
              display="spinner"
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setToDate(selectedDate);
                }
              }}
            />

            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setShowEndPicker(false)}
            >
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginHorizontal: '5%',
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '48%',
    justifyContent: 'space-between',
    paddingVertical: 8,
    margin: 'auto'
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelSmall: {
    width: 'auto',
    fontSize: 12,
    fontWeight: '500',
    color: '#111',
    // marginRight: 5
  },
  compactInput: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    width: '70%'
  },
  methodDropdownCompact: {
    flex: 3,
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    borderRadius: 6,
    paddingHorizontal: 10
  },
  inputText: {
    color: '#333',
    fontSize: 12,
  },
  periodText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // marginTop: 10,
    width: '45%',
    marginLeft: 17
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButton: { 
    backgroundColor: '#1691E9', 
    marginRight: 4 
  }, 
  resetButton: { 
    backgroundColor: '#1691E9'
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: '600', 
    fontSize: 12 
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    backgroundColor: '#4280c1',
    borderRadius: 20,
    padding: 20,
    width: '85%',
    alignItems: 'center'
  },

  doneButton: {
    marginTop: 15,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 30
  },

  doneText: {
    color: '#1691E9',
    fontWeight: 'bold',
  },
});