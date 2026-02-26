// import { useHistory } from '@/contexts/historyContext';
// import Octicons from '@expo/vector-icons/Octicons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import React, { useState } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import CustomDropdown from './DropDown';

// const calculationMethods = [
//   { label: 'All', value: 'All' },
//   { label: 'CKD-EPI', value: 'CKD-EPI' },
//   { label: 'Bedside', value: 'Bedside Schwartz' },
// ];

// const Search = () => {
//   const { filterHistory, loadHistory } = useHistory();
//   const [showStartPicker, setShowStartPicker] = useState(false);
//   const [showEndPicker, setShowEndPicker] = useState(false);
//   const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
//   const [toDate, setToDate] = useState<Date | undefined>(undefined);
//   const [selectedMethod, setSelectedMethod] = useState('All');

//   const handleReset = async () => {
//     setFromDate(undefined);
//     setToDate(undefined);
//     setSelectedMethod('All');
//     await loadHistory();
//   };

//   const formatDate = (date?: Date) =>
//     date ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` : 'dd/mm/yyyy';
  
//   return (
//     <View style={styles.container}>

//       <View style={{flexDirection: 'row'}}>
//       <View style={styles.inlineRow}>
//         <Text style={[styles.labelSmall]}>From</Text>
//         <TouchableOpacity style={styles.compactInput} onPress={() => setShowStartPicker(true)}>
//           <Text style={styles.inputText}>{formatDate(fromDate)}</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.inlineRow}>
//         <Text style={[styles.labelSmall, {marginLeft: 20}]}>To</Text>
//         <TouchableOpacity style={styles.compactInput} onPress={() => setShowEndPicker(true)}>
//           <Text style={styles.inputText}>{formatDate(toDate)}</Text>
//         </TouchableOpacity>
//       </View>
//       </View>
//       <View style={styles.methodRow}>
//         <View style={styles.inlineRow}>
//         <Text style={styles.labelSmall}>Method</Text>
//           <CustomDropdown
//             data={calculationMethods.map((method) => ({ id: method.value, name: method.label }))}
//             selectedValue={selectedMethod}
//             onSelect={(selectedId) => setSelectedMethod(selectedId as string)}
//           />
//         </View>
//         <View style={styles.inlineRow}>
//           <TouchableOpacity style={[styles.button, styles.searchButton]} onPress={() => filterHistory({ method: selectedMethod, fromDate, toDate })}>
//             <Text style={styles.buttonText}><Octicons name="search" size={12} color="white" /> Filter</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
//             <Text style={styles.buttonText}><Octicons name="filter-remove" size={12} color="white" /> Reset</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {showStartPicker && (
//         <DateTimePicker
//           value={fromDate || new Date()}
//           mode="date"
//           display="default"
//           onChange={(event, selectedDate) => {
//             setShowStartPicker(false);

//             if (event.type === 'set' && selectedDate) {
//               setFromDate(selectedDate);
//             }
//           }}
//         />
//       )}

//       {showEndPicker && (
//         <DateTimePicker
//           value={toDate || new Date()}
//           mode="date"
//           minimumDate={fromDate}
//           display="default"
//           onChange={(event, selectedDate) => {
//             setShowEndPicker(false);

//             if (event.type === 'set' && selectedDate) {
//               setToDate(selectedDate);
//             }
//           }}
//         />
//       )}
//     </View>
//   );
// };

// export default Search;

// const styles = StyleSheet.create({
//   container: {
//     width: '90%',
//     marginHorizontal: '5%',
//   },
//   inlineRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     flex: 1,
//     justifyContent: 'space-between',
//     paddingVertical: 8,
//     margin: 'auto'
//   },
//   methodRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   labelSmall: {
//     width: 'auto',
//     fontSize: 12,
//     fontWeight: '500',
//     color: '#111',
//   },
//   compactInput: {
//     backgroundColor: '#fff',
//     borderRadius: 6,
//     paddingVertical: 8,
//     paddingHorizontal: 10,
//     // alignItems: 'center',
//     justifyContent: 'center',
//     width: '70%',
//     height: 35
//   },
//   methodDropdownCompact: {
//     flex: 3,
//     backgroundColor: '#ffffff',
//     paddingVertical: 8,
//     borderRadius: 6,
//     paddingHorizontal: 10
//   },
//   inputText: {
//     color: '#6c757d',
//     fontSize: 12,
//     fontStyle: 'italic',
//   },
//   // buttonRow: {
//   //   flexDirection: 'row',
//   //   justifyContent: 'space-evenly',
//   //   // marginTop: 10,
//   //   width: '45%',
//   //   marginLeft: 17
//   // },
//   button: {
//     flex: 1,
//     paddingVertical: 8,
//     borderRadius: 8,
//     alignItems: 'center',
//     height: 35,
//     justifyContent: 'center'
//   },
//   searchButton: { 
//     backgroundColor: '#1691E9', 
//     marginRight: 4 ,
//     marginLeft: 17
//   }, 
//   resetButton: { 
//     backgroundColor: '#1691E9'
//   },
//   buttonText: { 
//     color: '#fff', 
//     fontWeight: '600', 
//     fontSize: 12 
//   }
// });


import { useHistory } from '@/contexts/historyContext';
import Octicons from '@expo/vector-icons/Octicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomDropdown from './DropDown';

const calculationMethods = [
  { label: 'All', value: 'All' },
  { label: 'CKD-EPI', value: 'CKD-EPI' },
  { label: 'Bedside', value: 'Bedside Schwartz' },
];

const Search = () => {
  const { filterHistory, loadHistory } = useHistory();

  const [pickerMode, setPickerMode] =
    useState<'from' | 'to' | null>(null);

  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [selectedMethod, setSelectedMethod] = useState('All');

  const handleReset = async () => {
    setFromDate(undefined);
    setToDate(undefined);
    setSelectedMethod('All');
    await loadHistory();
  };

  const formatDate = (date?: Date) =>
    date
      ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      : 'dd/mm/yyyy';

  const openPicker = (mode: 'from' | 'to') => {
    setPickerMode(mode);
  };

  const handleDateChange = (
    event: any,
    selectedDate?: Date
  ) => {
    if (Platform.OS === 'android') {
      setPickerMode(null);
    }

    if (selectedDate) {
      pickerMode === 'from'
        ? setFromDate(selectedDate)
        : setToDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.inlineRow}>
          <Text style={styles.labelSmall}>From</Text>
          <TouchableOpacity
            style={styles.compactInput}
            onPress={() => openPicker('from')}
          >
            <Text style={styles.inputText}>
              {formatDate(fromDate)}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inlineRow}>
          <Text style={[styles.labelSmall, { marginLeft: 20 }]}>
            To
          </Text>
          <TouchableOpacity
            style={styles.compactInput}
            onPress={() => openPicker('to')}
          >
            <Text style={styles.inputText}>
              {formatDate(toDate)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.methodRow}>
        <View style={styles.inlineRow}>
          <Text style={styles.labelSmall}>Method</Text>

          <CustomDropdown
            data={calculationMethods.map((method) => ({
              id: method.value,
              name: method.label,
            }))}
            selectedValue={selectedMethod}
            onSelect={(id) =>
              setSelectedMethod(id as string)
            }
          />
        </View>

        <View style={styles.inlineRow}>
          <TouchableOpacity
            style={[styles.button, styles.searchButton]}
            onPress={() =>
              filterHistory({
                method: selectedMethod,
                fromDate,
                toDate,
              })
            }
          >
            <Text style={styles.buttonText}>
              <Octicons
                name="search"
                size={12}
                color="white"
              />{' '}
              Filter
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={handleReset}
          >
            <Text style={styles.buttonText}>
              <Octicons
                name="filter-remove"
                size={12}
                color="white"
              />{' '}
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* //calendar picker for android */}
      {Platform.OS === 'android' && pickerMode && (
        <DateTimePicker
          value={
            pickerMode === 'from'
              ? fromDate || new Date()
              : toDate || new Date()
          }
          mode="date"
          display="default"
          minimumDate={
            pickerMode === 'to'
              ? fromDate
              : undefined
          }
          onChange={handleDateChange}
        />
      )}

      {/* //calendar picker for ios */}
      {Platform.OS === 'ios' && (
        <Modal
          visible={pickerMode !== null}
          transparent
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.pickerBox}>
              <DateTimePicker
                value={
                  pickerMode === 'from'
                    ? fromDate || new Date()
                    : toDate || new Date()
                }
                mode="date"
                display="spinner"
                minimumDate={
                  pickerMode === 'to'
                    ? fromDate
                    : undefined
                }
                onChange={handleDateChange}
              />

              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => setPickerMode(null)}
              >
                <Text style={styles.doneText}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 8,
  },

  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  labelSmall: {
    fontSize: 12,
    fontWeight: '500',
    color: '#111',
  },

  compactInput: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
    width: '70%',
    height: 35,
  },

  inputText: {
    color: '#6c757d',
    fontSize: 12,
    fontStyle: 'italic',
  },

  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    height: 35,
    justifyContent: 'center',
  },

  searchButton: {
    backgroundColor: '#1691E9',
    marginRight: 4,
    marginLeft: 17,
  },

  resetButton: {
    backgroundColor: '#1691E9',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  pickerBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  doneButton: {
    alignItems: 'center',
    marginTop: 10,
  },

  doneText: {
    color: '#1691E9',
    fontWeight: '600',
    fontSize: 16,
  },
});