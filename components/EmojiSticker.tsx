import { DimensionValue, ImageSourcePropType } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface EmojiStickerProps {
  imageSize: DimensionValue | undefined;
  stickerSource: ImageSourcePropType;
  imageContainerSize: {
    width: number;
    height: number;
  };
}

export default function EmojiSticker({
  imageSize,
  stickerSource,
  imageContainerSize,
}: EmojiStickerProps) {
  const scaleImage = useSharedValue(imageSize);
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== (imageSize as number) * 2) {
        scaleImage.value = (scaleImage.value as number) * 2;
      }
    });
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value as number),
      height: withSpring(scaleImage.value as number),
    };
  });

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const drag = Gesture.Pan().onChange((event) => {
    if (
      translateX.value + event.changeX >= 0 &&
      translateX.value + event.changeX < imageContainerSize.width - 45
    ) {
      translateX.value += event.changeX;
    }
    if (
      translateY.value + event.changeY >= 0 &&
      translateY.value + event.changeY < imageContainerSize.height - 45
    ) {
      translateY.value += event.changeY;
    }
  });
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={drag}>
      <Animated.View
        style={[containerStyle, { top: 60, position: "absolute", left: 0 }]}
      >
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
