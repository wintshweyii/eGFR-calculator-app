import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const options = ['Option 1', 'Option 2', 'Option 3'];

const Search = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [showPicker, setShowPicker] = useState<
    null | 'fromDate' | 'fromTime' | 'toDate' | 'toTime'
  >(null);

  const [fromPeriod, setFromPeriod] = useState<'AM' | 'PM'>(
    fromDate.getHours() >= 12 ? 'PM' : 'AM'
  );

  const [toPeriod, setToPeriod] = useState<'AM' | 'PM'>(
    toDate.getHours() >= 12 ? 'PM' : 'AM'
  );

  const handleConfirm = (date: Date) => {
    if (!showPicker) return;

    const isFrom = showPicker.includes('from');
    const isDate = showPicker.includes('Date');

    const baseDate = isFrom ? new Date(fromDate) : new Date(toDate);
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

  const formatDate = (date: Date) =>
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes}`;
  };
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>From</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.input, {width: 150}]}
          onPress={() => setShowPicker('fromDate')}
        >
          <Text>{formatDate(fromDate)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.input, {width: 70, marginRight: 8, marginLeft: 8}]}
          onPress={() => setShowPicker('fromTime')}
        >
          <Text>{formatTime(fromDate)}</Text>
        </TouchableOpacity>

      <View style={styles.periodBox}>
        <TouchableOpacity
          onPress={() =>
            setFromPeriod(prev => (prev === 'AM' ? 'PM' : 'AM'))
          }
        >
          <Text style={styles.periodText}>{fromPeriod} ▼</Text>
        </TouchableOpacity>
      </View>
      </View>

      <Text style={styles.label}>To</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.input, {width: 150}]}
          onPress={() => setShowPicker('toDate')}
        >
          <Text>{formatDate(toDate)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.input, {width: 70, marginRight: 8, marginLeft: 8}]}
          onPress={() => setShowPicker('toTime')}
        >
          <Text>{formatTime(toDate)}</Text>
        </TouchableOpacity>
        <View style={styles.periodBox}>
            <TouchableOpacity
              onPress={() =>
                setToPeriod(prev => (prev === 'AM' ? 'PM' : 'AM'))
              }
            >
              <Text style={styles.periodText}>{toPeriod} ▼</Text>
            </TouchableOpacity>
            </View>

      </View>
      {/* <View style={styles.methodContainer}>
          <Text>Method</Text>
      </View> */}

      <DateTimePickerModal
        isVisible={showPicker !== null}
        mode={showPicker?.includes('Date') ? 'date' : 'time'}
        onConfirm={handleConfirm}
        onCancel={() => setShowPicker(null)}
      />


                  {/* <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text>{selected || 'Select an option'}</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.modal}>
          <FlatList
            data={options}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => { setSelected(item); setVisible(false); }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View> */}


    </View>

  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    // padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  label: {
    marginTop: 5,
    marginBottom: 6,
    fontSize: 14,
    color: '#000000',
    alignSelf: 'stretch',
    textAlign: 'left'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%'
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
methodContainer: {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between'
},

 button: { borderWidth: 1, padding: 10, borderRadius: 8 },
  modal: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  option: { backgroundColor: '#fff', padding: 15, borderBottomWidth: 1 }
});


// import React, { useState } from 'react';
// import {
//   FlatList,
//   Modal,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

// const periodOptions = ['AM', 'PM'];
// const options = ['Option 1', 'Option 2', 'Option 3'];

// const Search = () => {
//   const [fromDate, setFromDate] = useState(new Date());
//   const [toDate, setToDate] = useState(new Date());

//   const [showPicker, setShowPicker] = useState<
//     null | 'fromDate' | 'fromTime' | 'toDate' | 'toTime'
//   >(null);

//   const [fromPeriod, setFromPeriod] = useState<'AM' | 'PM'>(
//     fromDate.getHours() >= 12 ? 'PM' : 'AM'
//   );
//   const [toPeriod, setToPeriod] = useState<'AM' | 'PM'>(
//     toDate.getHours() >= 12 ? 'PM' : 'AM'
//   );

//   const handleConfirm = (date: Date) => {
//     if (!showPicker) return;

//     const isFrom = showPicker.includes('from');
//     const isDate = showPicker.includes('Date');

//     const baseDate = isFrom ? new Date(fromDate) : new Date(toDate);
//     const period = isFrom ? fromPeriod : toPeriod;

//     if (isDate) {
//       baseDate.setFullYear(date.getFullYear());
//       baseDate.setMonth(date.getMonth());
//       baseDate.setDate(date.getDate());
//     } else {
//       let hours = date.getHours();
//       if (period === 'PM' && hours < 12) hours += 12;
//       if (period === 'AM' && hours === 12) hours = 0;
//       baseDate.setHours(hours);
//       baseDate.setMinutes(date.getMinutes());
//     }

//     isFrom ? setFromDate(baseDate) : setToDate(baseDate);
//     setShowPicker(null);
//   };

//   const formatDate = (date: Date) =>
//     `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

//   const formatTime = (date: Date) => {
//     const hours = date.getHours();
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     const displayHours = hours % 12 || 12;
//     return `${displayHours}:${minutes}`;
//   };


//   const [fromPeriodVisible, setFromPeriodVisible] = useState(false);
//   const [toPeriodVisible, setToPeriodVisible] = useState(false);


//   const [visible, setVisible] = useState(false);
//   const [selected, setSelected] = useState<string | null>(null);

//   return (
//     <View style={styles.container}>
//       {/* From */}
//       <Text style={styles.label}>From</Text>
//       <View style={styles.row}>
//         <TouchableOpacity
//           style={[styles.input, { width: 150 }]}
//           onPress={() => setShowPicker('fromDate')}
//         >
//           <Text>{formatDate(fromDate)}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.input, { width: 70, marginHorizontal: 8 }]}
//           onPress={() => setShowPicker('fromTime')}
//         >
//           <Text>{formatTime(fromDate)}</Text>
//         </TouchableOpacity>

//         <View style={styles.periodBox}>
//           <TouchableOpacity onPress={() => setFromPeriodVisible(true)}>
//             <Text style={styles.periodText}>{fromPeriod}</Text>
//           </TouchableOpacity>

//           <Modal visible={fromPeriodVisible} transparent animationType="fade">
//             <View style={styles.modal}>
//               <FlatList
//                 data={periodOptions}
//                 keyExtractor={(item) => item}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity
//                     style={styles.option}
//                     onPress={() => {
//                       setFromPeriod(item as 'AM' | 'PM');
//                       setFromPeriodVisible(false);
//                     }}
//                   >
//                     <Text>{item}</Text>
//                   </TouchableOpacity>
//                 )}
//               />
//             </View>
//           </Modal>
//         </View>
//       </View>

//       {/* To */}
//       <Text style={styles.label}>To</Text>
//       <View style={styles.row}>
//         <TouchableOpacity
//           style={[styles.input, { width: 150 }]}
//           onPress={() => setShowPicker('toDate')}
//         >
//           <Text>{formatDate(toDate)}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.input, { width: 70, marginHorizontal: 8 }]}
//           onPress={() => setShowPicker('toTime')}
//         >
//           <Text>{formatTime(toDate)}</Text>
//         </TouchableOpacity>

//         <View style={styles.periodBox}>
//           <TouchableOpacity onPress={() => setToPeriodVisible(true)}>
//             <Text style={styles.periodText}>{toPeriod}</Text>
//           </TouchableOpacity>

//           <Modal visible={toPeriodVisible} transparent animationType="fade">
//             <View style={styles.modal}>
//               <FlatList
//                 data={periodOptions}
//                 keyExtractor={(item) => item}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity
//                     style={styles.option}
//                     onPress={() => {
//                       setToPeriod(item as 'AM' | 'PM');
//                       setToPeriodVisible(false);
//                     }}
//                   >
//                     <Text>{item}</Text>
//                   </TouchableOpacity>
//                 )}
//               />
//             </View>
//           </Modal>
//         </View>
//       </View>

//       {/* Some other options */}
//       <View style={{ marginTop: 20 }}>
//         <Text>Method</Text>
//         <Text>Method</Text>
//       </View>

//       {/* DateTime Picker Modal */}
//       <DateTimePickerModal
//         isVisible={showPicker !== null}
//         mode={showPicker?.includes('Date') ? 'date' : 'time'}
//         onConfirm={handleConfirm}
//         onCancel={() => setShowPicker(null)}
//       />

//       {/* Example Option Selector */}
//       <View style={{ marginTop: 20 }}>
//         <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
//           <Text>{selected || 'Select an option'}</Text>
//         </TouchableOpacity>

//         <Modal visible={visible} transparent animationType="fade">
//           <View style={styles.modal}>
//             <FlatList
//               data={options}
//               keyExtractor={(item, index) => item + index}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.option}
//                   onPress={() => {
//                     setSelected(item);
//                     setVisible(false);
//                   }}
//                 >
//                   <Text>{item}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </View>
//         </Modal>
//       </View>
//     </View>
//   );
// };

// export default Search;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 15,
//   },
//   label: {
//     marginTop: 5,
//     marginBottom: 6,
//     fontSize: 14,
//     color: '#000',
//     alignSelf: 'stretch',
//     textAlign: 'left',
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 10,
//     width: '100%',
//   },
//   input: {
//     backgroundColor: '#fff',
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   periodBox: {
//     backgroundColor: '#3b82f6',
//     borderRadius: 10,
//     width: 70,
//     height: 38,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   periodText: {
//     color: 'white',
//     fontWeight: '600',
//   },
//   button: {
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 8,
//     backgroundColor: '#fff',
//   },
//   modal: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.3)',
//   },
//   option: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
// });