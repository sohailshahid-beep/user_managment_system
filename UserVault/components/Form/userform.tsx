import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import * as Yup from 'yup';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/commen/ThemedTextInput';
import { ThemedButton } from '@/components/Button/ThemedButton';
import { Dropdown } from '@/components/DropDown/dropdown';
import { User, UserRole, useUserStore } from '../../Context/useContext';
import { useRouter } from 'expo-router';

export interface UserFormData {
  name: string;
  phoneNumber: string;
  role: UserRole | '';
  isPaidUser: boolean;
}

interface UserFormProps {
  user?: User;
  onSuccess?: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ user, onSuccess }) => {
  const router = useRouter();
  const addUser = useUserStore((state) => state.addUser);
  const UpdateUser = useUserStore((state) => state.updateUser);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    phoneNumber: '',
    role: '',
    isPaidUser: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isPaidUser: user.isPaidUser,
      });
    }
  }, [user]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number must be numeric')
      .min(11, 'Phone number must be at least 10 digits')
      .max(11, 'Phone number must be 11 digits')
      .required('Phone number is required'),
    role: Yup.string()
      .oneOf(['Manager', 'Sales Manager', 'Admin'], 'Select a valid role')
      .required('Role is required'),
    isPaidUser: Yup.boolean(),
  });

  const handleInputChange = <K extends keyof UserFormData>(field: K, value: UserFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  const handleSubmit = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      if (!formData.role) return;

      if (user) {
        UpdateUser({
          ...user,
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          role: formData.role as UserRole,
          isPaidUser: formData.isPaidUser,
        });
      } else {
        addUser({
          id: Date.now(),
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          role: formData.role as UserRole,
          isPaidUser: formData.isPaidUser,
        });
        setFormData({ name: '', phoneNumber: '', role: '', isPaidUser: false });
      }

      if (onSuccess) onSuccess();
    } catch (err: any) {
      if (err.inner) {
        const formErrors: Record<string, string> = {};
        err.inner.forEach((e: any) => {
          if (e.path) formErrors[e.path] = e.message;
        });
        setErrors(formErrors);
      }
    }
  };

  const handleListUsers = () => {
    router.push('/Listing');
  };

  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ThemedView style={styles.form}>
   
        <ThemedView style={styles.inputGroup}>
          <ThemedText style={styles.label}>
            Name <ThemedText style={styles.required}>*</ThemedText>
          </ThemedText>
          <ThemedTextInput
            style={styles.input}
            placeholder="Enter full name"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />
          {errors.name && <ThemedText style={styles.errorText}>{errors.name}</ThemedText>}
        </ThemedView>


        <ThemedView style={styles.inputGroup}>
          <ThemedText style={styles.label}>
            Phone Number <ThemedText style={styles.required}>*</ThemedText>
          </ThemedText>
          <ThemedTextInput
            style={styles.input}
            placeholder="Enter phone number"
            value={formData.phoneNumber}
            onChangeText={(text) => handleInputChange('phoneNumber', text)}
            keyboardType="phone-pad"
          />
          {errors.phoneNumber && <ThemedText style={styles.errorText}>{errors.phoneNumber}</ThemedText>}
        </ThemedView>

   
        <ThemedView style={styles.inputGroup}>
          <ThemedText style={styles.label}>
            Role <ThemedText style={styles.required}>*</ThemedText>
          </ThemedText>
          <Dropdown
            options={['Manager', 'Sales Manager', 'Admin']}
            selectedValue={formData.role}
            onValueChange={(value) => handleInputChange('role', value as UserRole)}
            placeholder="Select Role"
          />
          {errors.role && <ThemedText style={styles.errorText}>{errors.role}</ThemedText>}
        </ThemedView>

        <ThemedView style={[styles.inputGroup, styles.checkboxContainer]}>
          <ThemedButton
            title=""
            onPress={() => handleInputChange('isPaidUser', !formData.isPaidUser)}
            style={styles.checkbox}
          >
            <ThemedView
              style={[
                styles.checkboxBox,
                formData.isPaidUser && styles.checkboxBoxChecked,
              ]}
            >
              {formData.isPaidUser && <ThemedText style={styles.checkmark}>✓</ThemedText>}
            </ThemedView>
            <ThemedText style={styles.checkboxLabel}>Is Paid User</ThemedText>
          </ThemedButton>
        </ThemedView>

        {/* Submit Button */}
        <ThemedButton
          title={user ? "Edit User" : "Add User"}
          onPress={handleSubmit}
          style={styles.submitButton}
          textStyle={styles.submitButtonText}
        />

        {/* List Users */}
        {!user && (
          <ThemedButton
            title="List Users"
            onPress={handleListUsers}
            style={[styles.submitButton, { backgroundColor: '#007AFF', marginTop: 10 }]}
            textStyle={styles.submitButtonText}
          />
        )}
      </ThemedView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: { flex: 1, padding: 16, gap: 20 },
  inputGroup: { gap: 8 },
  label: { fontSize: 16, color: '#000' },
  required: { color: 'red' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  errorText: { color: 'red', fontSize: 14 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center' },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    backgroundColor: 'transparent',
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkboxBoxChecked: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  checkmark: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  checkboxLabel: { fontSize: 16 },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
