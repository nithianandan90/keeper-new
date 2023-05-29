import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotImplementedScreen from '../screens/NotImplementedScreen';
import ChatsScreen from '../screens/ChatsScreen/ChatsScreen';
import { Ionicons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import SettingsScreen from '../screens/SettingsScreen';
import TaskEdit from '../screens/TaskEdit';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigatorAdmin = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        tabBarStyle: { backgroundColor: 'whitesmoke' },
        headerStyle: { backgroundColor: 'whitesmoke' },
      }}
    >
     
      <Tab.Screen
        name="Properties"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="house-user" size={size} color={color} />
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
        component={SettingsScreen}
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
