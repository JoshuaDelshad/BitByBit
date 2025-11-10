import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
      name="index" 
      options={{ 
        title: 'Home',
        headerShown: false,
       }} 
      />
      <Tabs.Screen 
      name="explore" 
      options={{ 
        title: 'Explore',
        headerShown: false, 
        }} />

      <Tabs.Screen 
      name="signIn" 
      options={{ 
        href: null,
        title: 'signIn',
        headerShown: false, 
        }} />
    </Tabs>
  );
}