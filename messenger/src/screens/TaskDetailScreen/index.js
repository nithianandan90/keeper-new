import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar, Button, Chip, List } from 'react-native-paper';
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import dateFormatter from '../../components/dateFormtter';
import Gallery from '../../components/imageGallery';
import Moment from 'moment';
import { Attachment } from '../../models';
import { useAuthContext } from '../../context/AuthContext';
import Uploader from './uploader';
import { graphqlOperation, API } from 'aws-amplify';
import { listNotificationsByTask } from '../../graphql/queries';
import { iconStyler } from '../../services/styler';

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

    console.log("task", JSON.stringify(task, null, 2));

    const {dbUser} = useAuthContext();

    const admin = ["MANAGER", "PARTNER"];
    
    const adminChecker = admin.some(k=>k===dbUser?.userType);  


    useEffect(()=>{
        
        getNotifications();
        
        if(adminChecker){
            navigation.setOptions({ headerRight:()=>
                <AntDesign onPress = {()=>navigation.navigate("Add Task", {property: property, task: task})} name="edit" size={24} color="gray" /> 
            });
        }
    },[])

   
    const getNotifications = async () =>{
        const results = await API.graphql(graphqlOperation(listNotificationsByTask, {taskID:task.id, sortDirection:'DESC'}));
        const fetchedNotifications = results.data.listNotificationsByTask.items;
        setLatestNotifications(fetchedNotifications[0]);
   

        const fetchedPreviousNotifications = fetchedNotifications.filter((k)=>k.id!==fetchedNotifications[0].id);

   
        setPreviousNotifications(fetchedPreviousNotifications);
    }

    

    return (

       

    <View style={styles.detailsContainer}>

                <FlatList
                    ListHeaderComponent={()=>(  
                    <View>
                             {/* 
                            <View style={styles.assignContainer}>
                                <List.Item
                                title={`Assigned To: Abu Hassan`}
                                    description = {'0123441216'}
                                right={() => <List.Icon icon={({color})=><Avatar.Image size={50} source={{uri: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"}} />} />}
                                style={{}}

                                />
                            </View> */}
                        {/* <View style={styles.statusContainer}>
                            <Text style={styles.statusText}>{task.status}</Text>
                        </View> */}
                         <Chip style={{margin: 10}} icon="information" onPress={() => console.log('Pressed')}>{task.status}</Chip>
                         <List.Item
                                title={task.title}
                                description = {task.subTitle}
                                left={() => <List.Icon icon={({color})=>iconStyler(task.taskType, 24, color)} />}
                                style={{paddingLeft: 25}}
        
                            />
                        <View style={styles.datesContainer}>
                          
                            <List.Item
                                left={()=><Text>Works Start Date:</Text>}
                                right={()=><Text>{Moment(task.startDate).format('DD MMM YYYY')} </Text>}
                                style={{paddingLeft: 10}}
                            />
                            <List.Item
                                left={()=><Text>Works Complete Date:</Text>}
                                right={()=><Text>{Moment(task.completionDate).format('DD MMM YYYY')}</Text>}
                                style={{paddingLeft: 10}}
                            />
                       </View>
                      
                       <List.Item
                                title={`${Moment(latestNotifications?.createdAt).format('DD MMM YYYY hh:mm')}`}
                                description = {latestNotifications?.updateDetails}
                                left={() => <List.Icon icon={({color})=><MaterialIcons name="update" size={24} color={'red'} />} />}
                                style={{paddingLeft: 25}}
        
                        />
                    </View>
                    )}
                    
                    style={styles.updatesContainer}
                    
                    data={previousNotifications}
                    
                    renderItem={({item})=>{
                        return (<List.Item title={Moment(item.createdAt).format('DD MMM YYYY hh:mm')} description={item.updateDetails} style={{paddingLeft:25}} left={() => <List.Icon icon={({color})=><MaterialIcons name="update" size={24} color={'grey'} />} />}/>)
                    }}
                    
                    ListFooterComponent={()=>(  
                    
                    <View style={styles.filesContainer}>
                        {task&&( 
                         <> 
                             <Button icon="file" mode="contained" onPress={()=>navigation.navigate('Files', {task})}>
                                View Files
                            </Button>
                            <Button style={{marginTop: 10}}icon="image" mode="contained" onPress={()=>navigation.navigate('Task Images', {task})}>
                                View Images
                            </Button>
                                
                            {/* <Gallery task={task}/> */}
                         </>
                         )}
                    </View>
                    )}
                />
                 
              
              {/* {adminChecker&&(
                    <Uploader taskID={task.id}/>
                )} */}
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
        fontWeight:'600',
        color:'white'
    },
    darkText: {
        fontSize:24,
        color:'black'
    },
    assignContainer:{
        width: '100%',
        padding: 10,
        margin: 10,
        // backgroundColor: '#e6e6e6',
        borderRadius: 10

    },
    datesContainer: {
        width: '100%',
        margin: 10,
        padding: 10,
        marginBottom: 10,
        // backgroundColor: '#e6e6e6',
        borderRadius: 10,
    },
    updatesContainer: {
        width: '100%',
        
      
        // backgroundColor: '#e6e6e6',
        borderRadius: 10
 
    },
    filesContainer: {
        width: '100%',
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