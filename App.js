import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
  StyleSheet,
  Text,
  View,
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
      <ScrollView>
        <SafeAreaView>
          <Text>Hello</Text>
        </SafeAreaView>
      </ScrollView>
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
});
