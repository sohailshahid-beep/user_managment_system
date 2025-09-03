import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/commen/ThemedTextInput';
import { ThemedButton } from '@/components/Button/ThemedButton';
import Header from '@/components/commen/Header';
import { useNavigation } from 'expo-router';
import { useUsers, User, UserRole } from '@/Context/useContext';

interface UserFormData {
  name: string;
  phoneNumber: string;
  role: UserRole | '';
  isPaidUser: boolean;
}

export default function AddUserScreen() {
  const navigation = useNavigation();
  const { addUser } = useUsers();
  const router = useRouter();

  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    phoneNumber: '',
    role: '',
    isPaidUser: false,
  });

  const handleInputChange = (field: keyof UserFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhoneNumberChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    handleInputChange('phoneNumber', numericText);
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter a name');
      return;
    }

    if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    if (!formData.role) {
      Alert.alert('Error', 'Please select a role');
      return;
    }

    const newUser: User = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      role: formData.role as UserRole,
      isPaidUser: formData.isPaidUser,
    };

    addUser(newUser);

    setFormData({
      name: '',
      phoneNumber: '',
      role: '',
      isPaidUser: false,
    });

    router.push('/Listing'); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Add New User" showBackButton={false} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.container}>
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <ThemedView style={styles.form}>
             
              <ThemedView style={styles.inputGroup}>
                <ThemedText type="defaultSemiBold" style={styles.label}>
                  Name <ThemedText style={styles.required}>*</ThemedText>
                </ThemedText>
                <ThemedTextInput
                  style={styles.input}
                  placeholder="Enter full name"
                  value={formData.name}
                  onChangeText={(text) => handleInputChange('name', text)}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              </ThemedView>

              <ThemedView style={styles.inputGroup}>
                <ThemedText type="defaultSemiBold" style={styles.label}>
                  Phone Number <ThemedText style={styles.required}>*</ThemedText>
                </ThemedText>
                <ThemedTextInput
                  style={styles.input}
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChangeText={handlePhoneNumberChange}
                  keyboardType="phone-pad"
                  maxLength={15}
                  returnKeyType="next"
                />
              </ThemedView>

              <ThemedView style={styles.inputGroup}>
                <ThemedText type="defaultSemiBold" style={styles.label}>
                  Role <ThemedText style={styles.required}>*</ThemedText>
                </ThemedText>
                <ThemedView style={styles.roleOptions}>
                  {(['Manager', 'Sales Manager', 'Admin'] as UserRole[]).map((role) => (
                    <ThemedButton
                      key={role}
                      title={role}
                      onPress={() => handleInputChange('role', role)}
                      style={[
                        styles.roleButton,
                        formData.role === role && styles.roleButtonSelected
                      ]}
                      textStyle={[
                        styles.roleButtonText,
                        formData.role === role && styles.roleButtonTextSelected
                      ]}
                    />
                  ))}
                </ThemedView>
              </ThemedView>

              <ThemedView style={[styles.inputGroup, styles.checkboxContainer]}>
                <ThemedButton
                  title=""
                  onPress={() => handleInputChange('isPaidUser', !formData.isPaidUser)}
                  style={styles.checkbox}
                >
                  <ThemedView style={[
                    styles.checkboxBox,
                    formData.isPaidUser && styles.checkboxBoxChecked
                  ]}>
                    {formData.isPaidUser && (
                      <ThemedText style={styles.checkmark}>✓</ThemedText>
                    )}
                  </ThemedView>
                  <ThemedText style={styles.checkboxLabel}>Is Paid User</ThemedText>
                </ThemedButton>
              </ThemedView>

              <ThemedButton
                title="Submit"
                onPress={handleSubmit}
                style={styles.submitButton}
                textStyle={styles.submitButtonText}
              />
            </ThemedView>
          </ScrollView>
        </ThemedView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}




























































const styles = StyleSheet.create({
  safeArea: { paddingTop: 30, flex: 1, backgroundColor: Platform.OS === 'android' ? '#fff' : undefined },
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 16, paddingBottom: 40 },
  form: { gap: 20 },
  inputGroup: { gap: 8 },
  label: { fontSize: 16, color: '#000' },
  required: { color: 'red' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16 },
  roleOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  roleButton: { flex: 1, minWidth: 100, backgroundColor: '#f0f0f0', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingVertical: 10 },
  roleButtonSelected: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  roleButtonText: { color: '#333', textAlign: 'center', fontSize: 14 },
  roleButtonTextSelected: { color: 'white' },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { flexDirection: 'row', alignItems: 'center', padding: 0, backgroundColor: 'transparent' },
  checkboxBox: { width: 24, height: 24, borderWidth: 1, borderColor: '#ddd', borderRadius: 4, marginRight: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  checkboxBoxChecked: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  checkmark: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  checkboxLabel: { fontSize: 16 },
  submitButton: { backgroundColor: '#007AFF', borderRadius: 8, padding: 16, marginTop: 20 },
  submitButtonText: { color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
});
