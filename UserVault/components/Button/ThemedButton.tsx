import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedButtonProps = TouchableOpacityProps & {
  title: string;
  lightColor?: string;
  darkColor?: string;
  textStyle?: any;
};

export function ThemedButton({ 
  title, 
  style, 
  textStyle, 
  lightColor, 
  darkColor, 
  children,
  ...rest 
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
  const color = useThemeColor({ light: '#fff', dark: '#fff' }, 'text');
  
  return (
    <TouchableOpacity 
      style={[{ backgroundColor }, styles.button, style]} 
      {...rest}
    >
      {children || <Text style={[{ color }, styles.buttonText, textStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});