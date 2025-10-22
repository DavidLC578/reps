import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";

const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

const categories = [
  "Pecho",
  "Biceps",
  "Triceps",
  "Antebrazo",
  "Hombros",
  "Espalda",
  "Abdomen",
  "Pierna",
];

export default function EditExercise({ id }) {
  const [exercise, setExercise] = useState();

  const router = useRouter();

  const db = useSQLiteContext();

  const loadExercise = async () => {
    const exercise = await db.getFirstSync(
      "SELECT * FROM exercises WHERE id = ?",
      [id]
    );
    setExercise(exercise);
  };

  const [form, setForm] = useState({
    name: "",
    category: "",
    sets: "",
    reps: "",
    weight: "",
    day: "",
  });

  useEffect(() => {
    loadExercise();
  }, [id]);

  useEffect(() => {
    if (exercise) {
      setForm({
        name: exercise.name || "",
        category: exercise.category || "",
        sets: exercise.sets ? String(exercise.sets) : "",
        reps: exercise.reps ? String(exercise.reps) : "",
        weight: exercise.weight ? String(exercise.weight) : "",
        day: exercise.day || "",
      });
    }
  }, [exercise]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const editExercise = async () => {
    try {
      if (form.name === "" || form.category === "" || form.day === "") {
        throw new Error(
          "Introduce al menos el nombre, la categoría y el día del ejercicio"
        );
      }

      await db.runAsync(
        "UPDATE exercises SET name = ?, category = ?, sets = ?, reps = ?, weight = ?, day = ? WHERE id = ?",
        [
          form.name,
          form.category,
          form.sets ? parseInt(form.sets) : null,
          form.reps ? parseInt(form.reps) : null,
          form.weight ? parseFloat(form.weight) : null,
          form.day,
          id,
        ]
      );
      alert("Ejercicio actualizado correctamente");
      router.back();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre del ejercicio</Text>
            <TextInput
              placeholder="Ej: Press de banca"
              value={form.name}
              onChangeText={(text) => handleChange("name", text)}
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Categoría</Text>
            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <Pressable
                  key={category}
                  style={[
                    styles.categoryButton,
                    form.category === category && styles.categoryButtonSelected,
                  ]}
                  onPress={() => handleChange("category", category)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      form.category === category &&
                        styles.categoryButtonTextSelected,
                    ]}
                  >
                    {category}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Series</Text>
              <TextInput
                placeholder="0"
                value={form.sets}
                onChangeText={(text) => handleChange("sets", text)}
                keyboardType="numeric"
                style={[styles.input, styles.smallInput]}
                placeholderTextColor="#999"
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
              <Text style={styles.label}>Repeticiones</Text>
              <TextInput
                placeholder="0"
                value={form.reps}
                onChangeText={(text) => handleChange("reps", text)}
                keyboardType="numeric"
                style={[styles.input, styles.smallInput]}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput
              placeholder="0"
              value={form.weight}
              onChangeText={(text) => handleChange("weight", text)}
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.daySelectorContainer}>
            <Text style={styles.label}>Día de la semana</Text>
            <View style={styles.daysContainer}>
              {daysOfWeek.map((day) => (
                <Pressable
                  key={day}
                  style={[
                    styles.dayButton,
                    form.day === day && styles.dayButtonSelected,
                  ]}
                  onPress={() => handleChange("day", day)}
                >
                  <Text
                    style={[
                      styles.dayButtonText,
                      form.day === day && styles.dayButtonTextSelected,
                    ]}
                  >
                    {day.charAt(0)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          <Pressable style={styles.saveButton} onPress={editExercise}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: "#007AFF",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#000",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
  },
  smallInput: {
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  categoryButtonSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  categoryButtonTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  daySelectorContainer: {
    marginBottom: 20,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  dayButtonSelected: {
    backgroundColor: "#007AFF",
  },
  dayButtonText: {
    fontSize: 14,
    color: "#666",
  },
  dayButtonTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
