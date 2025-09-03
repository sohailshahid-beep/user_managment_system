import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/commen/Header';
import { useUsers } from '@/Context/useContext';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function ListingScreen() {
  const { users } = useUsers();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="User Listing" showBackButton={true} />

      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {users.length === 0 && (
            <ThemedText style={styles.noUsersText}>No users added yet.</ThemedText>
          )}
          {users.map((user, index) => (
            <ThemedView key={index} style={styles.card}>
              <ThemedText style={styles.name}>{user.name}</ThemedText>

              <View style={styles.row}>
                <MaterialIcons name="phone" size={20} color="#007AFF" style={styles.icon} />
                <ThemedText style={styles.text}> {user.phoneNumber}</ThemedText>
              </View>

              <View style={styles.row}>
                <FontAwesome5 name="user-tag" size={20} color="#007AFF" style={styles.icon} />
                <ThemedText style={styles.text}> {user.role}</ThemedText>
              </View>

              <View style={styles.row}>
                <MaterialIcons name="paid" size={20} color="#007AFF" style={styles.icon} />
                <ThemedText style={styles.text}> {user.isPaidUser ? 'Yes' : 'No'}</ThemedText>
              </View>
            </ThemedView>
          ))}
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}













const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff', paddingTop: 30 },
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40, gap: 16 },
  noUsersText: { fontSize: 16, textAlign: 'center', marginTop: 50 },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3, // for Android shadow
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  icon: { marginRight: 8 },
  text: { fontSize: 16, color: '#555' },
});
