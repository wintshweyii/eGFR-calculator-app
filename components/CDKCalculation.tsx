import { useCDK } from '@/contexts/CKDContext';
import React, { useRef, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const CDKCalculation = () => {
  const { calculateEGFR } = useCDK();

  const [scr, setScr] = useState('');
  const [age, setAge] = useState('');
  const [creatinineUnit, setUnit] = useState<'mg/dL' | 'µmol/L'>('mg/dL');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [result, setResult] = useState(0);
  const [grade, setGrade] = useState('');
  const [scrError, setScrError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  
  const scrInputRef = useRef<TextInput>(null);
  const AgeInputRef = useRef<TextInput>(null);

  const handleCalculate = async () => {
    let hasError = false;

    if (!scr) {
      setScrError(true);
      scrInputRef.current?.focus();
      hasError = true;
    } else {
      setScrError(false);
    }

    if (!age) {
      setAgeError(true);
      if (!hasError) {
        AgeInputRef.current?.focus();
      }
      hasError = true;
    } else {
      setAgeError(false);
    }

    if (hasError) return;

    const { egfr, grade } = await calculateEGFR({
      serumCreatinine: Number(scr),
      age: Number(age),
      sex: gender,
      unit: creatinineUnit,
    });
    setResult(egfr);
    setGrade(grade);

    // setScr('');
    // setAge('');
    // Keyboard.dismiss();
  };

  const clearResult = () => {
    setResult(0);
    setGrade('');
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
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
            placeholder="0"
          />
          <Pressable
            style={styles.unitBtn}
            onPress={() => {
              setUnit(creatinineUnit === 'mg/dL' ? 'µmol/L' : 'mg/dL');
              clearResult()
            }}
          >
            <Text style={styles.unitText}>{creatinineUnit} ▼</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.label}>Age</Text>
        <View style={styles.inputRow}>
          <TextInput
            ref={AgeInputRef}
            style={[styles.input, ageError && styles.errorInput]}
            value={age}
            onChangeText={(val) => {
              setAge(val);
              clearResult();
              if (val) setAgeError(false);
            }}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
            placeholder="0"
          />
          <View style={styles.unitBtn}>
            <Text style={styles.unitText}>Years</Text>
          </View>
        </View>
      </View>

      <View style={styles.genderBox}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderRow}>
          <Pressable
            style={[
              styles.genderBtn,
              gender === 'Male' && styles.genderActive,
            ]}
            onPress={() => {setGender('Male'); clearResult()}}
          >
            <Text
              style={[
                styles.genderText,
                gender === 'Male' && styles.genderTextActive,
              ]}
            >
              Male
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.genderBtn,
              gender === 'Female' && styles.genderActive,
            ]}
            onPress={() => {setGender('Female'); clearResult()}}
          >
            <Text
              style={[
                styles.genderText,
                gender === 'Female' && styles.genderTextActive,
              ]}
            >
              Female
            </Text>
          </Pressable>
        </View>
      </View>


      <View style={styles.resultBox}>
        <Text style={styles.resultLabel}>eGFR Result:</Text>
        <Text style={styles.resultValue}>
          {result} ml/min/1.73 m²
        </Text>
        {grade ? (
          <Text style={{ marginTop: 6, fontWeight: '500', color: '#1691E9' }}>
            {grade}
          </Text>
        ) : null}
      </View>

      <View style={styles.btnRow}>
        <Pressable
          style={[styles.btn, styles.clearBtn]}
          onPress={() => {
            setScr('');
            setAge('');
            setGender('Male');
            setResult(0);
            setGrade('');
          }}
        >
          <Text style={styles.btnText}>Clear</Text>
        </Pressable>

        <Pressable
          style={[styles.btn, styles.calcBtn]}
          onPress={handleCalculate}
        >
          <Text style={styles.btnText}>Calculate</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CDKCalculation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 12
  },
  inputBox: {
    backgroundColor: 'white',
    height: 80,
    borderRadius: 12,
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
  },
  unitText: {
    color: 'white',
    fontWeight: '500',
  },
  genderBox: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    height: 100,
    justifyContent: 'center'
  },
  genderRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  genderBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CDEAD5',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  genderActive: {
    backgroundColor: '#1691E9',
  },
  genderText: {
    fontSize: 16,
    color: '#555',
  },
  genderTextActive: {
    color: 'white',
    fontWeight: '600',
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
    fontSize: 28,
    fontWeight: '700',
    color: '#1691E9'
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    justifyContent: 'center',
    height: 50
  },
  clearBtn: {
    backgroundColor: '#1691E9',
  },
  calcBtn: {
    backgroundColor: '#1691E9',
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
