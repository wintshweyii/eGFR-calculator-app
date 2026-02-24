import SplashScreen from '@/components/SplashScreen';
import { Redirect } from 'expo-router';
import React, { useCallback, useState } from 'react';

export default function Index() {
  const [loading, setLoading] = useState(true);

  const handleFinish = useCallback(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <SplashScreen onFinish={handleFinish} />;
  }

  return <Redirect href="/(tabs)/home" />;
}