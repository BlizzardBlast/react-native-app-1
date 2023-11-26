import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { Platform, StyleSheet, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Button from "../../components/Button";
import CircleButton from "../../components/CircleButton";
import EmojiList from "../../components/EmojiList";
import EmojiPicker from "../../components/EmojiPicker";
import EmojiSticker from "../../components/EmojiSticker";
import IconButton from "../../components/IconButton";
import { View } from "../../components/Themed";
import ImageViewer from "../../components/home/ImageViewer";
import Colors from "../../constants/Colors";
import { captureRef } from "react-native-view-shot";
import domtoimage from "dom-to-image";

export default function Home() {
  const colorScheme = useColorScheme();
  const imageRef = useRef();
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const PlaceholderImage = require("../../assets/images/background-image.png");
  const [selectedImage, setSelectedImage] = useState<string | null | undefined>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<any>(null);
  const [elementCoordinates, setElementCoordinates] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };
  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        if (imageRef.current) {
          const dataUrl = await domtoimage.toJpeg(imageRef.current, {
            quality: 0.95,
            width: 320,
            height: 440,
          });
          let link = document.createElement("a");
          link.download = "sticker-smash.jpeg";
          link.href = dataUrl;
          link.click();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      color: "white",
      backgroundColor: Colors[colorScheme ?? "light"].background,
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
    },
    imageContainer: {
      flex: 1,
      paddingTop: 58,
    },
    footerContainer: {
      // flex: 1 / 3,
      height: 150,
      alignItems: "center",
      justifyContent: "center",
    },
    optionsContainer: {
      // position: "absolute",
      // bottom: 80,
      height: 150,
      justifyContent: "center",
      alignItems: "center",
    },
    optionsRow: {
      alignItems: "center",
      flexDirection: "row",
    },
  });

  if (status === null) {
    requestPermission();
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View ref={imageRef} collapsable={false} style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
          setElementCoordinates={setElementCoordinates}
        />
        {pickedEmoji !== null ? (
          <EmojiSticker
            imageSize={40}
            stickerSource={pickedEmoji}
            imageContainerSize={elementCoordinates}
          />
        ) : null}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme={"primary"}
            label="Choose a photo"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
