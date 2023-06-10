import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotImplementedScreen from '../screens/NotImplementedScreen';
import ChatsScreen from '../screens/ChatsScreen/ChatsScreen';
import { Ionicons, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import SettingsScreen from '../screens/SettingsScreen';
import TaskEdit from '../screens/TaskEdit';
import HomeScreen from '../screens/HomeScreen';
import GridScreen from '../screens/ImageScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigatorAdmin = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
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
        name="Chats"
        component={ChatsScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-chatbubbles-sharp" size={size} color={color} />
          ),
          headerRight: () => (
            <Entypo
              onPress={() => navigation.navigate('Contacts')}
              name="new-message"
              size={18}
              color={'royalblue'}
              style={{ marginRight: 15 }}
            />
          ),
        })}
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

export default MainTabNavigatorAdmin;
