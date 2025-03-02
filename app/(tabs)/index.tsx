import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Platform, View, Text, StatusBar } from 'react-native';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [currentTime, setCurrentTime] = useState('');
  const [amPm, setAmPm] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // Load custom font
  const [fontsLoaded] = useFonts({
    'Digital-7': require('@/assets/fonts/digital-7.monoitalic.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // Set and lock screen orientation to landscape
  useEffect(() => {
    lockAsync(OrientationLock.LANDSCAPE);
  }, []);

  // Update time and date every second
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();

      // Format hours for 12-hour clock
      let hours = date.getHours();
      const isPM = hours >= 12;
      hours = hours % 12;
      hours = hours ? hours : 12; // Convert 0 to 12

      // Format minutes with leading zero
      const minutes = date.getMinutes().toString().padStart(2, '0');

      // Format seconds with leading zero
      const seconds = date.getSeconds().toString().padStart(2, '0');

      // Set the time and AM/PM
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
      setAmPm(isPM ? 'PM' : 'AM');

      // Format day, date, month, and year
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const day = days[date.getDay()];
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      const dayOfMonth = date.getDate().toString().padStart(2, '0');

      // Set the date
      setCurrentDate(`${day}, ${month} ${dayOfMonth}, ${year}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{currentTime}</Text>
        <Text style={styles.amPmText}>{amPm}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  timeText: {
    fontSize: 120,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontVariant: ['tabular-nums'],
    fontFamily: 'Digital-7',
  },
  amPmText: {
    fontSize: 40,
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
    fontFamily: 'Digital-7',
  },
  dateContainer: {
    marginTop: 20,
  },
  dateText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Digital-7',
  },
});
