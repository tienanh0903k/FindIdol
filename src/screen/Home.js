import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Image, Button } from 'react-native';
import { ImagePicker } from '../components/ImagePicker';
import { FaceRecognition } from '../components/FaceRecognition';

export const Home = () => {
  const [imageUri, setImageUri] = useState(null);

  const handleImage = (uri) => {
    setImageUri(uri);
  };

  const handleReset = () => {
    setImageUri(null); 
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <ImagePicker onSelectImage={handleImage} />
      <Button title="Reset" onPress={handleReset} />
      <FaceRecognition imageUrl={imageUri} />
      {/* {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

