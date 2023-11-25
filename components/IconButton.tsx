import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ComponentProps } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
} from "react-native";
import Colors from "../constants/Colors";

interface IconButtonProps {
  icon: ComponentProps<typeof MaterialIcons>["name"];
  label: string;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
}

export default function IconButton({ icon, label, onPress }: IconButtonProps) {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    iconButton: {
      justifyContent: "center",
      alignItems: "center",
    },
    iconButtonLabel: {
      color: Colors[colorScheme ?? "light"].text,
      marginTop: 12,
    },
  });
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons
        name={icon}
        size={24}
        color={Colors[colorScheme ?? "light"].text}
      />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}
