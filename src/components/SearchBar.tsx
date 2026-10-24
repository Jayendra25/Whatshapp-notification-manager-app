import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { Colors, Radius, Spacing } from '../constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChangeText, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.iconArea}>
        <View style={styles.searchDot} />
        <View style={styles.searchHandle} />
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textDisabled}
        selectionColor={Colors.accent}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgInput,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.borderMedium,
    paddingHorizontal: Spacing.md,
    height: 44,
  },
  iconArea: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  searchDot: {
    position: 'absolute',
    top: 1,
    left: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: Colors.textMuted,
  },
  searchHandle: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 5,
    height: 1.5,
    borderRadius: 2,
    backgroundColor: Colors.textMuted,
    transform: [{ rotate: '45deg' }],
  },
  input: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 13,
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}),
  },
});
