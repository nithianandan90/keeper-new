import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {  API, graphqlOperation } from 'aws-amplify';
import '@azure/core-asynciterator-polyfill'; 
import { useAuthContext } from '../../context/AuthContext';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { listNotificationsByUser, listTasks } from '../../graphql/queries';
import NotificationsItem from '../../components/NotificationsItem';

const NotificationsScreen = () => {
   
    const [notifications, setNotifications] = useState([]);
    const {dbUser} = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
  
    
  
    const isFocused = useIsFocused();
    useEffect(() => {
     
     getResult();
   
       
  

    }, [isFocused]);
  
  
  
    const getResult = async () => {


       

      setIsLoading(true)
   


      const result = await API.graphql(
        graphqlOperation(listNotificationsByUser, {usersID:dbUser.id, sortDirection: 'DESC'})
      )    
  
        

      
      const notificationsResult = result.data.listNotificationsByUser.items;
  
      
   

  
        
        
   
      
      const taskResult = await API.graphql(
        graphqlOperation(listTasks,{filter:{usersID: {eq: dbUser.id}}})
        
        )      
        

      setNotifications([]);
    //   const filteredResults = taskResult.data.listTasks.items.map((t)=>{
        
    //     notificationsResult.map((n)=>{
            
    //         console.log(n.taskID, t.id)
            
    //         if(n.taskID===t.id){
                
    //             setNotifications(k=>[...k, {item: n, task:t}])
    //         }
    //     })

    //   })


      const filteredResults = notificationsResult.map((n)=>{
        
        taskResult.data.listTasks.items.map((t)=>{
            
            
            if(n.taskID===t.id){
                
                setNotifications(k=>[...k, {item: n, task:t}])
            }
        })

      })

            

            // await Promise.all(notificationsResult.map(async (item) =>{
                
            //     const taskResult = await API.graphql(
                    
            //         graphqlOperation(getTask, {id:item.taskID}
    
            //     ))
                
            //         setNotifications(k=>[...k, {item: item, task:taskResult.data.getTask}])
                 
            //   }))

              
      
      
    
    
    setIsLoading(false);
  }
  
  //  useEffect(()=>{
  //     getResult().then((result)=>{console.log(jsonFormat(result)); setProperties(result)});
      
  //     Auth.currentAuthenticatedUser({bypassCache: true}).then((result)=>{console.log(jsonFormat(result))})
  
  //  },[]);
  
    // console.log(jsonFormat(properties));
  
    // console.log(jsonFormat(properties));
  
    if(!notifications||isLoading){
      return <ActivityIndicator  size={"large"} color={'#512da8'} />
    }
  
  
  
      return (
      <View style={{flex:1, width: '100%'}}>
        {/* <Text>test</Text> */}
         <FlatList
          data={notifications}
          renderItem={({item})=>{
            
              return (<NotificationsItem notification={item}/>)
          }}
          showsVerticalScrollIndicator={false}
         /> 
  
      </View>
    )
}

export default NotificationsScreen

const styles = StyleSheet.create({})