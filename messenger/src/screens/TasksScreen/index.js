import React, { useEffect, useState } from 'react'
import {View, FlatList, StyleSheet, ActivityIndicator, Pressable} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import TaskListItem from '../../components/taskItem';
import { API, graphqlOperation, } from 'aws-amplify';
import { listTasks } from '../../graphql/queries';
import { useAuthContext } from '../../context/AuthContext';


const TasksScreen = () => {
  
  
  const {dbUser} = useAuthContext();

  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    // DataStore.query(Task).then(setTasks)

    getTasks();
    
  },[dbUser])
  
  const getTasks = async () =>{

    if(!dbUser){
        return;
    }

    const admin = ['MANAGER', 'PARTNER']

    let tasks = "";

    if(admin.some(item=>item===dbUser.userType)){
        tasks = await API.graphql(graphqlOperation(
            listTasks, {items:{Users:{filter:{id: {eq: dbUser.id}}}}}
        ))
    }else{
        tasks = await API.graphql(graphqlOperation(
            listTasks
        ))
    }

       setTasks(tasks.data.listTasks.items)
  }



  if(tasks.length<1){
    return <ActivityIndicator size={"large"} color={'#512da8'} />
  }

  return(
    

    
    <View style = {styles.page}>
       


       <FlatList
            data={tasks}
            renderItem={({item})=> <TaskListItem task={item}/>}
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
        
    </View>
);
}

export default TasksScreen

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