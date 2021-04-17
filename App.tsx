import React, { memo, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Camera } from 'expo-camera';

const App = () => {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <ActivityIndicator />;
  }

  if (hasPermission === false) {
    return (
      <View>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Access to camera</Text>
    </View>
  );
};

export default memo(App);
