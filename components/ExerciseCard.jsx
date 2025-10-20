import { View, Text, StyleSheet, Pressable } from "react-native";
import { Check } from "./Icons";
import { useState } from "react";

export default function ExerciseCard({ exercise, index }) {
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.exerciseNumber}>Ejercicio {index + 1}</Text>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <View style={styles.details}>
          <Text>{exercise.sets} series</Text>
          <Text>{exercise.reps} repeticiones</Text>
          {exercise.weight && <Text>{exercise.weight} kg</Text>}
        </View>
      </View>
      <View style={styles.checkContainer}>
        <Pressable onPress={() => setChecked(!checked)}>
          {checked ? (
            <Check style={styles.isChecked} />
          ) : (
            <Check style={styles.check} />
          )}
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
  checkContainer: {
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
});
