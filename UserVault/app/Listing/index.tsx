import React from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/commen/Header';
import { useUserStore } from '@/Context/useContext';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { UserForm } from '@/components/Form/userform';

export default function ListingScreen() {
  const { user } = useUserStore();

  const router = useRouter();

  const hadeledit = () => {

 router.push("/EditUser")
   
  }

  const handledelete = () => {




  }



  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="User Listing" showBackButton={true} />

      <ThemedView style={styles.container}>
        {user.length === 0 ? (
          <ThemedText style={styles.noUsersText}>No users added yet.</ThemedText>
        ) : (
          <FlatList
            data={user}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.scrollContent}
            renderItem={({ item }) => (
                <View style={styles.card}>
                   
                    <View style={styles.headerRow}>
                    <ThemedText style={styles.name}>{item.name}</ThemedText>

                    <View style={styles.actionIcons}>
                        <TouchableOpacity onPress={hadeledit}>
                        <MaterialIcons name="edit" size={20} style={styles.icon} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handledelete}>
                        <MaterialIcons name="delete" size={20} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                  </View>

           
                    <View style={styles.row}>
                    <MaterialIcons name="phone" size={20} style={styles.icon} />
                    <ThemedText style={styles.text}>{item.phoneNumber}</ThemedText>
                    </View>

                    <View style={styles.row}>
                    <FontAwesome5 name="user-tag" size={18} style={styles.icon} />
                    <ThemedText style={styles.text}>{item.role}</ThemedText>
                    </View>

               =
                    <View style={styles.row}>
                    <MaterialIcons name="verified-user" size={20} style={styles.icon} />
                    <ThemedText style={styles.text}>
                        {item.isPaidUser ? 'Paid User' : 'Free User'}
                    </ThemedText>
                    </View>
                </View>
                )}

          />
        )}
      </ThemedView>
    </SafeAreaView>
  );
};




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
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 16,
  },
  headerRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
},
actionIcons: {
  flexDirection: 'row',
  gap: 12, 
},
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#333'},
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  icon: { marginRight: 8, color: '#0000FF' },
  text: { fontSize: 16, color: '#555' },
});
