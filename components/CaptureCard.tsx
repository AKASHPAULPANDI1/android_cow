import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, CheckCircle, Circle, Info } from 'lucide-react-native';

interface Pose {
  id: string;
  title: string;
  description: string;
  instructions: string;
}

interface CaptureCardProps {
  pose: Pose;
  isCompleted: boolean;
  onCapture: () => void;
  disabled?: boolean;
}

export function CaptureCard({ pose, isCompleted, onCapture, disabled }: CaptureCardProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        isCompleted && styles.completedCard,
        disabled && styles.disabledCard
      ]}
      onPress={onCapture}
      disabled={disabled}
    >
      <View style={styles.cardHeader}>
        <View style={styles.titleRow}>
          {isCompleted ? (
            <CheckCircle size={24} color="#16a34a" />
          ) : (
            <Circle size={24} color="#94a3b8" />
          )}
          <Text style={[styles.title, isCompleted && styles.completedTitle]}>
            {pose.title}
          </Text>
        </View>
        <Camera 
          size={20} 
          color={disabled ? '#cbd5e1' : isCompleted ? '#16a34a' : '#2563eb'} 
        />
      </View>
      
      <Text style={[styles.description, disabled && styles.disabledText]}>
        {pose.description}
      </Text>
      
      <View style={styles.instructionRow}>
        <Info size={16} color="#64748b" />
        <Text style={[styles.instructions, disabled && styles.disabledText]}>
          {pose.instructions}
        </Text>
      </View>
      
      {isCompleted && (
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Captured</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  completedCard: {
    borderColor: '#16a34a',
    backgroundColor: '#f0fdf4',
  },
  disabledCard: {
    opacity: 0.6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  completedTitle: {
    color: '#16a34a',
  },
  description: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 8,
    lineHeight: 20,
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 4,
  },
  instructions: {
    fontSize: 12,
    color: '#64748b',
    flex: 1,
    lineHeight: 16,
  },
  disabledText: {
    color: '#cbd5e1',
  },
  statusBadge: {
    backgroundColor: '#16a34a',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});