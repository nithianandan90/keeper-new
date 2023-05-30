import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import {List} from 'react-native-paper';
import { Foundation, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


 


const TaskListItem = ({task, property}) => {

  
  const navigation = useNavigation();
  const onPress=()=>{
    navigation.navigate('Task Details', {task:task, property:property});
    }
  
    const typeToIcon = {
        ['Commercial']:'building',
        ['Residential']:'house-user'
    }  


    return(
        <Pressable onPress={onPress} android_ripple={{radius:200}}>
         
        <List.Item
            title={task.title}
            description= {task.status}
            left={() => <List.Icon icon={({color})=><FontAwesome5 name={'building'} size={24} color={color}/>} />}
            style={{paddingLeft: 10, borderBottomColor: 'grey', borderBottomWidth:1}}
            right={() => <View><Text>Ongoing</Text></View>}
            />
        </Pressable>

    // <Pressable onPress = {onPress} style = {styles.restaurantContainer}>
    //     <Image 
    //         source = {{
    //             uri: facility.image.startsWith('http') ? facility.image : DEFAULT_IMAGE
    //             }} 
    //         style = {styles.image}/>
    //     <View style={styles.row}> 
    //         <View>
    //             <Text style = {styles.title}>{facility.name}</Text>
    //         </View>
    //         <View>
    //             <Text style = {styles.subtitle}>{facility.addressStreet}</Text>
    //            </View>

    //     </View>
    // </Pressable>
  );
};


export default TaskListItem;

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
  
