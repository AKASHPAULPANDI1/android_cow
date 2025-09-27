import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react-native';

interface Parameter {
  value: number;
  score: number;
}

interface Pose {
  id: string;
  title: string;
  score: number;
  parameters: Record<string, Parameter>;
  status: 'excellent' | 'good' | 'fair' | 'poor';
}

interface AnalysisCardProps {
  pose: Pose;
}

const STATUS_CONFIG = {
  excellent: { color: '#16a34a', icon: CheckCircle, bg: '#f0fdf4', text: 'Excellent' },
  good: { color: '#2563eb', icon: CheckCircle, bg: '#eff6ff', text: 'Good' },
  fair: { color: '#ea580c', icon: AlertCircle, bg: '#fff7ed', text: 'Fair' },
  poor: { color: '#dc2626', icon: XCircle, bg: '#fef2f2', text: 'Poor' },
};

export function AnalysisCard({ pose }: AnalysisCardProps) {
  const config = STATUS_CONFIG[pose.status];
  const StatusIcon = config.icon;

  return (
    <View style={[styles.card, { backgroundColor: config.bg }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{pose.title}</Text>
        <View style={styles.scoreContainer}>
          <Text style={[styles.score, { color: config.color }]}>{pose.score}</Text>
          <StatusIcon size={20} color={config.color} />
        </View>
      </View>

      <View style={styles.statusBadge}>
        <Text style={[styles.statusText, { color: config.color }]}>
          {config.text}
        </Text>
      </View>

      <View style={styles.parametersSection}>
        <Text style={styles.parametersTitle}>Key Parameters</Text>
        
        {Object.entries(pose.parameters).map(([name, param]) => (
          <View key={name} style={styles.parameterRow}>
            <View style={styles.parameterInfo}>
              <Text style={styles.parameterName}>{name}</Text>
              <Text style={styles.parameterValue}>
                {typeof param.value === 'number' && param.value > 100 
                  ? `${param.value}cm` 
                  : `${param.value}%`}
              </Text>
            </View>
            <View style={styles.scoreBar}>
              <View 
                style={[
                  styles.scoreBarFill, 
                  { 
                    width: `${param.score}%`,
                    backgroundColor: param.score >= 85 ? '#16a34a' : 
                                   param.score >= 70 ? '#2563eb' :
                                   param.score >= 60 ? '#ea580c' : '#dc2626'
                  }
                ]} 
              />
            </View>
            <Text style={styles.parameterScore}>{param.score}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  score: {
    fontSize: 24,
    fontWeight: '700',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  parametersSection: {
    gap: 12,
  },
  parametersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  parameterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  parameterInfo: {
    flex: 1,
  },
  parameterName: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  parameterValue: {
    fontSize: 12,
    color: '#64748b',
  },
  scoreBar: {
    width: 80,
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  parameterScore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    width: 30,
    textAlign: 'right',
  },
});