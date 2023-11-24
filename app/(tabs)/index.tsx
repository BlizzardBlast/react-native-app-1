import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "../../components/Themed";
import Welcome from "../../components/home/Welcome";

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Welcome />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 17,
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
