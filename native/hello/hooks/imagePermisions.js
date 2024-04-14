import * as ImagePicker from "expo-image-picker";
import React from "react";
export const useImagePermisions = () => {
  const [state, setState] = React.useState({
    gallery: false,
    camera: false,
  });

  React.useEffect(() => {
    (async () => {
      const { granted: c } = await ImagePicker.getCameraPermissionsAsync();
      const { granted: g } =
        await ImagePicker.getMediaLibraryPermissionsAsync();
      if (c) {
        setState((s) => ({ ...s, camera: c }));
      } else {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        setState((s) => ({ ...s, camera: granted }));
      }
      if (g) {
        setState((s) => ({ ...s, gallery: g }));
      } else {
        const { granted } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        setState((s) => ({ ...s, gallery: granted }));
      }
    })();
  }, []);
  return {
    ...state,
  };
};
