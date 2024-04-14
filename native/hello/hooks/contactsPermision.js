import React from "react";
import * as Contacts from "expo-contacts";

export const useContactPermision = () => {
  const [granted, setGranted] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { granted } = await Contacts.getPermissionsAsync();
      if (!granted) {
        const { granted } = await Contacts.requestPermissionsAsync();
        setGranted(granted);
      } else {
        setGranted(granted);
      }
    })();
  }, []);

  return {
    granted,
  };
};
