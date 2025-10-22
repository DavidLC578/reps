import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function ExerciseLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="[id]"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTitle: "Detalles del ejercicio",
            headerTitleStyle: {
              color: "#000",
            },
          }}
        />
        <Stack.Screen
          name="edit/[id]"
          options={{
            headerShown: true,
            headerTitle: "Editar ejercicio",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerBackTitle: "Atrás",
            presentation: "modal",
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
