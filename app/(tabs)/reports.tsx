import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Header } from '@/components/Header';
import { Calendar, FileText, Filter, Search } from 'lucide-react-native';

const MOCK_REPORTS = [
  {
    id: '1',
    animalId: 'CATTLE-2024',
    date: '2024-01-15',
    overallScore: 83,
    status: 'Completed',
    breed: 'Holstein',
  },
  {
    id: '2',
    animalId: 'BUFFALO-2023',
    date: '2024-01-14',
    overallScore: 76,
    status: 'Completed',
    breed: 'Murrah',
  },
  {
    id: '3',
    animalId: 'CATTLE-2022',
    date: '2024-01-13',
    overallScore: 89,
    status: 'Completed',
    breed: 'Gir',
  },
];

interface ReportCardProps {
  report: {
    id: string;
    animalId: string;
    date: string;
    overallScore: number;
    status: string;
    breed: string;
  };
}

function ReportCard({ report }: ReportCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return '#16a34a';
    if (score >= 75) return '#2563eb';
    if (score >= 65) return '#ea580c';
    return '#dc2626';
  };

  return (
    <TouchableOpacity style={styles.reportCard}>
      <View style={styles.reportHeader}>
        <Text style={styles.animalId}>{report.animalId}</Text>
        <View style={styles.scoreContainer}>
          <Text style={[styles.score, { color: getScoreColor(report.overallScore) }]}>
            {report.overallScore}
          </Text>
        </View>
      </View>
      
      <View style={styles.reportDetails}>
        <Text style={styles.breed}>{report.breed}</Text>
        <Text style={styles.date}>{new Date(report.date).toLocaleDateString()}</Text>
      </View>
      
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>{report.status}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ReportsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <View style={styles.container}>
      <Header title="Classification Reports" />
      
      <View style={styles.content}>
        <View style={styles.filtersContainer}>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={20} color="#64748b" />
            <Text style={styles.searchText}>Search reports...</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#2563eb" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Total Reports</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>This Month</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>82</Text>
            <Text style={styles.statLabel}>Avg Score</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Reports</Text>
        
        <FlatList
          data={MOCK_REPORTS}
          renderItem={({ item }) => <ReportCard report={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.reportsList}
        />
      </View>
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
    padding: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  searchButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchText: {
    color: '#64748b',
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  reportsList: {
    gap: 12,
  },
  reportCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  animalId: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  scoreContainer: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  score: {
    fontSize: 16,
    fontWeight: '700',
  },
  reportDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  breed: {
    fontSize: 16,
    color: '#475569',
    fontWeight: '500',
  },
  date: {
    fontSize: 14,
    color: '#64748b',
  },
  statusBadge: {
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    color: '#16a34a',
    fontWeight: '600',
  },
});