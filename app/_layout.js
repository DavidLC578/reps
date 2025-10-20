// app/_layout.js
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="reps.db"
      onInit={async (db) => {
        await db.execAsync(
          "CREATE TABLE IF NOT EXISTS exercises (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, category TEXT NOT NULL, sets INTEGER, reps INTEGER, weight INTEGER, day TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
        );
      }}
      options={{ useNewConnection: false }}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="add-exercise"
          options={{
            presentation: "modal",
            headerShown: true,
            title: "Nuevo Ejercicio",
            headerBackTitle: "Atrás",
            headerTitleStyle: { color: "#000" },
            headerStyle: { backgroundColor: "#fff" },
          }}
        />
      </Stack>
    </SQLiteProvider>
  );
}
