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
      name="search" 
      options={{ 
        title: 'Search',
        headerShown: false, 
        }} />

        <Tabs.Screen 
      name="cart" 
      options={{ 
        title: 'Cart',
        headerShown: false, 
        }} />

        <Tabs.Screen 
      name="profile" 
      options={{ 
        title: 'Profile',
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