import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotImplementedScreen from '../screens/NotImplementedScreen';
import ChatsScreen from '../screens/ChatsScreen/ChatsScreen';
import { Ionicons, Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';


const Tab = createBottomTabNavigator();

const MainTabNavigatorCli = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor:'black',
        tabBarStyle: { backgroundColor: 'whitesmoke' },
        headerStyle: { backgroundColor: 'whitesmoke' },
      }}
    >
      <Tab.Screen
        name="Properties"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="office-building-marker" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="tasks" size={size} color={color} />
          ),
        }}
      /> */}
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
