import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import * as faceapi from 'face-api.js';
import { fetchImageFromUri, loadModels, trainingData } from '../service/faceApi';

export const FaceRecognition = ({ imageUrl }) => {
  const [recognizedName, setRecognizedName] = useState('');
  const [canvasUrl, setCanvasUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [labeledDescriptors, setLabeledDescriptors] = useState(null);

  useEffect(() => {
    const loadAllModels = async () => {
      await loadModels();
      const data = await trainingData();
      setLabeledDescriptors(data);
    };

    loadAllModels();
  }, []);

  useEffect(() => {
    const recognized = async () => {
      try {
        const image = await fetchImageFromUri(imageUrl);
        const canvas = faceapi.createCanvasFromMedia(image);

        const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();

        if (labeledDescriptors && detections.length > 0) {
          const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
          const bestMatch = faceMatcher.findBestMatch(detections[0].descriptor);
          setRecognizedName(bestMatch.toString());
        } else {
          setRecognizedName('No Face Detected');
        }

        faceapi.draw.drawDetections(canvas, detections);
        const url = canvas.toDataURL();
        setCanvasUrl(url);
      } catch (error) {
        console.error('Lỗi khi nhận diện khuôn mặt:', error);
      }
    };

    if (imageUrl && labeledDescriptors) {
      recognized(); // Gọi hàm recognized khi có imageUrl và dữ liệu đã huấn luyện
    }
  }, [imageUrl, labeledDescriptors]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : canvasUrl ? (
        <Image source={{ uri: canvasUrl }} style={styles.image} />
      ) : (
        <Text>No image selected</Text>
      )}
      <Text style={styles.name}>{recognizedName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default FaceRecognition;
