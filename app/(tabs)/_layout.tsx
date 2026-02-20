import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle
      }}>
      <Tabs.Screen     
        name="index"
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
            <Tabs.Screen
      name="info"
      options={{
        href: null,
      }}
      />
      <Tabs.Screen
      name="ckdmethod"
      options={{
        href: null,
      }}
      />
      <Tabs.Screen
      name="bedsideMethod"
      options={{
        href: null,
      }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create ({
    tabBarStyle: {
      backgroundColor: 'white',
      borderTopWidth: 0,
      height: 60,
      position: 'absolute',
      bottom: 16,
      // left: 30,
      // right: 30,
      marginRight: 80,
      marginLeft: 80,
      borderRadius: 30,
      shadowOpacity: 0.1,
      shadowRadius: 10,
      paddingTop: 10,
      elevation: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    centerIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      // marginBottom: 4,
      elevation: 8,
      // backgroundColor: 'red'
  },
})