import Exercises from "../../components/Exercises";
import { View, StyleSheet } from "react-native";

export default function ExercisesScreen() {
  return (
    <View style={styles.container}>
      <Exercises />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
