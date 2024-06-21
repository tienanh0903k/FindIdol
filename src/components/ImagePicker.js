import React from "react";
import { TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
export const ImagePicker = ({ onSelectImage }) => {
  const selectImage = () => {
    let options = {
      mediaType: 'photo', // Loại file bạn muốn chọn, ví dụ như 'photo', 'video', hoặc 'mixed'
      maxWidth: 300, // Chiều rộng tối đa của hình ảnh được chọn
      maxHeight: 300, // Chiều cao tối đa của hình ảnh được chọn
      quality: 1, // Chất lượng ảnh (từ 0 đến 1)
    };

    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        onSelectImage(uri);
      }
    });
  };

  return (
    <TouchableOpacity onPress={selectImage} style={styles.button}>
      <Text style={styles.buttonText}>Chon anh</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
