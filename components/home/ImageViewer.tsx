import { Image, ImageSourcePropType, StyleSheet } from "react-native";

interface ImageSrc {
  placeholderImageSource: ImageSourcePropType;
  selectedImage: string | null | undefined;
}

export default function ImageViewer({
  placeholderImageSource,
  selectedImage,
}: ImageSrc) {
  const imageSource = selectedImage
    ? { uri: selectedImage }
    : placeholderImageSource;
  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    flex: 0.9,
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
