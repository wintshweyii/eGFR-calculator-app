import React, { useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const BedsideCalculation = () => {
  const [scr, setScr] = useState('');
  const [creatinineUnit, setUnit] = useState('mg/dl');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [result, setResult] = useState(0);

  return (
    <View style={styles.container}>

      <View style={styles.inputBox}>
        <Text style={styles.label}>S cr</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={scr}
            onChangeText={setScr}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
            placeholder="0"
          />
          <Pressable
            style={styles.unitBtn}
            onPress={() =>
              setUnit(creatinineUnit === 'mg/dL' ? 'µmol/L' : 'mg/dL')
            }
          >
            <Text style={styles.unitText}>{creatinineUnit} ▼</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.label}>Height</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            placeholder="0"
          />
          <Pressable
            style={styles.unitBtn}
            onPress={() =>
              setHeightUnit(heightUnit === 'cm' ? 'in' : 'cm')
            }
          >
            <Text style={styles.unitText}>{heightUnit} ▼</Text>
          </Pressable>

        </View>
      </View>

      <View style={styles.resultBox}>
        <Text style={styles.resultLabel}>eGFR Result:</Text>
        <Text style={styles.resultValue}>
          {result} ml/min/1.73 m²
        </Text>
      </View>

      <View style={styles.btnRow}>
        <Pressable
          style={styles.btn}
          onPress={() => {
            setScr('');
            setHeight('');
            setResult(0);
          }}
        >
          <Text style={styles.btnText}>Clear</Text>
        </Pressable>

        <Pressable
          style={styles.btn}
          onPress={() => {
            setResult(90);
          }}
        >
          <Text style={styles.btnText}>Calculate</Text>
        </Pressable>
      </View>

    </View>
  );
};

export default BedsideCalculation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 12,
  },
  inputBox: {
    backgroundColor: 'white',
    borderRadius: 12,
    height: 80,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
    width: 60
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#bce2ee',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  unitBtn: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#1691E9',
    borderRadius: 8,
    width: 90,
    // height: 40
  },

  unitText: {
    color: 'white',
    fontWeight: '500',
  },

  resultBox: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    height: 80,
    justifyContent: 'center'
  },

  resultLabel: {
    fontSize: 16,
    color: '#1691E9',
    marginBottom: 5,
  },

  resultValue: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1691E9',
  },

  btnRow: {
    flexDirection: 'row',
  },

  btn: {
    flex: 1,
    backgroundColor: '#1691E9',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    justifyContent: 'center',
    height: 50
  },

  btnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
