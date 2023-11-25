import { View, Image, ImageSourcePropType, DimensionValue } from "react-native";

interface EmojiStickerProps {
  imageSize: DimensionValue | undefined;
  stickerSource: ImageSourcePropType;
}

export default function EmojiSticker({
  imageSize,
  stickerSource,
}: EmojiStickerProps) {
  return (
    <View style={{ top: -350 }}>
      <Image
        source={stickerSource}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
}
