import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export function SpeedTracker({ speed }: { speed: number | null }) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.speedText}>
        Speed: {speed ? (speed * 3.6).toFixed(2) : '0.00'} km/h
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
  },
  speedText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});