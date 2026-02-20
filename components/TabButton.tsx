import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const TabButton = ({ label, active, onPress }: any) => (
  <TouchableOpacity
    style={[styles.tabBtn, active && styles.activeTab]}
    onPress={onPress}
  >
    <Text style={[styles.tabText, active && styles.activeText]}>
      {label}
    </Text>
  </TouchableOpacity>
)

export default TabButton

const styles = StyleSheet.create({
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },

  activeTab: {
    backgroundColor: '#fff',
  },

  tabText: {
    color: '#1a1a1a',
    fontSize: 14,
  },

  activeText: {
    fontWeight: '600',
    color: '#000',
  }
})