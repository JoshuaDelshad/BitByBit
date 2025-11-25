import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';

const CartScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
      {/* Top header bar (matches Home style, but no sign-in/search) */}
      <View style={styles.header}>
              <View style={styles.navbar}>
                <Text style={styles.logo}>Your Cart</Text>
                
            </View>
      </View>

      {/* Body */}
      <View style={styles.container}>
        {/* Empty cart message */}
        <View style={styles.centerContent}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Add some games to get started!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const DARK_BG = '#000000ff';
const CARD_BG = '#101827';
const ACCENT = '#22c1dc';
const TEXT_PRIMARY = '#e5f2ff';
const TEXT_SECONDARY = '#9ca3af';
const BORDER = '#1f2937';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: DARK_BG,
  },

  // Header bar like Home (no buttons)
  headerBar: {
    backgroundColor: CARD_BG,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderColor: BORDER,
  },
  logoText: {
    color: ACCENT,
    fontSize: 22,
    fontWeight: '700',
  },
  pageTitle: {
    color: TEXT_PRIMARY,
    fontSize: 20,
    fontWeight: '600',
  },

  container: {
    flex: 1,
    backgroundColor: DARK_BG,
    paddingHorizontal: 20,
  },

  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 70, // keeps it visually above the tab bar
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 15,
    color: TEXT_SECONDARY,
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#000',
    paddingTop: 10,
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
  logo: {
    color: '#00ffff',
    fontSize: 28,
    fontWeight: 'bold',
  }
});

export default CartScreen;
