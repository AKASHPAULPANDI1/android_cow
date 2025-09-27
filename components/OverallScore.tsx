import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Trophy, TrendingUp } from 'lucide-react-native';

interface OverallScoreProps {
  score: number;
}

export function OverallScore({ score }: OverallScoreProps) {
  const getScoreStatus = (score: number) => {
    if (score >= 85) return { text: 'Excellent', color: '#16a34a', bg: '#f0fdf4' };
    if (score >= 75) return { text: 'Good', color: '#2563eb', bg: '#eff6ff' };
    if (score >= 65) return { text: 'Fair', color: '#ea580c', bg: '#fff7ed' };
    return { text: 'Needs Improvement', color: '#dc2626', bg: '#fef2f2' };
  };

  const status = getScoreStatus(score);

  return (
    <View style={[styles.container, { backgroundColor: status.bg }]}>
      <View style={styles.header}>
        <Trophy size={32} color={status.color} />
        <Text style={styles.title}>Overall Classification Score</Text>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={[styles.score, { color: status.color }]}>{score}</Text>
        <Text style={styles.scoreLabel}>/ 100</Text>
      </View>

      <View style={[styles.statusBadge, { backgroundColor: status.color }]}>
        <Text style={styles.statusText}>{status.text}</Text>
      </View>

      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { 
              width: `${score}%`,
              backgroundColor: status.color
            }
          ]} 
        />
      </View>

      <View style={styles.footer}>
        <TrendingUp size={16} color={status.color} />
        <Text style={[styles.footerText, { color: status.color }]}>
          Based on 6 pose analysis
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  score: {
    fontSize: 48,
    fontWeight: '700',
  },
  scoreLabel: {
    fontSize: 24,
    color: '#64748b',
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#e2e8f0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
  },
});