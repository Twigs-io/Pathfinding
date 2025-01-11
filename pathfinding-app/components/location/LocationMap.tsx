import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapView, { Marker, Overlay, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const UCSB_BOUNDS = {
  north: 34.421496,
  south: 34.407217,
  east: -119.835660,
  west: -119.854972,
};

interface LocationMapProps {
  location: Location.LocationObject | null;
}

export function LocationMap({ location }: LocationMapProps) {
  const [mapError, setMapError] = useState<string | null>(null);

  if (mapError) {
    return (
      <View style={styles.errorContainer}>
        <Text>Map Error: {mapError}</Text>
      </View>
    );
  }

  try {
    return (
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        minZoomLevel={15}
        maxZoomLevel={19}
        onError={(error) => setMapError(error.nativeEvent.error)}
        initialRegion={{
          latitude: (UCSB_BOUNDS.north + UCSB_BOUNDS.south) / 2,
          longitude: (UCSB_BOUNDS.east + UCSB_BOUNDS.west) / 2,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Overlay 
          bounds={[
            [UCSB_BOUNDS.north, UCSB_BOUNDS.west],
            [UCSB_BOUNDS.south, UCSB_BOUNDS.east]
          ]}
          image={require('@/assets/images/ucsb-map.png')}
          opacity={0.8}
          zIndex={1}
        />
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        )}
      </MapView>
    );
  } catch (e) {
    setMapError(e.message);
    return null;
  }
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default LocationMap;