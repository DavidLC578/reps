import { View, Text, StyleSheet } from "react-native";

export default function ExerciseCard({ exercise, index }) {
  return (
    <View style={styles.container}>
      <Text style={styles.exerciseNumber}>Ejercicio {index + 1}</Text>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <View style={styles.details}>
        <Text>{exercise.sets} series</Text>
        <Text>{exercise.reps} repeticiones</Text>
        {exercise.weight && <Text>{exercise.weight} kg</Text>}
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
});
