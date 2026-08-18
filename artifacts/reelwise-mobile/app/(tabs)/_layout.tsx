import React from 'react';
import { Platform, StyleSheet, useColorScheme, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Tabs } from 'expo-router';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { SymbolView } from 'expo-symbols';
function NativeTabLayout() { return <NativeTabs><NativeTabs.Trigger name="index"><Icon sf={{ default: 'play.rectangle', selected: 'play.rectangle.fill' }} /><Label>Feed</Label></NativeTabs.Trigger><NativeTabs.Trigger name="signals"><Icon sf={{ default: 'waveform.path.ecg', selected: 'waveform.path.ecg.rectangle.fill' }} /><Label>Signals</Label></NativeTabs.Trigger></NativeTabs>; }
function ClassicTabLayout() {
  const colors = useColors(); const colorScheme = useColorScheme(); const isDark = colorScheme === 'dark'; const isIOS = Platform.OS === 'ios'; const isWeb = Platform.OS === 'web';
  return <Tabs screenOptions={{ tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.mutedForeground, headerShown: false, tabBarStyle: { position: 'absolute', backgroundColor: isIOS ? 'transparent' : colors.background, borderTopWidth: isWeb ? 1 : 0, borderTopColor: colors.border, elevation: 0, ...(isWeb ? { height: 84 } : {}) }, tabBarBackground: () => isIOS ? <BlurView intensity={100} tint={isDark ? 'dark' : 'light'} style={StyleSheet.absoluteFill} /> : isWeb ? <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.background }]} /> : null }}>
    <Tabs.Screen name="index" options={{ title: 'Feed', tabBarIcon: ({ color }) => isIOS ? <SymbolView name="play.rectangle" tintColor={color} size={24} /> : <Feather name="play" size={22} color={color} /> }} />
    <Tabs.Screen name="signals" options={{ title: 'Signals', tabBarIcon: ({ color }) => isIOS ? <SymbolView name="waveform.path.ecg" tintColor={color} size={24} /> : <Feather name="activity" size={22} color={color} /> }} />
  </Tabs>;
}
export default function TabLayout() { return isLiquidGlassAvailable() ? <NativeTabLayout /> : <ClassicTabLayout />; }
