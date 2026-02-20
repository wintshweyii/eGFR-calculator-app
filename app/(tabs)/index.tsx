import HeaderComponent from '@/components/header';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>  
      <HeaderComponent text={<AntDesign name="info-circle" size={20} color={'#b5bcbe'}/>} onAboutPress={() => router.push('/info')}/>  
    <View style={styles.containerHolder}>
      <Pressable
        style={styles.card}
        onPress={() => router.push('/(tabs)/ckdmethod')}
      >
        <View>
          <Text style={styles.title}>CKD–EPI 2021 equation</Text>
          <Text style={styles.subtitle}>Preferred Method</Text>
        </View>

        <Ionicons name="arrow-forward-circle-outline" size={28} color="#333" />
      </Pressable>

      <Pressable
        style={styles.card}
        onPress={() => router.push('/(tabs)/bedsideMethod')}
      >
        <View>
          <Text style={styles.title}>Bedside Schwartz equation</Text>
          <Text style={styles.subtitle}>For age (1–17)</Text>
        </View>

        <Ionicons name="arrow-forward-circle-outline" size={28} color="#333" />
      </Pressable>

    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FA',
    padding: 50,

  },
  containerHolder: {
    marginTop: '40%'
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginTop: 60,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 116,
    shadowColor: '#3FA1E8',
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: '#3b82f6',
  },
});
