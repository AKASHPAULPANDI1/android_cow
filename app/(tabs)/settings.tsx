import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Header } from '@/components/Header';
import { User, Database, Wifi, Bell, Shield, HelpCircle, LogOut } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [autoSync, setAutoSync] = React.useState(false);
  const [offlineMode, setOfflineMode] = React.useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {} }
      ]
    );
  };

  const handleDataSync = () => {
    Alert.alert('Success', 'Data synchronized successfully!');
  };

  return (
    <View style={styles.container}>
      <Header title="Settings" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <User size={24} color="#2563eb" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Profile</Text>
                <Text style={styles.settingSubtitle}>Manage your account details</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Sync</Text>
          
          <TouchableOpacity style={styles.settingRow} onPress={handleDataSync}>
            <View style={styles.settingLeft}>
              <Database size={24} color="#16a34a" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Sync Data</Text>
                <Text style={styles.settingSubtitle}>Upload pending classifications</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Wifi size={24} color="#ea580c" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Auto Sync</Text>
                <Text style={styles.settingSubtitle}>Sync when connected to WiFi</Text>
              </View>
            </View>
            <Switch
              value={autoSync}
              onValueChange={setAutoSync}
              trackColor={{ false: '#e2e8f0', true: '#2563eb' }}
              thumbColor="#ffffff"
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Shield size={24} color="#7c3aed" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Offline Mode</Text>
                <Text style={styles.settingSubtitle}>Work without internet connection</Text>
              </View>
            </View>
            <Switch
              value={offlineMode}
              onValueChange={setOfflineMode}
              trackColor={{ false: '#e2e8f0', true: '#2563eb' }}
              thumbColor="#ffffff"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Bell size={24} color="#f59e0b" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Notifications</Text>
                <Text style={styles.settingSubtitle}>Receive analysis updates</Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#e2e8f0', true: '#2563eb' }}
              thumbColor="#ffffff"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <HelpCircle size={24} color="#64748b" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Help & Support</Text>
                <Text style={styles.settingSubtitle}>Get help with the app</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={[styles.settingRow, styles.logoutRow]} onPress={handleLogout}>
            <View style={styles.settingLeft}>
              <LogOut size={24} color="#dc2626" />
              <Text style={[styles.settingTitle, { color: '#dc2626' }]}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
          <Text style={styles.footerText}>Government of India - Rashtriya Gokul Mission</Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  logoutRow: {
    borderBottomWidth: 0,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
});