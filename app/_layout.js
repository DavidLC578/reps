import { Slot, Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const getDayTitle = () => {
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
  const today = new Date().getDay();
  return days[today];
};

export default function Layout() {
  return (
    <SQLiteProvider
      databaseName="reps.db"
      onInit={async (db) => {
        await db.execAsync(
          "CREATE TABLE IF NOT EXISTS exercises (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, category TEXT NOT NULL, sets INTEGER, reps INTEGER, weight INTEGER,day TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
        );
      }}
      options={{ useNewConnection: false }}
    >
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
              headerTitle: getDayTitle(),
            }}
          />
        </View>
      </SafeAreaProvider>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
