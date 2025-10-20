import { useSQLiteContext } from "expo-sqlite";
import { View, Text } from "react-native";
import { useEffect } from "react";
import { useState } from "react";

export default function Main() {
  const [exercises, setExercises] = useState([]);
  const db = useSQLiteContext();
  const loadExercises = async () => {
    const exercises = await db.getAllAsync("SELECT * FROM exercises");
    console.log(exercises);
    setExercises(exercises);
  };
  useEffect(() => {
    loadExercises();
  }, []);
  return (
    <View>
      {exercises.map((exercise) => (
        <Text key={exercise.id}>{exercise.name}</Text>
      ))}
    </View>
  );
}
