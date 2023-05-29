import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FacilitiesItem from '../../components/FacilitiesItem';
import { DataStore, Auth, Hub } from 'aws-amplify';
import jsonFormat from 'json-format';
import {Properties, Task} from '../../models'
import '@azure/core-asynciterator-polyfill'; 

const HomeScreen = () => {

  const [properties, setProperties] = useState([]);
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
   
   getResult();
    // const removeListener = Hub.listen('datastore', async ({ payload }) => {
      
      

    //   if (payload.event === 'syncQueriesReady') {
    //     console.log('DataStore ready');
    //     getResult();
    //   }
    // });

    // console.log('Starting DataStore');
    // DataStore.start();

    // return () => removeListener();
  }, []);



  const getResult = async () => {
    const propertiesResult = await DataStore.query(Properties);
    
    
    // const tasks = await result.Tasks;
    
    if(propertiesResult){
      if(!Array.isArray(propertiesResult)){
        const result_array = [propertiesResult];
        
        setProperties(result_array);
        
        }else{
      
        setProperties(propertiesResult);
    
    }
  }
  }

//  useEffect(()=>{
//     getResult().then((result)=>{console.log(jsonFormat(result)); setProperties(result)});
    
//     Auth.currentAuthenticatedUser({bypassCache: true}).then((result)=>{console.log(jsonFormat(result))})

//  },[]);

  // console.log(jsonFormat(properties));

  // console.log(jsonFormat(properties));

  if(!properties){
    return <ActivityIndicator  size={"large"}/>
  }



    return (
    <View style={{flex:1, width: '100%'}}>
       <FlatList
        data={properties}
        renderItem={({item})=>{
            return (<FacilitiesItem property={item}/>)
        }}
        showsVerticalScrollIndicator={false}
       /> 

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})