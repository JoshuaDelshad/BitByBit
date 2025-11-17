import React from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';

export default function Search() {
  return (
    <View style={styles.container}>
          {/* Fixed Header */}
          <View style={styles.header}>
            <View style={styles.navbar}>
              <Text style={styles.logo}>GameStart Search</Text>
            </View>
            <TextInput
              style={styles.searchBar}
              placeholder="Search games, consoles, accessories..."
              placeholderTextColor="#ccc"
            />
          </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: '#000',
    paddingTop: 40,
    paddingBottom: 10,
    alignItems: 'center',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#111',
    width: '95%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
    searchBar: {
    width: '95%',
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginTop: 10,
  },
  logo: {
    color: '#00ffff',
    fontSize: 28,
    fontWeight: 'bold',
  }
});