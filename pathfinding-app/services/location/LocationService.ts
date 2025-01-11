import * as Location from 'expo-location';

export class LocationService {
  static async requestPermissions() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  }

  static startTracking(onLocationUpdate: (location: Location.LocationObject) => void) {
    return Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 1,
        timeInterval: 1000
      },
      onLocationUpdate
    );
  }
}