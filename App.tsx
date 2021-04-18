import React, { memo, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import styled from 'styled-components/native';

const StyledView = styled.SafeAreaView({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#0984e3',
});

const StyledText = styled.Text({
  color: '#fff',
  fontSize: 24,
});

const StyledCamera = styled(Camera)({
  width: '100%',
  height: '100%',
});

const App = () => {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <StyledView>
        <ActivityIndicator />
      </StyledView>
    );
  }

  if (hasPermission === false) {
    return (
      <StyledView>
        <StyledText>No access to camera</StyledText>
      </StyledView>
    );
  }

  return (
    <StyledView>
      <StyledCamera type={Camera.Constants.Type.front} />
    </StyledView>
  );
};

export default memo(App);
