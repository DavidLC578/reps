import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { useState } from "react";
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

export default function AddExercise() {
  const db = useSQLiteContext();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    category: "",
    sets: "",
    reps: "",
    weight: "",
    day: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const saveExercise = async () => {
    try {
      if (form.name == "" || form.category == "" || form.day == "") {
        throw new Error(
          "Introduce al menos el nombre, la categoría y el día del ejercicio"
        );
      }
      await db.runAsync(
        "INSERT INTO exercises (name, category, sets, reps, weight, day) VALUES (?, ?, ?, ?, ?, ?)",
        [form.name, form.category, form.sets, form.reps, form.weight, form.day]
      );
      alert("Ejercicio guardado");
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
            <TextInput
              placeholder="Ej: Pecho"
              value={form.category}
              onChangeText={(text) => handleChange("category", text)}
              style={styles.input}
              placeholderTextColor="#999"
            />
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
          <Pressable style={styles.saveButton} onPress={saveExercise}>
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
