import { useBedside } from '@/contexts/BedsideContext';
import Octicons from '@expo/vector-icons/Octicons';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const BedsideCalculation = () => {
  const { calculateBedsideEGFR } = useBedside();

  const [scr, setScr] = useState('');
  const [height, setHeight] = useState('');
  const [creatinineUnit, setCreatinineUnit] = useState<'mg/dL' | 'µmol/L'>('mg/dL');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'inch'>('cm');
  const [result, setResult] = useState(0);
  const [grade, setGrade] = useState('');

  const [scrError, setScrError] = useState(false);
  const [heightError, setHeightError] = useState(false);

  const scrInputRef = useRef<TextInput>(null);
  const heightInputRef = useRef<TextInput>(null);

  const clearResult = () => {
    setResult(0);
    setGrade('');
  };

  const handleCalculate = async () => {
    let hasError = false;

    if (!scr) {
      setScrError(true);
      scrInputRef.current?.focus();
      hasError = true;
    } else {
      setScrError(false);
    }

    if (!height) {
      setHeightError(true);
      if (!hasError) {
        heightInputRef.current?.focus();
      }
      hasError = true;
    } else {
      setHeightError(false);
    }

    if (hasError) return;

    const { egfr, grade } = await calculateBedsideEGFR({
      height: Number(height),
      heightUnit,
      serumCreatinine: Number(scr),
      unit: creatinineUnit,
    });

    setResult(egfr);
    setGrade(grade);
  };

  return (
    <View style={styles.container}>

      <View style={styles.inputBox}>
        <Text style={styles.label}>S cr</Text>
        <View style={styles.inputRow}>
          <TextInput
            ref={scrInputRef}
            style={[styles.input, scrError && styles.errorInput]}
            value={scr}
            onChangeText={(val) => {
              setScr(val);
              clearResult();
              if (val) setScrError(false);
            }}
            keyboardType="numeric"
            placeholder="0"
          />
          <TouchableOpacity
            style={styles.unitBtn}
            onPress={() => {
              setCreatinineUnit(creatinineUnit === 'mg/dL' ? 'µmol/L' : 'mg/dL');
              clearResult();
            }}
          >
            <Text style={styles.unitText}>{creatinineUnit} <Octicons name="arrow-switch" size={12} color="#eaf3fb" /></Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.label}>Height</Text>
        <View style={styles.inputRow}>
          <TextInput
            ref={heightInputRef}
            style={[styles.input, heightError && styles.errorInput]}
            value={height}
            onChangeText={(val) => {
              setHeight(val);
              clearResult();
              if (val) setHeightError(false);
            }}
            keyboardType="numeric"
            placeholder="0"
          />
          <TouchableOpacity
            style={styles.unitBtn}
            onPress={() => {
              setHeightUnit(heightUnit === 'cm' ? 'inch' : 'cm');
              clearResult();
            }}
          >
            <Text style={styles.unitText}>{heightUnit} <Octicons name="arrow-switch" size={12} color="#eaf3fb" /></Text>
          </TouchableOpacity>

        </View>
      </View>

      <View style={styles.resultBox}>
        <Text style={styles.resultLabel}>eGFR Result:</Text>
        <Text style={styles.resultValue}>{result} ml/min/1.73 m²</Text>
        {grade ? (
          <Text style={{ marginTop: 6, fontWeight: '500', color: '#1691E9' }}>{grade}</Text>
        ) : null}
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.btn} 
        onPress={() => {
          setScr('');
          setHeight('');
          setResult(0);
          setGrade('');
          setCreatinineUnit('mg/dL');
          setHeightUnit('cm');
          setScrError(false);
          setHeightError(false);
        }}>
          <Text style={styles.btnText}>Clear</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={handleCalculate}>
          <Text style={styles.btnText}>Calculate</Text>
        </TouchableOpacity>
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
  errorInput: {
    borderColor: 'red',
  },
  unitBtn: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#1691E9',
    borderRadius: 8,
    width: 90,
    alignItems: 'center'
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
    height: 110,
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