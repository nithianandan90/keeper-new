import { StyleSheet, View, Pressable } from 'react-native';
import {Badge, List} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { iconStyler } from '../../services/styler';
import { useEffect } from 'react';
import { useState } from 'react';
import { badgeColorStyler } from '../../services/styler';

 


const FacilitiesItem = ({property}) => {
  
 
  const navigation = useNavigation();
  const [openTasks, setOpenTasks] = useState([]);
 
  useEffect(()=>{
    getTasks();

   
  },[])
 

  const getTasks = async () => {
    

    const allTasks = property.Tasks.items;
    
    let count = 0;

    allTasks.map((item)=>{
      
      if(item.status !=='COMPLETED' && item.active===true){
        count += 1;
      }
    })
    setOpenTasks(count);
  }
 
  const onPress=()=>{
    navigation.navigate('Property Details', {property});
    }
  
    

  

    return(
        <Pressable onPress={onPress} android_ripple={{radius:200}}>
        <List.Item
            title={property.title}
            description= {property.streetAddress}
            left={() => <List.Icon icon={({color})=>iconStyler(property?.type, 24, color)} />}
            style={{paddingTop: 50, paddingLeft: 10, borderBottomColor: '#cccccc', borderBottomWidth:1}}
            right={()=><View style={{justifyContent:'center'}}><Badge style={{backgroundColor:badgeColorStyler(openTasks)}}>{openTasks}</Badge></View>}
            />
        </Pressable>


  );
};


export default FacilitiesItem;

const styles = StyleSheet.create({
    restaurantContainer: {
      width: '100%',
      marginVertical: 10 
    },
    image: {
      width: '100%',
      aspectRatio: 5/3,
      marginBottom: 5
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 5
    },
    subtitle: {
      color: 'gray',
  
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    rating: {
        marginLeft: "auto",
        backgroundColor: 'lightgray',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
         
    }
  });
  
