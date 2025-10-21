import { useSQLiteContext } from "expo-sqlite";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import ExerciseCard from "./ExerciseCard";

const getActualDay = () => {
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

export default function Main() {
  const [exercises, setExercises] = useState([]);
  const db = useSQLiteContext();
  const loadExercises = async () => {
    const exercises = await db.getAllAsync(
      "SELECT * FROM exercises WHERE day = ?",
      [getActualDay()]
    );
    setExercises(exercises);
  };
  useEffect(() => {
    loadExercises();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadExercises();
    }, [])
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ExerciseCard exercise={item} index={index} />
        )}
        ListEmptyComponent={() => <Text>No hay ejercicios</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
