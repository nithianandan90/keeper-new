import React, { useEffect, useState } from 'react'
import {View,  FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import  {AntDesign, Ionicons} from '@expo/vector-icons';
import Header from "./Header";
import { useRoute, useNavigation, useIsFocused } from '@react-navigation/native';
import TaskListItem from '../../components/taskItem';
import { API, graphqlOperation } from 'aws-amplify';
import GoToChat from '../../components/GoToChat';
import { useAuthContext } from '../../context/AuthContext';
import {  listTasksByProperty } from '../../graphql/queries';


const PropertyDetailsScreen = () => {
  
  
  const route = useRoute();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const {dbUser} = useAuthContext();

  const admin = ["MANAGER", "PARTNER"];
  
  const adminChecker = admin.some(k=>k===dbUser?.userType);  

  const navigation = useNavigation();

  const isFocused = useIsFocused();


    useEffect(()=>{
        
      
        
        getPropertyTasks();
   
         
        
        if(adminChecker){
            navigation.setOptions({ headerRight:()=>
                <View style={{flexDirection:'row'}}>
               
               <AntDesign onPress={()=>{navigation.navigate('Property User', {propertyUser:route.params.property.usersID})}} name="user" size={24} color="gray" style={{marginRight:10}}/> 
                
                <AntDesign onPress={()=>{navigation.navigate('Add Property', {property:route.params.property})}} name="edit" size={24} color="gray" /> 
                
                </View>
            });
        }

    },[isFocused])
  




const getPropertyTasks = async ()=>{
    
    setLoading(true);
    
    // const result = await API.graphql(
    //     graphqlOperation(listTasks, {filter:{propertiesID:{eq: route.params.property.id}}})
    // );

    const result = await API.graphql(
        graphqlOperation(listTasksByProperty, {propertiesID:route.params.property.id, sortDirection:'DESC', filter: {active: {eq: true}}})
    );

    
    setTasks(result.data.listTasksByProperty.items); 
   

    setLoading(false);

    
}  



  if(!dbUser || loading){
    return <ActivityIndicator size={"large"} color={'#512da8'} />
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