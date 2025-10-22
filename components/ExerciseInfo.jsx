import { Text, View, StyleSheet, Pressable } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useState, useEffect, useCallback } from "react";
import { Group, Reps, Set, Weight } from "./Icons";
import { Link } from "expo-router";
import { useFocusEffect } from "expo-router";

export default function ExerciseInfo({ id }) {
  const [exercise, setExercise] = useState();

  const db = useSQLiteContext();

  const loadExercise = async () => {
    const exercise = await db.getFirstSync(
      "SELECT * FROM exercises WHERE id = ?",
      [id]
    );
    setExercise(exercise);
  };

  useEffect(() => {
    loadExercise();
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      loadExercise();
    }, [id])
  );

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>{exercise?.name}</Text>

      <View style={{ gap: 15 }}>
        {/* Grupo */}
        <View style={styles.details}>
          <View style={styles.detailsItem}>
            <Group />
            <Text style={styles.subtitle}>Grupo</Text>
          </View>
          <Text style={styles.item}>{exercise?.category}</Text>
        </View>

        {/* Series y Reps */}
        <View style={styles.row}>
          <View style={[styles.details, { flex: 1 }]}>
            <View style={styles.detailsItem}>
              <Set />
              <Text style={styles.subtitle}>Series</Text>
            </View>
            <Text style={styles.item}>{exercise?.sets}</Text>
          </View>

          <View style={[styles.details, { flex: 1 }]}>
            <View style={styles.detailsItem}>
              <Reps />
              <Text style={styles.subtitle}>Reps</Text>
            </View>
            <Text style={styles.item}>{exercise?.reps}</Text>
          </View>
        </View>

        {/* Peso */}
        {exercise?.weight && (
          <View style={styles.details}>
            <View style={styles.detailsItem}>
              <Weight />
              <Text style={styles.subtitle}>Peso</Text>
            </View>
            <Text style={styles.item}>{exercise?.weight} kg</Text>
          </View>
        )}

        {/* Botón de Editar */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Link href={`/exercise/edit/${exercise?.id}`} asChild>
              <Text style={styles.buttonText}>Editar Ejercicio</Text>
            </Link>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  item: {
    fontSize: 20,
    fontWeight: "bold",
  },
  details: {
    backgroundColor: "#eee",
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 9,
    gap: 10,
  },
  detailsItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 15,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 12,
    overflow: "hidden",
  },

  button: {
    backgroundColor: "#353535",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },

  buttonPressed: {
    opacity: 0.9,
  },

  buttonText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});
