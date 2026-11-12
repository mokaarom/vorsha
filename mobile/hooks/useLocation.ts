import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const requestLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not fetch location');
      // Default fallback coordinates: Dhaka center (23.8103° N, 90.4125° E)
      setLocation({
        coords: {
          latitude: 23.8103,
          longitude: 90.4125,
          altitude: 0,
          accuracy: 10,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp: Date.now(),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return { location, errorMsg, loading, refreshLocation: requestLocation };
}

