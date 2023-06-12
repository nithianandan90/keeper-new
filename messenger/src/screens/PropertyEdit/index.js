import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text,  Pressable, ActivityIndicator, FlatList, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {getFileInfo, pickImage, addAttachmentProperty} from '../../services/uploaderService';
import { Button, Chip, List, RadioButton, Snackbar } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify';
import { createProperties,  updateProperties,  } from '../../graphql/mutations';
import { listUsers } from '../../graphql/queries';


// const userData = [
//   { label: 'User 1', value: '7e8b9a0f-fee3-40ea-a090-cbbc8b2c60d1' },
//   { label: 'User 2', value: 'cb6ab0b9-4712-4e2c-a722-fd288a226896' },
//   { label: 'User 3', value: 'User 3' },
//   { label: 'User 4', value: 'User 4' },
//   { label: 'User 5', value: 'User 5' },
// ];

const TaskEdit = () => {
  const [title, setTitle] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState(''); 
  const [state, setState] = useState('');
  const [headerPic, setHeaderPic] = useState('');
  const [type, setType] = useState('');
  const [physicalAccess, setPhysicalAccess] = useState(false);
  const [status, setStatus] = useState(false);
  const [userID, setUserID] = useState(false);
  const [image, setImage] = useState(false);
  const [userData, setUserData] = useState([]);
  const [sbVisible, setSbVisible] = useState(false);
  const [sbMessage, setSbMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 
  const [isPropertyOpen, setPropertyOpen] = useState(false);
    

  const route = useRoute();

  const navigation = useNavigation();

  const existingProperty = route?.params?.property;
  

  useEffect(()=>{
   
    getUserData();
    
    if(existingProperty){
      navigation.setOptions({title: 'Edit Property' })
      setUserID(existingProperty.usersID);
      setPostcode(existingProperty.postcode.toString());
      setTitle(existingProperty.title);
      setStreetAddress(existingProperty.streetAddress);
     
      setCity(existingProperty.city);
      setState(existingProperty.state);
      setType(existingProperty.type);
      setStatus(existingProperty.status)

    }
    


  },[]);



  const getUserData = async ()=>{
    
    setIsLoading(true);
    const results = await API.graphql(
      graphqlOperation(listUsers)
      )
   const fetchedUsers = results.data.listUsers.items;
   
   const data = fetchedUsers.map((item)=>{
    
   

    setUserData(k=>[...k, {label: item.email, value: item.id}]);
   
  })

   setIsLoading(false);

  }


  const togglePropertyDropdown = () => {
    setPropertyOpen(!isPropertyOpen);
  };
 







//Upload Functions

const imagePicker = async ()=>{

  const results = await pickImage();

  if (results.cancelled){
    return
  }

  const fileInfo = await getFileInfo(results.uri);

  if (fileInfo.size>26000000){
    setSbVisible(true);
    setSbMessage("Image size exceeds 25 mb");
    return;
  }

    
    setImage(results);
    
    
}

  const showDeleteConfirm = async () =>{
  
  
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this property?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: async () => {
            await API.graphql(graphqlOperation(updateProperties, {input:{id:existingProperty.id, active:false, _version:existingProperty._version}}));
            navigation.navigate('HomeScreen');
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  }

  const handleSubmit = async () => {
    // Perform form submission logic here
    // You can access the form values from the component's state
    
    
    const submitData = [title, streetAddress, postcode, city, state, type, status, userID];

    
    if(submitData.some(k=>k==='')){
      setSbVisible(true);
      setSbMessage("Fill in all required fields")
      return;
    }
    


    const newProperty = {
      title: title, 
      streetAddress: streetAddress,
      postcode: postcode,
      active: true,
      city: city,
      state: state,
      type: type,
      status: status,
      usersID: userID

    }

  

    setIsLoading(true);

    let propertyID="";
    
   if(existingProperty){

    const updatedProperty = await API.graphql(
      graphqlOperation(updateProperties, {input: {id: existingProperty.id, _version: existingProperty._version, ...newProperty}} )
      )

 
      
    // if(latestUpdate){
    //   const taskUpdate = await API.graphql(
        
    //     graphqlOperation(createNotifications, {input:{taskID: existingTask.id, updateDetails: latestUpdate}}))
    // }

       propertyID = existingProperty.id;

   }else{
    
    const returnedNewProperty = await API.graphql(
        graphqlOperation(createProperties, {input: newProperty})
      )
      propertyID = (returnedNewProperty.data.createProperties.id);
    }
    
    if(image){
    const attachment = await addAttachmentProperty(image, propertyID);
    }



   setIsLoading(false);

   navigation.navigate('HomeScreen');

//     //for each image and document, create a new attachment

//     const imageUpload = await Promise.all (images.map(async (image)=>{
//       const attachment = await addAttachment(image, taskID);
//     }))
    
//     const documentUpload = await Promise.all (documents.map(async (document)=>{
//       const attachment = await addAttachment(document, taskID);
//     }));

//     setIsLoading(false);

//     // console.warn('completed');
 

//     // navigation.navigate('Property Details', {property})
  
    

  };

  
 if(isLoading){
  return <ActivityIndicator size={'large'} color={'#512da8'} />
 }

  // console.log("documents", documents);

  return (
    <View style={{flexDirection:'column'}}>
               
    
        <FlatList
          keyboardShouldPersistTaps="always"
          ListHeaderComponent={ <View nestedScrollEnabled={false} style={styles.container}>
          
          {existingProperty&&
          <Text style={{paddingHorizontal:12, marginBottom:10, fontSize:20}}>{existingProperty?.title}, {existingProperty?.streetAddress}, {existingProperty?.postcode}, {existingProperty?.state} </Text>
          }
          <View style={styles.formField}>
    
          {/* {property&&(  
                <Text style={{paddingHorizontal:12, marginBottom:10, fontSize:20}}>{property?.title}, {property?.streetAddress}, {property?.postcode}, {property?.state} </Text>
            )}   */}
        
        
          
        <DropDownPicker
        placeholder="Select a user"
        items={userData}
        searchable={true}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        itemStyle={styles.dropdownItem}
        dropDownStyle={styles.dropdown}
        value={userID}
        setValue={setUserID}
        open={isPropertyOpen}
        setOpen={togglePropertyDropdown}
        
      />  
    
        <Text style={{paddingHorizontal:12, marginBottom:10, fontSize:15, marginTop: 20, fontWeight:'600'}}>Property Type*:</Text>  
        <RadioButton.Group  onValueChange={newValue => setType(newValue)} value={type}>
          <View style = {{paddingHorizontal:5, flexDirection:'row', alignItems:'center'}}>
            <RadioButton value="Residential" />
            <Text>Residential</Text>
             </View>
          <View style = {{paddingHorizontal:5, flexDirection:'row', alignItems:'center'}}>
            <RadioButton value="Commercial" />
            <Text>Commercial</Text>
          </View>
          <View style = {{paddingHorizontal:5, flexDirection:'row', alignItems:'center'}}>
            <RadioButton value="Industrial" />
            <Text>Industrial</Text>
          </View>
        </RadioButton.Group>
    
        
        <Text style={{paddingHorizontal:12, marginBottom:10, fontSize:15, marginTop: 20, fontWeight:'600'}}>Property Status*:</Text>  
        <RadioButton.Group onValueChange={newValue => setStatus(newValue)} value={status}>
          <View style = {{paddingHorizontal:5, flexDirection:'row', alignItems:'center'}}>
            <RadioButton value="OWNER-OCCUPPIED" />
            <Text>Owner-occuppied</Text>
             </View>
          <View style = {{paddingHorizontal:5, flexDirection:'row', alignItems:'center'}}>
            <RadioButton value="TENANTED" />
            <Text>Tenanted</Text>
          </View>
          <View style = {{paddingHorizontal:5, flexDirection:'row', alignItems:'center'}}>
            <RadioButton value="VACANT" />
            <Text>Vacant</Text>
          </View>
        </RadioButton.Group>
            
        <TextInput
            placeholder="Title*"
            value={title}
            onChangeText={(t)=>setTitle(t)}
            style={styles.input}
          />    

        <TextInput
            placeholder="Street Address*"
            value={streetAddress}
            onChangeText={(t)=>setStreetAddress(t)}
            style={styles.input}
          />    
    
        <TextInput
            placeholder="Postcode*"
            value={postcode}
            onChangeText={(t)=>setPostcode(t)}
            style={styles.input}
          />
        <TextInput
            placeholder="City*"
            value={city}
            onChangeText={(t)=>setCity(t)}
            style={styles.input}
          />
    
        <TextInput
            placeholder="State*"
            value={state}
            onChangeText={(t)=>setState(t)}
            style={styles.input}
          />
          
          {image&&
          
             <List.Item
            title={(image.uri?.split('/').pop())}
            
            left={props => <List.Icon {...props} icon="image" />}
            
            right={props => <Pressable onPress={()=>{setImage('')}}><List.Icon {...props} icon="delete"/></Pressable>}
            />  
       
            }   
        
        <Chip icon="upload" onPress={imagePicker} style={{width:200, alignSelf:'center', margin: 10,}}>Upload Image</Chip> 
          
        <Button style={{marginTop: 20, marginBottom: 10}} buttonColor='#805158' icon="airplane" mode="contained" onPress={handleSubmit}>
                            Submit
        </Button>

        {existingProperty&&(<Button buttonColor='#665a6f' icon="delete" mode="contained" onPress={showDeleteConfirm}>Delete Property</Button>)}

          {/* 
    
          <TextInput
            placeholder="Task Details*"
            value={subTitle}
            onChangeText={(st)=>setSubTitle(st)}
            style={styles.input}
          />
          {existingTask&&(  <TextInput
            placeholder="Task Update"
            value={latestUpdate}
            onChangeText={(u)=>setLatestUpdate(u)}
            style={styles.input}
          />)}
        
      
        <View style={{alignItems:'center', marginTop: 10}}>
          <Text>Start Date/ Time: {startDate?.toLocaleString()}</Text>
          <View style={{flexDirection:'row', justifyContent: 'center'}}>
            <View style={{margin:10}}>
              <Button 
              style={{}} 
              onPress={()=>{
                setStartShow(true);
                setStartMode('date');
              }} 
              mode="contained">Start Date</Button>
            </View>
            <View style={{margin:10}}>
            <Button style={{}} onPress={()=>{
              setStartShow(true);
              setStartMode('time');
            }} mode="contained">
              Start Time
              </Button>
            </View>
          </View>
          {startShow && (
            <DateTimePicker
         
              value={new Date()}
              mode={startMode}
              is24Hour={true}
              onChange={onStartDateChange}
            />
          )}
        </View>  
    
        <View style={{alignItems:'center', marginTop: 10}}>
          <Text>Completion Date/ Time: {endDate?.toLocaleString()}</Text>
          <View style={{flexDirection:'row', justifyContent: 'center'}}>
            <View style={{margin:10}}>
              <Button 
              style={{}} 
              onPress={()=>{
                setEndShow(true);
                setEndMode('date');
              }} 
              mode="contained" >End Date</Button>
            </View>
            <View style={{margin:10}}>
            <Button style={{}} onPress={()=>{
              setEndShow(true);
              setEndMode('time');
            }} mode="contained" >End Time</Button>
            </View>
          </View>
          {endShow && (
            <DateTimePicker
         
              value={new Date()}
              mode={endMode}
              is24Hour={true}
              onChange={onEndDateChange}
            />
          )}
        </View>     
    
        {images&&
          
          
        
          images.map((item)=>{  
           
    
           if(!item.cancelled){ 
           return <List.Item
            title={item.name?(item?.name):(item.uri?.split('/').pop())}
            
            left={props => <List.Icon {...props} icon="image" />}
            
            right={props => <Pressable onPress={()=>{setImages((k)=>k.filter((k)=>k.uri!==item.uri))}}><List.Icon {...props} icon="delete"/></Pressable>}
          />  }
       
        
          })
        
        
        
        
        }     
        
        <Chip icon="upload" onPress={imagePicker} style={{width:200, alignSelf:'center', margin: 10,}}>Upload Image</Chip>
          
    
        {documents&&
          documents.map((item)=>{return(
          
            <List.Item
            title={item.name}
            
            left={props => <List.Icon {...props} icon="file" />}
            
            right={props => <Pressable onPress={()=>{setDocuments((k)=>k.filter((k)=>k.uri!==item.uri))}}><List.Icon {...props} icon="delete"/></Pressable>}
          />
            )
          
          })
        }     
        
        <Chip icon="upload" onPress={documentPicker} style={{width:200, alignSelf:'center', margin: 10,}}>Upload Documents</Chip>      
    
    
       
    
               */}
      
          
          
          </View> 
    
    
          <Snackbar
            style={{marginBottom: 20}}
            visible={sbVisible}
            onDismiss={()=>{setSbVisible(false)}}
            action={{
              label: 'Close',
              onPress: () => {
                setSbVisible(false);
              },
            }}
           >
            {sbMessage}
          </Snackbar>
    
          
     
        </View>
    }
        />
      </View>  

    
     );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: '#f2f2f2',
  },
  formField: {
    marginBottom: 16,
    zIndex:0
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    zIndex:0,
    marginTop: 10
  },
  dropdownContainer: {
    height: 40,
    marginBottom: 16,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    zIndex:0
    
  },
  dropdownItem: {
    justifyContent: 'flex-start',
    zIndex:1
  },
});


export default TaskEdit;
