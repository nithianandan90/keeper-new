import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FacilitiesItem from '../../components/FacilitiesItem';
import { DataStore, Auth, Hub, API, graphqlOperation } from 'aws-amplify';
import jsonFormat from 'json-format';
import {Properties, Task} from '../../models'
import '@azure/core-asynciterator-polyfill'; 
import { listProperties } from './queries';
import { useAuthContext } from '../../context/AuthContext';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { listUsers } from '../../graphql/queries';

const HomeScreen = () => {

  const navigation = useNavigation();
  
  const [properties, setProperties] = useState([]);
  const [tasks, setTasks] = useState([]);
  const {dbUser} = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const admin = ["MANAGER", "PARTNER"];
  
  const adminChecker = admin.some(k=>k===dbUser?.userType);  


  const isFocused = useIsFocused();
  useEffect(() => {
   
   getResult();
   if(adminChecker){
    navigation.setOptions({ headerRight:()=>
        <View style={{marginRight:10}}><MaterialIcons onPress = {()=>{navigation.navigate('Add Property')}} name="add-business" size={30} color="gray" /></View> 
    });
  }
     
  console.log('focused')

    // const removeListener = Hub.listen('datastore', async ({ payload }) => {
      
      

    //   if (payload.event === 'syncQueriesReady') {
    //     console.log('DataStore ready');
    //     getResult();
    //   }
    // });

    // console.log('Starting DataStore');
    // DataStore.start();

    // return () => removeListener();
  }, [isFocused]);



  const getResult = async () => {
    // const propertiesResult = await DataStore.query(Properties);
    
    setIsLoading(true)

    const result = await API.graphql(
      graphqlOperation(listProperties, adminChecker?({filter:{active:{eq:true}}}):({filter:{usersID:{eq:dbUser?.id}, active:{eq:true}}}))
    )    



    // const tasks = await result.Tasks;
    
    const propertiesResult = result.data.listProperties.items;

  

    if(propertiesResult){
      if(!Array.isArray(propertiesResult)){
        const result_array = [propertiesResult];
        
        setProperties(result_array);
        
        }else{
      
        setProperties(propertiesResult);
    
    }
  }
  
  setIsLoading(false);
}

//  useEffect(()=>{
//     getResult().then((result)=>{console.log(jsonFormat(result)); setProperties(result)});
    
//     Auth.currentAuthenticatedUser({bypassCache: true}).then((result)=>{console.log(jsonFormat(result))})

//  },[]);

  // console.log(jsonFormat(properties));

  // console.log(jsonFormat(properties));

  if(!properties || isLoading){
    return <ActivityIndicator  size={"large"} color={'#512da8'} />
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