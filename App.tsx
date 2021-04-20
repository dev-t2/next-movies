import React, {
  createRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import * as MediaLibrary from 'expo-media-library';
import styled from 'styled-components/native';

const StyledSafeAreaView = styled.SafeAreaView({
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

const StyledSmile = styled.Text({
  position: 'absolute',
  top: 24,
  fontSize: 16,
  color: '#fff',
  backgroundColor: '#000',
  paddingHorizontal: 24,
  paddingVertical: 8,
  borderRadius: 32,
  opacity: 0.4,
});

const StyledPressable = styled.Pressable({
  position: 'absolute',
  bottom: 32,
  backgroundColor: '#000',
  padding: 16,
  borderRadius: 64,
  opacity: 0.4,
});

const CAMERA_FRONT = Camera.Constants.Type.front;
const CAMERA_BACK = Camera.Constants.Type.back;
const FACE_DETECTOR_SETTINGS = {
  runClassifications: FaceDetector.Constants.Classifications.all,
};
const ALBUM_NAME = 'Smiling Pictures';

const App = () => {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [cameraType, setCameraType] = useState(CAMERA_FRONT);
  const [smile, setSmile] = useState(0);
  const [isSmiling, setIsSmiling] = useState(false);

  const cameraRef = createRef<Camera>();

  const name = useMemo(
    () => (cameraType === CAMERA_FRONT ? 'camera-rear' : 'camera-front'),
    [cameraType]
  );

  const requestPermissions = useCallback(async () => {
    const { status } = await Camera.requestPermissionsAsync();

    setHasPermission(status === 'granted');
  }, []);

  useEffect(() => {
    requestPermissions();
  }, [requestPermissions]);

  const savePicture = useCallback(async (uri: string) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(uri);
        const album = await MediaLibrary.getAlbumAsync(ALBUM_NAME);

        if (album) {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);
        } else {
          await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset, false);
        }

        setTimeout(() => setIsSmiling(false), 1000);
      } else {
        setHasPermission(false);
      }
    } catch (err) {
      alert(err);

      setIsSmiling(false);
    }
  }, []);

  const takePicture = useCallback(async () => {
    try {
      if (cameraRef.current) {
        const { uri } = await cameraRef.current.takePictureAsync({
          quality: 1,
        });

        if (uri) {
          savePicture(uri);
        }
      }
    } catch (err) {
      alert(err);

      setIsSmiling(false);
    }
  }, [cameraRef, savePicture]);

  const onFacesDetected = useCallback(
    ({ faces }) => {
      const probability = Math.floor((faces[0]?.smilingProbability ?? 0) * 100);

      setSmile(probability);

      if (probability >= 90) {
        setIsSmiling(true);

        takePicture();
      }
    },
    [takePicture]
  );

  const onPress = useCallback(() => {
    setCameraType(prev => (prev === CAMERA_FRONT ? CAMERA_BACK : CAMERA_FRONT));
  }, []);

  if (hasPermission === null) {
    return (
      <StyledSafeAreaView>
        <StatusBar />

        <ActivityIndicator />
      </StyledSafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <StyledSafeAreaView>
        <StatusBar />

        <StyledText>No access to Camera or Media Library</StyledText>
      </StyledSafeAreaView>
    );
  }

  return (
    <StyledSafeAreaView>
      <StatusBar />

      <StyledCamera
        ref={cameraRef}
        type={cameraType}
        faceDetectorSettings={FACE_DETECTOR_SETTINGS}
        onFacesDetected={isSmiling ? undefined : onFacesDetected}
      />

      <StyledSmile>😀 {smile}%</StyledSmile>

      <StyledPressable onPress={onPress}>
        <MaterialIcons name={name} size={40} color="#fff" />
      </StyledPressable>
    </StyledSafeAreaView>
  );
};

export default memo(App);
