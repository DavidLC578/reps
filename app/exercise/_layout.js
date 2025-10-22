import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function ExerciseLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#666",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitle: "Detalles del ejercicio",
          headerTitleStyle: {
            color: "#000",
          },
        }}
      ></Stack>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
