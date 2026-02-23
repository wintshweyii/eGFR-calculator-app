import { useHistory } from '@/contexts/historyContext';
import Octicons from '@expo/vector-icons/Octicons';
import React, { useState } from 'react';
import {
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

    if (isDate) {
      const newDate = new Date(date);
      newDate.setHours(0, 0, 0, 0);
      isFrom ? setFromDate(newDate) : setToDate(newDate);
    } else {
      const currentDate = isFrom ? fromDate ?? new Date() : toDate ?? new Date();
      const newDate = new Date(currentDate);
      let hours = date.getHours();
      const period = isFrom ? fromPeriod : toPeriod;

      if (period === 'PM' && hours < 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;

      newDate.setHours(hours);
      newDate.setMinutes(date.getMinutes());
      isFrom ? setFromDate(newDate) : setToDate(newDate);
    }

    setShowPicker(null);
  };

  const formatDate = (date?: Date) =>
    date ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` : '--/--/----';

  const formatTime = (date?: Date) =>
    date ? `${date.getHours() % 12 || 12}:${date.getMinutes().toString().padStart(2, '0')}` : '--:--';

  return (
    <View style={styles.container}>

      <View style={styles.inlineRow}>
        <Text style={styles.labelSmall}>From</Text>
        <TouchableOpacity style={styles.compactInput} onPress={() => setShowPicker('fromDate')}>
          <Text style={styles.inputText}>{formatDate(fromDate)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.compactInputSmall} onPress={() => setShowPicker('fromTime')}>
          <Text style={styles.inputText}>{formatTime(fromDate)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.periodBoxSmall} onPress={() => setFromPeriod(prev => (prev === 'AM' ? 'PM' : 'AM'))}>
          <Text style={styles.periodText}>{fromPeriod}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inlineRow}>
        <Text style={styles.labelSmall}>To</Text>
        <TouchableOpacity style={styles.compactInput} onPress={() => setShowPicker('toDate')}>
          <Text style={styles.inputText}>{formatDate(toDate)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.compactInputSmall} onPress={() => setShowPicker('toTime')}>
          <Text style={styles.inputText}>{formatTime(toDate)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.periodBoxSmall} onPress={() => setToPeriod(prev => (prev === 'AM' ? 'PM' : 'AM'))}>
          <Text style={styles.periodText}>{toPeriod}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inlineRow}>
        <Text style={styles.labelSmall}>Method</Text>
        <TouchableOpacity
          style={styles.methodDropdownCompact}
          onPress={() => {
            const currentIndex = calculationMethods.indexOf(selectedMethod);
            const nextIndex = (currentIndex + 1) % calculationMethods.length;
            setSelectedMethod(calculationMethods[nextIndex]);
          }}
        >
          <Text style={styles.inputText}>{selectedMethod} ▼</Text>
        </TouchableOpacity>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.searchButton]} onPress={() => filterHistory({ method: selectedMethod, fromDate, toDate })}>
            <Text style={styles.buttonText}><Octicons name="search" size={12} color="white" /> Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
            <Text style={styles.buttonText}><Octicons name="filter-remove" size={12} color="white" /> Reset</Text>
          </TouchableOpacity>
        </View>
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
    width: '90%',
    marginHorizontal: '5%',
    paddingVertical: 10,
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelSmall: {
    width: 50,
    fontSize: 12,
    fontWeight: '500',
    color: '#111',
  },
  compactInput: {
    flex: 2,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 6,
    alignItems: 'center',
  },
  compactInputSmall: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 6,
    alignItems: 'center',
  },
  periodBoxSmall: {
    backgroundColor: '#3FA1E8',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  methodDropdownCompact: {
    flex: 3,
    // backgroundColor: '#F1F5F9',
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
    width: 110,
    marginLeft: 10
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
    searchButton: { backgroundColor: '#3FA1E8', marginRight: 4 },
    resetButton: { backgroundColor: '#3FA1E8'},
    buttonText: { color: '#fff', fontWeight: '600', fontSize: 12 },
});