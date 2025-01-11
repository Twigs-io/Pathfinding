import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import { LocationMap } from '@/components/location/LocationMap';
import { SpeedTracker } from '@/components/location/SpeedTracker';
import { LocationService } from '@/services/location/LocationService';

export default function LocationScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    let subscription: Location.LocationSubscription;

    const setupLocation = async () => {
      const hasPermission = await LocationService.requestPermissions();
      if (hasPermission) {
        subscription = await LocationService.startTracking(setLocation);
      }
    };

    setupLocation();

    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <LocationMap location={location} />
      <SpeedTracker speed={location?.coords.speed || null} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});