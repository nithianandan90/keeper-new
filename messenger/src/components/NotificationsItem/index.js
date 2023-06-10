import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native';
import {Badge, List} from 'react-native-paper';
import { Foundation, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { iconStyler } from '../../services/styler';
import { useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listTasks, getTask } from '../../graphql/queries';
import { useState } from 'react';
import { badgeColorStyler } from '../../services/styler';
import moment from 'moment';
import { updateNotifications } from '../../graphql/mutations';

 


const NotificationsItem = ({notification}) => {
  
 
  const navigation = useNavigation();
  
  const [opened, setOpened] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
 
  useEffect(()=>{
   
    console.log('notification', notification);

  },[])
 

  const getTaskQuery = async () => {
    

  }
 
  const onPress= async ()=>{
    setIsLoading(true)
    
    await API.graphql(
        graphqlOperation(updateNotifications, {input:{id: notification.item.id, opened: true, _version: notification.item._version}})
    )

    navigation.navigate('Task Details', {task:notification.task});
    setIsLoading(false);    
}
  

    if(isLoading){
        return <View style={{justifyContent:'center', height: 100}}><ActivityIndicator  size={"large"} color={'#512da8'} /></View>
    }
  

    return(
        <Pressable onPress={onPress} android_ripple={{radius:200}}>
        <List.Item
            title={notification.task.title}
            descriptionNumberOfLines={2}
            description= {`${notification.item.updateDetails}`}  
            left={() => <List.Icon icon={({color})=><Entypo name="mail-with-circle" size={24} color={!notification.item.opened?('#d32f2f'):(color)} />} />}
            style={{paddingTop: 50, paddingLeft: 10, borderBottomColor: '#cccccc', borderBottomWidth:1}}
            // right={()=><View style={{justifyContent:'center'}}><Text style={{color: 'red'}}>{!notification.item.opened&&'UNOPENED'}</Text></View>}
            right={()=><View><Text>{moment(notification.item.createdAt).format('DD MMM YYYY hh:mm')}</Text></View>}
            />
        </Pressable>


  );
};


export default NotificationsItem;

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
  
