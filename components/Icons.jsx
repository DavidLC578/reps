import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";

export const Check = (props) => (
  <AntDesign name="check" size={20} color="black" {...props} />
);

export const Plus = (props) => (
  <Entypo name="plus" size={24} color="black" {...props} />
);

export const Home = (props) => (
  <AntDesign name="home" size={24} color="black" {...props} />
);

export const BarChart2 = (props) => (
  <Feather name="bar-chart-2" size={24} color="black" {...props} />
);

export const Trash = (props) => (
  <Feather name="trash-2" size={24} color="red" {...props} />
);

export const Group = (props) => (
  <MaterialCommunityIcons
    name="arm-flex-outline"
    size={24}
    color="#555"
    {...props}
  />
);
export const Set = (props) => (
  <FontAwesome6 name="arrows-rotate" size={20} color="#555" {...props} />
);

export const Reps = (props) => (
  <Ionicons name="repeat-outline" size={24} color="black" {...props} />
);

export const Weight = (props) => (
  <MaterialCommunityIcons
    name="weight-kilogram"
    size={24}
    color="black"
    {...props}
  />
);
