import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import Header from '@/components/commen/Header';
import { ThemedView } from '@/components/ThemedView';
import { UserForm } from '@/components/Form/userform';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useUserStore, User } from '@/Context/useContext';
import { ThemedText } from '@/components/ThemedText';


export default function EditUserScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>(); 
  const userId = Number(params.id); 

  const { user } = useUserStore();
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const foundUser = user.find((u) => u.id === userId);
    setSelectedUser(foundUser);
  }, [userId, user]);

  if (!selectedUser) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: 30,
          backgroundColor: Platform.OS === 'android' ? '#fff' : undefined,
        }}
      >
        <Header title="Edit User" showBackButton={true} onBackPress={() => router.back()} />
        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ThemedText>User not found</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 30,
        backgroundColor: Platform.OS === 'android' ? '#fff' : undefined,
      }}
    >
      <Header title="Edit User" showBackButton={true} onBackPress={() => router.back()} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={{ flex: 1 }}>
          <UserForm user={selectedUser} onSuccess={() => router.push('/Listing')} />
        </ThemedView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
