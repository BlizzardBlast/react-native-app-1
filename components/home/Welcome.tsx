import { StyleSheet, TextInput, useColorScheme } from "react-native";
import { Text, View } from "../Themed";
import Colors from "../../constants/Colors";

export default function Welcome() {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    userName: {
      fontSize: 16,
    },
    welcomeMessage: {
      fontSize: 18,
    },
    searchContainer: {
      // borderColor: "white",
      // borderWidth: 1,
      borderRadius: 15,
    },
    searchWrapper: {
      backgroundColor: "#e1e2e8",
      borderRadius: 15,
    },
    searchInput: {
      borderRadius: 15,
    },
  });

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello, Adrian</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput style={styles.searchInput} />
        </View>
      </View>
    </View>
  );
}
