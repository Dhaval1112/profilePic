import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

const PendingView = () => (
  <View style={styles.panding}>
    <Text style={styles.pandingText}>Loading...</Text>
  </View>
);

const App = () => {
  const [image, setImage] = useState(null);

  const takePicture = async camera => {
    try {
      const options = {quality: 0.6, base64: false};
      const data = await camera.takePictureAsync(options);
      setImage(data.uri);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {/* conditional rendering based on image is available or not */}

        {image ? (
          <View style={styles.preview}>
            <Text style={styles.camtext}>Here is your new profile pic</Text>
            <Image
              style={styles.clicked}
              source={{uri: image, width: '100%', height: '80%'}}
            />

            <Button
              title={'Click new Image'}
              onPress={() => {
                setImage(null);
              }}></Button>
          </View>
        ) : (
          <RNCamera
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'longer text to use camera',
              buttonPositive: 'OK',
              buttonNegative: 'CANCEL',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use mic',
              message: 'longer text to for mic',
              buttonPositive: 'OK',
              buttonNegative: 'CANCEL',
            }}>
            {({camera, status}) => {
              if (status !== 'READY') return <PendingView />;
              return (
                <View
                  style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    style={styles.capture}
                    onPress={() => {
                      takePicture(camera);
                    }}>
                    <Text>SNAP</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          </RNCamera>
        )}
      </View>
    </>
  );
};

export default App;

const styles = new StyleSheet.create({
  panding: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pandingText: {
    fontSize: 30,
    color: 'red',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0A79DF',
  },
  preview: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: 'orange',
    padding: 20,
    alignSelf: 'center',
  },
  camtext: {
    backgroundColor: '#3498DB',
    color: '#FFFFFF',
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 25,
  },
  clicked: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
});
