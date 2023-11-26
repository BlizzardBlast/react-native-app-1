import { useEffect, useRef, useState } from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";

interface ImageSrc {
  placeholderImageSource: ImageSourcePropType;
  selectedImage: string | null | undefined;
  setElementCoordinates: React.Dispatch<
    React.SetStateAction<{
      width: number;
      height: number;
    }>
  >;
}

export default function ImageViewer({
  placeholderImageSource,
  selectedImage,
  setElementCoordinates,
}: ImageSrc) {
  const onLayoutHandler = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setElementCoordinates({ width, height });
  };

  const imageSource = selectedImage
    ? { uri: selectedImage }
    : placeholderImageSource;
  return (
    <Image
      onLayout={onLayoutHandler}
      source={imageSource}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 0.9,
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
