import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput, Modal } from 'react-native';
import { Camera, CheckCircle, Circle } from 'lucide-react-native';
import { router } from 'expo-router';
import { CaptureCard } from '@/components/CaptureCard';
import { Header } from '@/components/Header';

const POSES = [
  {
    id: 'front',
    title: 'Front View',
    description: 'Capture animal from front showing chest width, front legs alignment',
    instructions: 'Position camera at animal\'s eye level, 3-4 meters away',
  },
  {
    id: 'rear',
    title: 'Rear View',
    description: 'Capture animal from behind showing rump width, rear leg set',
    instructions: 'Position camera directly behind animal at tail level',
  },
  {
    id: 'side',
    title: 'Side View',
    description: 'Capture complete side profile showing body length, depth',
    instructions: 'Position camera perpendicular to animal showing full side profile',
  },
  {
    id: 'udder',
    title: 'Udder View',
    description: 'Capture udder from rear-side angle for udder evaluation',
    instructions: 'Position camera low to capture udder shape and teat placement',
  },
  {
    id: 'top',
    title: 'Top View',
    description: 'Capture from above showing body width and proportions',
    instructions: 'Use elevated position or drone for top-down view',
  },
  {
    id: 'legs',
    title: 'Leg Set View',
    description: 'Close-up of rear legs showing hock angle and foot angle',
    instructions: 'Focus on rear legs from side angle showing bone structure',
  },
];

export default function CaptureScreen() {
  const [capturedPoses, setCapturedPoses] = useState<Set<string>>(new Set());
  const [currentAnimal, setCurrentAnimal] = useState<string>('');
  const [showAnimalModal, setShowAnimalModal] = useState(false);
  const [animalIdInput, setAnimalIdInput] = useState('');

  const handlePoseCapture = (poseId: string) => {
    router.push({
      pathname: '/camera',
      params: { poseId, pose: POSES.find(p => p.id === poseId)?.title || '' }
    });
  };

  const handleStartNewSession = () => {
    const defaultId = `CATTLE-${Date.now().toString().slice(-4)}`;
    setAnimalIdInput(defaultId);
    setShowAnimalModal(true);
  };

  const handleConfirmNewSession = () => {
    if (animalIdInput.trim()) {
      setCurrentAnimal(animalIdInput.trim());
      setCapturedPoses(new Set());
      setShowAnimalModal(false);
      setAnimalIdInput('');
    }
  };

  const handleCancelNewSession = () => {
    setShowAnimalModal(false);
    setAnimalIdInput('');
  };

  const completedCount = capturedPoses.size;
  const progress = (completedCount / POSES.length) * 100;

  return (
    <View style={styles.container}>
      <Header title="Animal Type Classification" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sessionCard}>
          <View style={styles.sessionHeader}>
            <Text style={styles.sessionTitle}>Current Session</Text>
            <TouchableOpacity 
              style={styles.newSessionButton}
              onPress={handleStartNewSession}
            >
              <Text style={styles.newSessionText}>New Animal</Text>
            </TouchableOpacity>
          </View>
          
          {currentAnimal ? (
            <View style={styles.sessionInfo}>
              <Text style={styles.animalId}>Animal ID: {currentAnimal}</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
                <Text style={styles.progressText}>
                  {completedCount}/{POSES.length} poses captured
                </Text>
              </View>
            </View>
          ) : (
            <Text style={styles.noSessionText}>
              Start a new animal session to begin capturing poses
            </Text>
          )}
        </View>

        <View style={styles.posesSection}>
          <Text style={styles.sectionTitle}>Required Poses</Text>
          
          {POSES.map((pose) => (
            <CaptureCard
              key={pose.id}
              pose={pose}
              isCompleted={capturedPoses.has(pose.id)}
              onCapture={() => handlePoseCapture(pose.id)}
              disabled={!currentAnimal}
            />
          ))}
        </View>

        {currentAnimal && completedCount === POSES.length && (
          <TouchableOpacity 
            style={styles.analyzeButton}
            onPress={() => router.push('/analysis')}
          >
            <Text style={styles.analyzeButtonText}>Start Analysis</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <Modal
        visible={showAnimalModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelNewSession}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Animal Session</Text>
            <Text style={styles.modalSubtitle}>Enter Animal ID or Tag Number:</Text>
            
            <TextInput
              style={styles.modalInput}
              value={animalIdInput}
              onChangeText={setAnimalIdInput}
              placeholder="Animal ID"
              autoFocus={true}
              selectTextOnFocus={true}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={handleCancelNewSession}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]} 
                onPress={handleConfirmNewSession}
              >
                <Text style={styles.confirmButtonText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
  },
  sessionCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  newSessionButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  newSessionText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  sessionInfo: {
    gap: 12,
  },
  animalId: {
    fontSize: 16,
    color: '#475569',
    fontWeight: '600',
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#16a34a',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  noSessionText: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  posesSection: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  analyzeButton: {
    backgroundColor: '#16a34a',
    marginHorizontal: 16,
    marginVertical: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  analyzeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 24,
    backgroundColor: '#f8fafc',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  confirmButton: {
    backgroundColor: '#2563eb',
  },
  cancelButtonText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});