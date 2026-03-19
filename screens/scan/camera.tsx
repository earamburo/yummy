// ============================================================================
// Camera Screen — "scan/camera.tsx"
// ============================================================================
// Full-screen camera viewfinder for capturing receipt photos.
// Features:
//   1. Live camera preview with alignment frame
//   2. Capture button (shutter)
//   3. Gallery picker (pick existing photo)
//   4. Flash/torch toggle for low-light receipts
//   5. Permission handling with fallback UI
//
// IMPORTANT FOR JUNIOR ENGINEERS:
// The camera does NOT work in the iOS Simulator or Android Emulator.
// You MUST test on a physical device. For development, use the
// gallery picker to test with pre-saved receipt images.
//
// Navigation flow:
//   Camera → (capture photo) → Processing → Review → Pantry
// ============================================================================

import { colors, layout, radii, typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

// // NOTE: In production, uncomment and install these:

export const CameraScreen = () => {

  const navigation = useNavigation();
  const [flashEnabled, setFlashEnabled] = useState(false);

  // ---- Permission Handling ----
  // In production, use useCameraPermissions() from expo-camera.
  // For now, we simulate with a state variable.
  const [hasPermission, setHasPermission] = useState(true);

  // ---- Capture Photo ----
  // Takes a photo using the camera, saves to cache, navigates to Processing.
  const handleCapture = async () => {
    // In production:
    // const photo = await cameraRef.current.takePictureAsync({
    //   quality: 0.8,      // Balance quality vs file size
    //   base64: false,      // We don't need base64 for ML Kit
    //   exif: false,        // Skip EXIF to reduce payload
    // });
    // router.push({ pathname: '/scan/processing', params: { imageUri: photo.uri } });

    // For development: simulate capture and navigate
    // router.push({
    //   pathname: '/scan/processing',
    //   params: { imageUri: 'simulated-capture-uri' },
    // });
    navigation.navigate('Scan', { screen: 'Processing'} );
  };

  // ---- Pick from Gallery ----
  const handleGallery = async () => {
    // In production:
    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   quality: 0.8,
    //   allowsEditing: true,  // Lets user crop to receipt
    //   aspect: [3, 5],       // Receipt-like aspect ratio
    // });
    // if (!result.canceled) {
    //   router.push({ pathname: '/scan/processing', params: { imageUri: result.assets[0].uri } });
    // }

    // For development: simulate and navigate
    // router.push({
    //   pathname: '/scan/processing',
    //   params: { imageUri: 'simulated-gallery-uri' },
    // });
  };

  // ---- Close Camera ----
  const handleClose = () => {
    // router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* ---- Camera Preview Area ---- */}
      {/* In production, replace this View with <CameraView> */}
      <View style={styles.cameraPreview}>
        {/* Close button (top-left) */}
        <Pressable
          style={styles.closeButton}
          onPress={handleClose}
          hitSlop={12}
        >
          <Ionicons name="close" size={24} color="rgba(255,255,255,0.8)" />
        </Pressable>

        {/* Flash toggle (top-right) */}
        <Pressable
          style={styles.flashButton}
          onPress={() => setFlashEnabled(!flashEnabled)}
          hitSlop={12}
        >
          <Ionicons
            name={flashEnabled ? 'flash' : 'flash-off-outline'}
            size={20}
            color="rgba(255,255,255,0.8)"
          />
        </Pressable>

        {/* Receipt alignment frame */}
        <View style={styles.alignmentFrame}>
          {/* Green scan indicator line at the top of the frame */}
          <View style={styles.scanLine} />

          {/* Helper text */}
          <View style={styles.helperTextContainer}>
            <Text style={styles.helperText}>
              Align your receipt within the frame
            </Text>
          </View>
        </View>

        {/* ---- Bottom Controls ---- */}
        <View style={styles.controlsContainer}>
          {/* Gallery button (left) */}
          <Pressable
            style={({ pressed }) => [
              styles.sideButton,
              pressed && styles.sideButtonPressed,
            ]}
            onPress={handleGallery}
            accessibilityLabel="Pick from gallery"
          >
            <Ionicons name="images-outline" size={20} color="rgba(255,255,255,0.7)" />
          </Pressable>

          {/* Shutter button (center) */}
          <Pressable
            style={({ pressed }) => [
              styles.shutterButton,
              pressed && styles.shutterPressed,
            ]}
            onPress={handleCapture}
            accessibilityLabel="Take photo"
          >
            <View style={styles.shutterInner} />
          </Pressable>

          {/* Retake / flip camera (right) */}
          <Pressable
            style={({ pressed }) => [
              styles.sideButton,
              pressed && styles.sideButtonPressed,
            ]}
            onPress={() => {
              // In production: flip camera or show recent captures
              Alert.alert('Tip', 'Use the gallery button to test with saved receipt images during development.');
            }}
            accessibilityLabel="Flip camera"
          >
            <Ionicons name="sync-outline" size={20} color="rgba(255,255,255,0.7)" />
          </Pressable>
        </View>

        {/* Control labels */}
        <View style={styles.labelsRow}>
          <Text style={styles.controlLabel}>Gallery</Text>
          <Text style={styles.controlLabel}>Capture</Text>
          <Text style={styles.controlLabel}>Retake</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A18',
  },
  cameraPreview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 36,
    height: 36,
    borderRadius: radii.full,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  flashButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: radii.full,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  alignmentFrame: {
    width: layout.camera.frameWidth,
    height: layout.camera.frameHeight,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    borderRadius: layout.camera.frameRadius,
    position: 'relative',
  },
  scanLine: {
    position: 'absolute',
    top: -1,
    left: 30,
    right: 30,
    height: 3,
    backgroundColor: colors.primary[600],
    borderRadius: 2,
  },
  helperTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  helperText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: typography.scale.bodySm.fontSize,
    textAlign: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
    marginTop: 40,
  },
  sideButton: {
    width: layout.camera.sideButtonSize,
    height: layout.camera.sideButtonSize,
    borderRadius: radii.md,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideButtonPressed: {
    opacity: 0.6,
  },
  shutterButton: {
    width: layout.camera.shutterSize,
    height: layout.camera.shutterSize,
    borderRadius: radii.full,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  shutterInner: {
    width: layout.camera.shutterInner,
    height: layout.camera.shutterInner,
    borderRadius: radii.full,
    backgroundColor: '#FFFFFF',
  },
  labelsRow: {
    flexDirection: 'row',
    gap: 40,
    marginTop: 16,
    paddingHorizontal: 20,
  },
  controlLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: typography.scale.label.fontSize,
    textAlign: 'center',
    width: 60,
  },
});
