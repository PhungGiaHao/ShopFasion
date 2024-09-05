import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {act, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'We need access to your camera to take photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};

const requestExternalStoragePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'External Storage Permission',
          message: 'We need access to your external storage to select photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};

export const useImagePicker = () => {
  const [avatarUri, setAvatarUri] = useState<string | undefined>(
    'https://i.imgur.com/1tMFzp8.png',
  );

  const showActionSheet = async () => {
    SheetManager.show('imagePickerSheet');
  };

  const handleActionSheet = async (buttonIndex: number) => {
    if (buttonIndex === 0) {
      const hasCameraPermission = await requestCameraPermission();
      if (hasCameraPermission) {
        launchCamera({mediaType: 'photo'}, response => {
          if (response.assets && response.assets.length > 0) {
            setAvatarUri(response.assets[0].uri);
            SheetManager.hide('imagePickerSheet');
          }
        });
      }
    } else if (buttonIndex === 1) {
      const hasStoragePermission = await requestExternalStoragePermission();
      if (hasStoragePermission) {
        launchImageLibrary(
          {mediaType: 'photo', selectionLimit: 1},
          response => {
            if (response.assets && response.assets.length > 0) {
              setAvatarUri(response.assets[0].uri);
            }
            SheetManager.hide('imagePickerSheet');
          },
        );
      }
    }
  };

  return {avatarUri, showActionSheet, handleActionSheet};
};
