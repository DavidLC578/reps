import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { Check, Trash } from "./Icons";
import { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Link } from "expo-router";

export default function ExerciseCard({ exercise, index, onExerciseDeleted }) {
  const [checked, setChecked] = useState(false);
  const db = useSQLiteContext();

  const deleteExercise = (id) => {
    Alert.alert(
      "Eliminar ejercicio",
      "¿Estás seguro de que quieres eliminar este ejercicio?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              await db.runAsync("DELETE FROM exercises WHERE id = ?", [id]);
              Alert.alert("Éxito", "Ejercicio eliminado");
              if (onExerciseDeleted) onExerciseDeleted();
            } catch (error) {
              console.error(error);
              Alert.alert("Error", error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Link href={`/exercise/${exercise.id}`}>
        <View>
          <Text style={styles.exerciseNumber}>Ejercicio {index + 1}</Text>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <View style={styles.details}>
            <Text>{exercise.sets} series</Text>
            <Text>{exercise.reps} repeticiones</Text>
            {exercise.weight && <Text>{exercise.weight} kg</Text>}
          </View>
        </View>
      </Link>
      <View style={styles.actions}>
        <Pressable onPress={() => setChecked(!checked)}>
          {checked ? (
            <Check style={styles.isChecked} />
          ) : (
            <Check style={styles.check} />
          )}
        </Pressable>
        <Pressable onPress={() => deleteExercise(exercise.id)}>
          <Trash style={styles.trash} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  exerciseNumber: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  details: {
    flexDirection: "row",
    gap: 10,
    marginTop: 6,
  },
  actions: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    position: "absolute",
    right: 15,
    top: 15,
  },
  check: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 50,
    backgroundColor: "#fff",
    padding: 5,
  },
  isChecked: {
    borderWidth: 2,
    borderColor: "#607afb",
    borderRadius: 50,
    backgroundColor: "#607afb",
    padding: 5,
  },
  trash: {
    marginTop: 8,
  },
});
