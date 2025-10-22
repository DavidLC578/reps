import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Plus, Home, BarChart2 } from "../../components/Icons";
import { Link } from "expo-router";

const getDayTitle = () => {
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
  return days[new Date().getDay()];
};

export default function TabsLayout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#999",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitleStyle: {
            color: "#000",
          },
          headerTitle: getDayTitle(),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Inicio",
            tabBarIcon: ({ color }) => <Home color={color} />,
            headerRight: () => (
              <Link href="/add-exercise" style={{ marginRight: 15 }}>
                <Plus />
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="progress"
          options={{
            title: "Progreso",
            tabBarIcon: ({ color }) => <BarChart2 color={color} />,
          }}
        />
        <Tabs.Screen
          name="exercises"
          options={{
            title: "Ejercicios",
            tabBarIcon: ({ color }) => <BarChart2 color={color} />,
            headerTitle: "Mis Ejercicios",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
