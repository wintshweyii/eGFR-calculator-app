import { HapticTab } from '@/components/haptic-tab';
import SplashScreen from '@/components/SplashScreen';
import HistoryToast from '@/components/toast';
import { Colors } from '@/constants/theme';
import { BedsideProvider } from '@/contexts/BedsideContext';
import { CDKProvider } from '@/contexts/CKDContext';
import { HistoryProvider } from '@/contexts/historyContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { initDatabase } from '@/services/database';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initDatabase();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <HistoryProvider>
    <BedsideProvider>
    <CDKProvider>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle
      }}>
      <Tabs.Screen     
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) =>           
          <View style={[styles.centerIcon, {marginLeft: 20}]}>
            <AntDesign name="home" size={24} color={focused ? '#3FA1E8' : 'gray'} />
          </View>
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => 
          <View style={[styles.centerIcon, {marginTop: 2, marginRight: 20}]}>
            <AntDesign name="history" size={23} color={focused ? '#3FA1E8' : 'gray'} />
          </View> ,
        }}
      />
      <Tabs.Screen name="info" options={{href: null}}/>
      <Tabs.Screen name="ckdmethod" options={{href: null}}/>
      <Tabs.Screen name="bedsideMethod" options={{href: null}}/>
      <Tabs.Screen name="index" options={{href: null}}/>
    </Tabs>
    <HistoryToast />
    </CDKProvider>
    </BedsideProvider>
    </HistoryProvider>
    
  ); 
}

const styles = StyleSheet.create ({
    tabBarStyle: {
      backgroundColor: 'white',
      borderTopWidth: 0,
      height: 60,
      position: 'absolute',
      bottom: 25,
      marginRight: 80,
      marginLeft: 80,
      borderRadius: 30,
      paddingTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    centerIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
  },
})