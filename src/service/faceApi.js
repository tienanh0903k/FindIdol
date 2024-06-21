import * as faceapi from 'face-api.js';
import axios from 'axios';

export const loadModels = async () => {
  const MODEL_URL = '/models';

  await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
};

export const fetchImageFromUri = async (uri) => {
    try {
      let response = await axios.get(uri, { responseType: 'blob' });
      return await faceapi.bufferToImage(response.data);
    } catch (error) {
      console.error('Lỗi khi fetch hình ảnh:', error);
      throw error;
    }
  };


  export const trainingData = async () => {
    const faceDescriptor = [];
    const items = [
      "Kana Morisawa",
      "Mizuki Yayoi",
      "Riho Fujimori",
    ];
    
    for (const item of items) {
      const descriptors = [];
      for (let i = 1; i <= 3; i++) {
        const image = await faceapi.fetchImage(`data/${item}/${i}.png`);
        const detection = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
        if (detection) {
          descriptors.push(detection.descriptor);
        }
      }
      if (descriptors.length > 0) {
        faceDescriptor.push(new faceapi.LabeledFaceDescriptors(item, descriptors));
      }
    }
    return faceDescriptor;
  };