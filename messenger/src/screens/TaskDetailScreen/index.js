import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar, Button, List } from 'react-native-paper';
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import dateFormatter from '../../components/dateFormtter';
import Gallery from '../../components/imageGallery';
import Moment from 'moment';
import { Attachment } from '../../models';
import { useAuthContext } from '../../context/AuthContext';
import Uploader from './uploader';
import { graphqlOperation, API } from 'aws-amplify';
import { listNotificationsByTask } from '../../graphql/queries';

const TaskDetailScreen = () => {

    
    const navigation=useNavigation();
    const route = useRoute();
    const [fStartDate, setfStartDate] = useState();
    const [fCompletionDate, setfCompletionDate] = useState();
    const [showFiles, setShowFiles] = useState();
    const [latestNotifications, setLatestNotifications] = useState([]);
    const [previousNotifications, setPreviousNotifications] = useState([]);

    const task = route?.params?.task;

    const property = route?.params?.property;

  

    const {dbUser} = useAuthContext();

    const admin = ["MANAGER", "PARTNER"];
    
    const adminChecker = admin.some(k=>k===dbUser?.userType);  


    useEffect(()=>{
        
        getNotifications();
        
        navigation.setOptions({ headerRight:()=>
            <AntDesign onPress = {()=>navigation.navigate("Add Task", {property: property, task: task})} name="edit" size={24} color="gray" /> 
          });

    },[])

   
    const getNotifications = async () =>{
        const results = await API.graphql(graphqlOperation(listNotificationsByTask, {taskID:task.id, sortDirection:'ASC'}));
        const fetchedNotifications = results.data.listNotificationsByTask.items;
        setLatestNotifications(fetchedNotifications[0]);
        console.log("fetched", fetchedNotifications)

        const fetchedPreviousNotifications = fetchedNotifications.filter((k)=>k.id!==latestNotifications.id);

        setPreviousNotifications(fetchedPreviousNotifications);
    }

    

    return (

       

    <View style={styles.detailsContainer}>

      

            <View style={styles.statusContainer}>
                <Text style={styles.statusText}>{task.status}</Text>
                
                </View>
                
                <View style={styles.assignContainer}>
                
                <List.Item
                        title={`Assigned To: Abu Hassan`}
                        description = {'0123441216'}
                        right={() => <List.Icon icon={({color})=><Avatar.Image size={50} source={{uri: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"}} />} />}
                        style={{}}

                        />

            
                </View>
                <View style={styles.datesContainer}>
                <List.Item
                        left={()=><Text>Works Start Date:</Text>}
                        right={()=><Text>{Moment(task.startDate).format('d MMM YYYY')} </Text>}
                        style={{paddingLeft: 10}}
                />
                <List.Item
                        left={()=><Text>Works Complete Date:</Text>}
                        right={()=><Text>{Moment(task.completionDate).format('d MMM YYYY')}</Text>}
                        style={{paddingLeft: 10}}
                />


                </View>
                <View style={styles.updatesContainer}>
                <List.Item
                        title={task.title}
                        description = {task.subTitle}
                        left={() => <List.Icon icon={({color})=><MaterialIcons name="plumbing" size={24} color={color} />} />}
                        style={{paddingLeft: 10}}

                        />
                <List.Item
                        title={'Latest Update:'}
                        description = {latestNotifications?.updateDetails}
                        left={() => <List.Icon icon={({color})=><MaterialIcons name="update" size={24} color={'red'} />} />}
                        style={{paddingLeft: 10}}

                        />
                
                <FlatList
                    data={previousNotifications}
                    renderItem={({item})=>{
                        return (<List.Item title={item.createdAt} description={item.updateDetails} style={{paddingLeft:10}} left={() => <List.Icon icon={({color})=><MaterialIcons name="update" size={24} color={'grey'} />} />}/>)
                    }}
                    showsVerticalScrollIndicator={false}
                />

                </View>
                
                <View style={styles.filesContainer}>

                {task&&( 
                 <> 
                    
                     <Button buttonColor='grey' icon="file" mode="contained" onPress={()=>navigation.navigate('Files', {task})}>
                        View Files
                    </Button>

                    <Gallery task={task}/>
                 </>
                 )}
                
                {/* {adminChecker&&(
                    <Uploader taskID={task.id}/>
                )} */}
                            
            
            </View>
    </View>

  )
}

export default TaskDetailScreen

const styles = StyleSheet.create({
    statusContainer: {
        padding: 20,
        width:'100%',
        alignItems:'center',
        backgroundColor: '#80A46F',
        zIndex: 0.5
        
    },
    detailsContainer:{
        flex: 1,
        alignItems:'center'
    },
    statusText: {
        fontSize:20,
        color:'white'
    },
    darkText: {
        fontSize:24,
        color:'black'
    },
    assignContainer:{
        width: '90%',
        padding: 10,
        margin: 10,
        backgroundColor: '#e6e6e6',
        borderRadius: 10

    },
    datesContainer: {
        width: '90%',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#e6e6e6',
        borderRadius: 10,
    },
    updatesContainer: {
        width: '90%',
        padding: 10,
      
        backgroundColor: '#e6e6e6',
        borderRadius: 10
 
    },
    filesContainer: {
        width: '90%',
        height: 200,
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
    },  
    iconContainer: {
        position: 'absolute',
        top: 40,
        left: 10,
        zindex: 1
        
    },
})