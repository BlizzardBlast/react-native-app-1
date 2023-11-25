import { FontAwesome } from "@expo/vector-icons";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Colors from "../constants/Colors";
import { Text, View } from "./Themed";

interface IButton {
  label: String;
  theme?: String;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
}

export default function Button({ label, theme, onPress }: IButton) {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    buttonContainer: {
      width: 320,
      height: 68,
      marginHorizontal: 20,
      alignItems: "center",
      justifyContent: "center",
      padding: 3,
    },
    button: {
      borderRadius: 10,
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    buttonIcon: {
      paddingRight: 8,
    },
    buttonLabel: {
      fontSize: 16,
    },
  });

  if (theme === "primary") {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
        ]}
      >
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor:
                Colors[colorScheme === "light" ? "dark" : "light"].background,
            },
          ]}
          onPress={onPress}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color={Colors[colorScheme === "light" ? "dark" : "light"].text}
            style={styles.buttonIcon}
          />
          <Text
            style={[
              styles.buttonLabel,
              {
                color: Colors[colorScheme === "light" ? "dark" : "light"].text,
              },
            ]}
          >
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}
