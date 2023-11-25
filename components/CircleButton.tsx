import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import Colors from "../constants/Colors";

export default function CircleButton({
  onPress,
}: {
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
}) {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    circleButtonContainer: {
      width: 84,
      height: 84,
      marginHorizontal: 60,
      borderWidth: 4,
      borderColor: "#ffd33d",
      borderRadius: 42,
      padding: 3,
    },
    circleButton: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 42,
      backgroundColor:
        Colors[colorScheme === "light" ? "dark" : "light"].background,
    },
  });

  return (
    <View style={styles.circleButtonContainer}>
      <Pressable style={styles.circleButton} onPress={onPress}>
        <MaterialIcons
          name="add"
          size={38}
          color={Colors[colorScheme === "light" ? "dark" : "light"].text}
        />
      </Pressable>
    </View>
  );
}
