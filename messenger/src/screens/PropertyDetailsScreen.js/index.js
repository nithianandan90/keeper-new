import React, { useEffect, useState } from 'react'
import {View, Text, Image, FlatList, StyleSheet, ActivityIndicator, Pressable} from 'react-native';
import  {Ionicons} from '@expo/vector-icons';
import Header from "./Header";
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import TaskListItem from '../../components/taskItem';
import { DataTable } from 'react-native-paper';
import {Properties, Task} from '../../models';
import { API, DataStore, graphqlOperation } from 'aws-amplify';
import jsonFormat from 'json-format';
import GoToChat from '../../components/GoToChat';
import { useAuthContext } from '../../context/AuthContext';
import { onCreateTask } from '../../graphql/subscriptions';


const PropertyDetailsScreen = () => {
  
  
  const route = useRoute();

  const [tasks, setTasks] = useState([]);

  const {dbUser} = useAuthContext();

  const admin = ["MANAGER", "PARTNER"];
  
  const adminChecker = admin.some(k=>k===dbUser?.userType);  

  const navigation = useNavigation();

  useFocusEffect(()=>{
    DataStore.query(Task, (o)=>o.propertiesID.eq(route.params.property.id)).then(setTasks)
  
    //subscibe to new tasks

    
      
})
  


  

  if(!tasks || !dbUser){
    return <ActivityIndicator size={"large"}/>
  }

  return(
    
    
    <View style = {styles.page}>
       


       <FlatList
            ListHeaderComponent={()=><Header property={route.params.property}/>}
            data={tasks}
            renderItem={({item})=> <TaskListItem task={item} property={route.params.property}/>}
            keyExtractor={item => item.id}
        />
           <View style = {styles.iconContainer}>
            {/* <Ionicons
                name="arrow-back-circle"
                size= {45}
                color= "white"
                style={styles.imageIcon}
                onPress={()=>navigation.goBack()}
            /> */}
        
        </View>
        <View style = {styles.iconContainer2}>
            {!adminChecker?
            
            (
                <GoToChat propertyID={route.params.property.id}/>
            ):
            (

                <Ionicons
                name="add-circle"
                size= {45}
                color= "black"
                style={styles.imageIcon}
                onPress={()=>{navigation.navigate('Add Task', {property:route.params.property})}}
                />

            )}            
            <View>
    
        </View>

            </View>
        
    </View>
);
}

export default PropertyDetailsScreen

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    iconContainer: {
        position: 'absolute',
        top: 40,
        left: 10,
        
    },
    iconContainer2: {
        position: 'absolute',
        top: 280,
        right: 10,
        
    },
    image: {
        width: '100%',
        aspectRatio: 5/3
    },
    title: {
        fontSize: 35,
        fontWeight: 600,
        marginVertical: 10,
        margin: 10
    },
    subtitle: {
        color: 'grey',
        fontSize: 15
    },
    container: {
        margin: 10
    },
    menuTitle: {
        marginTop: 20,
        fontSize: 18,
        letterSpacing: 0.7
    },
    button:{
        
        backgroundColor: 'black',
        marginTop: 'auto',
        padding: 20,
        alignItems: 'center'
    },
    buttonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    }

})