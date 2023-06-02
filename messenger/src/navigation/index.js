import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatScreen from '../screens/ChatScreen/ChatScreen';
import ContactsScreen from '../screens/ContactsScreen';
import MainTabNavigatorAdmin from './MainTabNavigatorAdmin';
import NewGroupScreen from '../screens/NewGroupScreen';
import GroupInfoScreen from '../screens/GroupInfoScreen';
import AddContactsToGroup from '../screens/AddContactsToGroupScreen';
import HomeScreen from '../screens/HomeScreen';
import PropertyDetailsScreen from '../screens/PropertyDetailsScreen.js';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import FilesScreen from '../screens/FilesScreen';
import MainTabNavigatorCli from './MainTabNavigatorCli';
import { useAuthContext } from '../context/AuthContext';
import { ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import TaskEdit from '../screens/TaskEdit';
import GridScreen from '../screens/ImageScreen';
import PropertyEdit from '../screens/PropertyEdit';


const Stack = createNativeStackNavigator();



const Navigator = () => {

  const {dbUser} = useAuthContext();
  
  const admin = ["MANAGER", "PARTNER"];
  
  const adminChecker = admin.some(k=>k===dbUser?.userType);  

  if(!dbUser)  {

    return <ActivityIndicator size={'large'}/>
  }

  return (
    <NavigationContainer>
       
      
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'whitesmoke' } }}>
        {!adminChecker?
        
          (<Stack.Screen name="HomeCli" component={MainTabNavigatorCli} options={{ headerShown: false }} />):
          (<Stack.Screen name="HomeAdmin" component={MainTabNavigatorAdmin} options={{ headerShown: false }} />)
        
        }
        
        <Stack.Screen name="HomeScreen" component={HomeScreen} />    
        <Stack.Screen name="Property Edit" component={PropertyEdit} />
        <Stack.Screen name="Task Images" component={GridScreen} /> 
        <Stack.Screen name="Home" component={MainTabNavigatorAdmin} options={{ headerShown: false }} />
        <Stack.Screen name="Files" component={FilesScreen} />        
        <Stack.Screen name="Task Details" component={TaskDetailScreen} /> 
        <Stack.Screen name="Property Details" 
          component={PropertyDetailsScreen} 
          />  
         <Stack.Screen
        name="Add Task"
        component={TaskEdit}
        />
     
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Group Info" component={GroupInfoScreen} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen name="New Group" component={NewGroupScreen} />
        <Stack.Screen name="Add Contacts" component={AddContactsToGroup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
