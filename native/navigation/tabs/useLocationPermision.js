import React from "react";

import * as Location from "expo-location";

export const useLocationPermision = () => {
  const [granted, setGranted] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { granted } = await Location.getForegroundPermissionsAsync();
      if (granted) {
        setGranted(granted);
      } else {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        setGranted(granted);
      }
    })();
  }, []);

  return { granted };
};
