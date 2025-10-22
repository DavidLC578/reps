import ExerciseInfo from "../../components/ExerciseInfo";
import { useLocalSearchParams } from "expo-router";

export default function ExerciseInfoScreen() {
  const params = useLocalSearchParams();
  const id = params.id;
  return <ExerciseInfo id={id} />;
}
