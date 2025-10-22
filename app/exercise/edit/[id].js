import { useLocalSearchParams } from "expo-router";
import EditExercise from "../../../components/Edit-exercise";

export default function EditExerciseScreen() {
  const params = useLocalSearchParams();
  const id = params.id;
  return <EditExercise id={id} />;
}
