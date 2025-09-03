import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons'; // or any icon library

interface DropdownProps {
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export const Dropdown = ({ options, selectedValue, onValueChange, placeholder = 'Select...' }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setIsOpen(false);
  };



  
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.input} onPress={() => setIsOpen(prev => !prev)}>
        <ThemedText style={styles.text}>
          {selectedValue || placeholder}
        </ThemedText>
        <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={20} color="#333" />
      </TouchableOpacity>

      {isOpen && (
            <ThemedView style={styles.dropdown}>
                {options.map((item) => (
                <TouchableOpacity key={item} style={styles.option} onPress={() => handleSelect(item)}>
                    <ThemedText>{item}</ThemedText>
                </TouchableOpacity>
                ))}
            </ThemedView>
            )}

    </ThemedView>
  );
};



































const styles = StyleSheet.create({
  container: { width: '100%' },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  text: { fontSize: 16, color: '#333' },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: '#fff',
    maxHeight: 200,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
