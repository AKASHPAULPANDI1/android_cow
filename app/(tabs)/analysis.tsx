import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '@/components/Header';
import { AnalysisCard } from '@/components/AnalysisCard';
import { OverallScore } from '@/components/OverallScore';
import { Brain, Download, Share } from 'lucide-react-native';

const MOCK_ANALYSIS_DATA = {
  animalId: 'CATTLE-2024',
  poses: [
    {
      id: 'front',
      title: 'Front View',
      score: 85,
      parameters: {
        'Chest Width': { value: 92, score: 88 },
        'Front Legs Alignment': { value: 85, score: 82 },
        'Shoulder Structure': { value: 88, score: 85 },
      },
      status: 'excellent'
    },
    {
      id: 'rear',
      title: 'Rear View',
      score: 78,
      parameters: {
        'Rump Width': { value: 82, score: 78 },
        'Pin Bone Setting': { value: 75, score: 72 },
        'Rear Leg Set': { value: 80, score: 78 },
      },
      status: 'good'
    },
    {
      id: 'side',
      title: 'Side View',
      score: 82,
      parameters: {
        'Body Length': { value: 158, score: 85 },
        'Body Depth': { value: 89, score: 82 },
        'Back Line': { value: 78, score: 78 },
      },
      status: 'good'
    },
    {
      id: 'udder',
      title: 'Udder View',
      score: 90,
      parameters: {
        'Udder Attachment': { value: 92, score: 90 },
        'Teat Placement': { value: 88, score: 85 },
        'Udder Balance': { value: 90, score: 92 },
      },
      status: 'excellent'
    },
    {
      id: 'top',
      title: 'Top View',
      score: 75,
      parameters: {
        'Body Width': { value: 72, score: 75 },
        'Proportions': { value: 78, score: 76 },
        'Overall Balance': { value: 75, score: 74 },
      },
      status: 'fair'
    },
    {
      id: 'legs',
      title: 'Leg Set View',
      score: 88,
      parameters: {
        'Hock Angle': { value: 85, score: 88 },
        'Foot Angle': { value: 92, score: 90 },
        'Bone Quality': { value: 88, score: 86 },
      },
      status: 'excellent'
    },
  ]
};

export default function AnalysisScreen() {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    // Simulate AI analysis process
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisData(MOCK_ANALYSIS_DATA);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const overallScore = analysisData ? 
    Math.round(analysisData.poses.reduce((sum, pose) => sum + pose.score, 0) / analysisData.poses.length) : 0;

  if (isAnalyzing) {
    return (
      <View style={styles.container}>
        <Header title="AI Analysis" subtitle="Processing captured images..." />
        
        <View style={styles.loadingContainer}>
          <View style={styles.loadingSpinner}>
            <Brain size={48} color="#2563eb" />
          </View>
          <Text style={styles.loadingTitle}>Analyzing Animal Structure</Text>
          <Text style={styles.loadingText}>
            Our AI is evaluating body parameters and calculating classification scores...
          </Text>
          
          <View style={styles.progressSteps}>
            {[
              'Processing images',
              'Extracting measurements', 
              'Calculating scores',
              'Generating report'
            ].map((step, index) => (
              <View key={index} style={styles.stepRow}>
                <View style={styles.stepDot} />
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header 
        title="Analysis Results" 
        subtitle={`Animal ID: ${analysisData?.animalId}`} 
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <OverallScore score={overallScore} />
        
        <View style={styles.posesSection}>
          <Text style={styles.sectionTitle}>Pose Analysis</Text>
          
          {analysisData?.poses.map((pose) => (
            <AnalysisCard key={pose.id} pose={pose} />
          ))}
        </View>

        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Download size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>Download Report</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
            <Share size={20} color="#2563eb" />
            <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>
              Share Results
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingSpinner: {
    marginBottom: 24,
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  progressSteps: {
    gap: 12,
    alignSelf: 'stretch',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563eb',
  },
  stepText: {
    fontSize: 14,
    color: '#475569',
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
  actionsSection: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 32,
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  secondaryButtonText: {
    color: '#2563eb',
  },
});