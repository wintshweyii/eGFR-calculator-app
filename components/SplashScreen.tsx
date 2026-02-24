import { Image } from 'expo-image';
import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  View
} from 'react-native';

type Props = {
  onFinish: () => void;
};

export default function SplashScreen({ onFinish }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      onFinish();
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.centerBox, { opacity: fadeAnim }]}>

        <Image
          style={styles.imgStyle}
          source={require('../assets/images/kidneys.png')}
        />

        <Text style={styles.headerTxt}>YHealth</Text>
        <Text style={styles.headerTxtSml}>
          Check your kidney health
        </Text>

        <ActivityIndicator
          size="small"
          color="#3FA1E8"
          style={{ marginTop: 30 }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  imgStyle: {
    width: 100,
    height: 100,
    marginBottom: 20,
    marginTop: -100,
  },

  headerTxt: {
    fontSize: 34,
    fontWeight: '600',
  },

  headerTxtSml: {
    fontSize: 16,
    color: '#3FA1E8',
    marginTop: 5,
  },
});