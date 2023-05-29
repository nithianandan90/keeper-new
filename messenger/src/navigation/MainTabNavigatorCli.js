import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotImplementedScreen from '../screens/NotImplementedScreen';
import ChatsScreen from '../screens/ChatsScreen/ChatsScreen';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import ProfileScreen from '../screens/ProfileScreen';


const Tab = createBottomTabNavigator();

const MainTabNavigatorCli = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { backgroundColor: 'whitesmoke' },
        headerStyle: { backgroundColor: 'whitesmoke' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Notifications"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="tasks" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    
    </Tab.Navigator>
  );
};

export default MainTabNavigatorCli;
