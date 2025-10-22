import { View, Text, StyleSheet, FlatList } from "react-native";
import ExerciseCard from "./ExerciseCard";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { Picker } from "@react-native-picker/picker";

export default function Exercises() {
  const [selectedDay, setSelectedDay] = useState("Lunes");
  const [exercises, setExercises] = useState([]);
  const db = useSQLiteContext();

  const loadExercises = useCallback(async () => {
    const exercises = await db.getAllAsync(
      "SELECT * FROM exercises where day = ?",
      [selectedDay]
    );
    setExercises(exercises);
  }, [selectedDay]);

  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

  useFocusEffect(
    useCallback(() => {
      loadExercises();
    }, [loadExercises])
  );

  // Cuando cambie el grupo muscular del dropdown, solo actualizamos el estado
  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  return (
    <View style={styles.container}>
      {/* Dropdown de selección de dia */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Selecciona dia:</Text>
        <Picker
          selectedValue={selectedDay}
          onValueChange={handleDayChange}
          style={styles.picker}
        >
          <Picker.Item label="Lunes" value="Lunes" />
          <Picker.Item label="Martes" value="Martes" />
          <Picker.Item label="Miercoles" value="Miercoles" />
          <Picker.Item label="Jueves" value="Jueves" />
          <Picker.Item label="Viernes" value="Viernes" />
          <Picker.Item label="Sabado" value="Sabado" />
        </Picker>
      </View>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ExerciseCard
            exercise={item}
            index={index}
            onExerciseDeleted={loadExercises}
            isTicked={false}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No hay ejercicios</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  dropdownContainer: {
    marginBottom: 20,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    // Sombra para Android
    elevation: 3,
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
    color: "#333",
  },
  picker: {
    color: "#555",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 25,
    fontStyle: "italic",
    color: "#999",
    fontSize: 16,
  },
});
