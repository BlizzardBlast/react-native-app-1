import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import Button from "../../components/Button";
import { View } from "../../components/Themed";
import ImageViewer from "../../components/home/ImageViewer";
import Colors from "../../constants/Colors";
import IconButton from "../../components/IconButton";
import CircleButton from "../../components/CircleButton";
import EmojiPicker from "../../components/EmojiPicker";
import EmojiList from "../../components/EmojiList";
import EmojiSticker from "../../components/EmojiSticker";

export default function Home() {
  const colorScheme = useColorScheme();
  const PlaceholderImage = require("../../assets/images/background-image.png");
  const [selectedImage, setSelectedImage] = useState<string | null | undefined>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<any>(null);
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
    // we will implement this later
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

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
        {pickedEmoji !== null ? (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
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
    </View>
  );
}
