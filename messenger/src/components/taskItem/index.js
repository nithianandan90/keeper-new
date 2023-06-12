import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import {List} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { iconStyler } from '../../services/styler';


 


const TaskListItem = ({task, property}) => {

  
  const navigation = useNavigation();
  const onPress=()=>{
    navigation.navigate('Task Details', {task:task, property:property});
    }
  


    return(
        <Pressable onPress={onPress} android_ripple={{radius:200}}>
         
        <List.Item
            title={task.title}
            description= {task.subTitle}
            left={() => <List.Icon icon={({color})=>iconStyler(task.taskType, 24, color)} />}
            style={{paddingLeft: 10, borderBottomColor: '#cccccc', borderBottomWidth:1}}
            right={() => <View><Text>{task.status}</Text></View>}
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
  
