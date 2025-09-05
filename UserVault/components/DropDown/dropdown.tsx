import React, { useState, useEffect, useCallback } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

interface DropdownProps {
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Select a role',
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(selectedValue || null);
  const [items, setItems] = useState(
    options.map((option) => ({ label: option, value: option }))
  );



  useEffect(() => {
    setValue(selectedValue || null);
  }, [selectedValue]);


  
  const handleSetValue = useCallback(
    (callbackOrValue: string | ((prev: string | null) => string | null)) => {
      if (typeof callbackOrValue === 'function') {
        const newValue = (callbackOrValue as (prev: string | null) => string | null)(value);
        setValue(newValue);
        if (newValue) onValueChange(newValue);
      } else {
        setValue(callbackOrValue);
        if (callbackOrValue) onValueChange(callbackOrValue);
      }
    },
    [value, onValueChange]
  );

  return (
    <ThemedView style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={handleSetValue} 
        setItems={setItems}
        placeholder={placeholder}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        textStyle={styles.text}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', zIndex: 1000 },
  dropdownContainer: { width: '100%' },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 8,
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
