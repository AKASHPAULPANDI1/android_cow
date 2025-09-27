import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Camera, RotateCcw } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CameraScreen() {
  const { poseId, pose } = useLocalSearchParams<{ poseId: string; pose: string }>();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const insets = useSafeAreaInsets();

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>Camera Permission Required</Text>
        <Text style={styles.permissionText}>
          We need access to your camera to capture animal poses for classification.
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        
        // Here you would typically save the photo and process it
        Alert.alert(
          'Photo Captured',
          `${pose} pose has been successfully captured and will be analyzed.`,
          [
            {
              text: 'OK',
              onPress: () => router.back(),
            },
          ]
        );
      } catch (error) {
        Alert.alert('Error', 'Failed to capture photo. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{pose}</Text>
        <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
          <RotateCcw size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.overlay}>
          <View style={styles.guideFrame} />
          <Text style={styles.guideText}>
            Position the animal within the frame for optimal capture
          </Text>
        </View>
      </CameraView>

      <View style={[styles.controls, { paddingBottom: insets.bottom + 20 }]}>
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureInner}>
              <Camera size={32} color="#ffffff" />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.captureHint}>Tap to capture {pose.toLowerCase()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  flipButton: {
    padding: 8,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  guideFrame: {
    width: 280,
    height: 200,
    borderWidth: 3,
    borderColor: '#ffffff',
    borderRadius: 12,
    borderStyle: 'dashed',
  },
  guideText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  controls: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingTop: 20,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  captureInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureHint: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
    opacity: 0.8,
  },
});