import React from 'react';
import { SafeAreaView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import Header from '@/components/commen/Header';
import { ThemedView } from '@/components/ThemedView';
import { UserForm } from '@/components/Form/userform';
import { useRouter } from 'expo-router';

export default function EditUserScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 30, backgroundColor: Platform.OS === 'android' ? '#fff' : undefined }}>
      <Header title="Edit User" showBackButton={false} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={{ flex: 1 }}>
          <UserForm onSuccess={() => router.push('/Listing')} />
        </ThemedView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
