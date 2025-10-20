import { Slot, Stack } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTitleStyle: {
              color: "#000",
            },
            headerTitle: "Reps",
          }}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
