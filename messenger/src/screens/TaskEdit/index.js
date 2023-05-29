import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, FlatList, ScrollView, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getFileInfo, pickImage, pickDocument, addAttachment, uploadFile} from '../../services/uploaderService';
import { Button, Chip, List, RadioButton, Snackbar } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify';
import { createTask } from '../../graphql/mutations';

const propertyData = [
  { label: 'Property 1', value: 'Property 1' },
  { label: 'Property 2', value: 'Property 2' },
  { label: 'Property 3', value: 'Property 3' },
  { label: 'Property 4', value: 'Property 4' },
  { label: 'Property 5', value: 'Property 5' },
];

const TaskEdit = () => {
  const [property, setProperty] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [recurrence, setRecurrence] = useState('');
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [isPropertyOpen, setPropertyOpen] = useState(false);
  const [isStatusOpen, setStatusOpen] = useState(false);
  const [isTypeOpen, setTypeOpen] = useState(false);
  
  const [startMode, setStartMode] = useState('date');
  const [startShow, setStartShow] = useState(false);
  const [endMode, setEndMode] = useState('date');
  const [endShow, setEndShow] = useState(false);
  const [task, setTask] = useState(false);
  const [images,setImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [validation, setValidation] = useState('');
  const [sbVisible, setSbVisible] = useState(false);

  const route = useRoute();

  const navigation = useNavigation();

  console.log("task", route.params);

  useEffect(()=>{
    setProperty(route.params.property)
  },[]);


  const handlePropertyChange = (value) => {
    setProperty(value);
    console.log(value);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleCompletionDateChange = (date) => {
    setCompletionDate(date);
  };

  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const handleSubTitleChange = (value) => {
    setSubTitle(value);
  };

  const handleRecurrenceChange = (value) => {
    setRecurrence(value);
  };


  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setStartShow(false);
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEndShow(false);
    setEndDate(currentDate);
  };



//Upload Functions

const imagePicker = async ()=>{

  const results = await pickImage();

  if (results.cancelled){
    return
  }

  if(images){
  setImages(k=>[...k, results]);
  }else{
    setImages(results);
  }  

}

const documentPicker = async ()=>{

  const results = await pickDocument();

  if (results.type==='cancel'){
    return
  }

  if(images){
  setDocuments(k=>[...k, results]);
  }else{
    setDocuments(results);
  }  

}

  const handleSubmit = async () => {
    // Perform form submission logic here
    // You can access the form values from the component's state
    
    const submitData = [property, status, title, subTitle, recurrence];

    if(submitData.some(k=>k==='')){
      setSbVisible(true);
    }
    
    console.log('Submitted Form:', {
      property,
      status,
      startDate,
      endDate,
      title,
      subTitle,
      recurrence,
    });

    const newTask = {
      status: status, 
      title: title,
      subTitle: subTitle,
      taskType: type,
      recurrence: recurrence,
      propertiesID: property.id

    }

    console.log(JSON.stringify(newTask, null, 2))

    const returnedNewTask = await API.graphql(
      graphqlOperation(createTask, {input: newTask})
    )

    console.warn('completed');
    console.log(returnedNewTask);

    navigation.navigate('Property Details', {property})
  
    //Logic to create a new task and then create attachments
  };


   const togglePropertyDropdown = () => {
    setPropertyOpen(!isPropertyOpen);
  };

  const toggleStatusDropdown = () => {
    setStatusOpen(!isStatusOpen);
  };

  const toggleTypeDropdown = () => {
    setTypeOpen(!isTypeOpen);
  };


  console.log("documents", documents);

  return (
    <ScrollView nestedScrollEnabled={true} style={styles.container}>
      <View style={styles.formField}>
   
      <Text style={{paddingHorizontal:12, marginBottom:10, fontSize:20}}>{property?.title}, {property?.streetAddress}, {property?.postcode}, {property?.state} </Text>

      {/* Only show if new task not update task */}
      {/* <DropDownPicker
        placeholder="Select a property"
        items={propertyData}
        searchable={true}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        itemStyle={styles.dropdownItem}
        dropDownStyle={styles.dropdown}
        value={property}
        setValue={setProperty}
        open={isPropertyOpen}
        setOpen={togglePropertyDropdown}
        
      /> */}
   
      {/* <DropDownPicker
        placeholder="Select a status"
        items={[
          { label: 'TO COMMENCE', value: 'TO COMMENCE' },
          { label: 'ONGOING', value: 'ONGOING' },
          { label: 'COMPLETED', value: 'COMPLETED' },
        ]}
        value={status}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        itemStyle={styles.dropdownItem}
        dropDownStyle={styles.dropdown}
        setValue={setStatus}
        open={isStatusOpen}
        setOpen={toggleStatusDropdown}
      /> */}

    <Text style={{paddingHorizontal:12, marginBottom:10, fontSize:15, fontWeight:'600'}}>Task Status*:</Text>  
    <RadioButton.Group onValueChange={newValue => setStatus(newValue)} value={status}>
      <View style = {{paddingHorizontal:5, flexDirection:'row', alignItems:'center'}}>
        <RadioButton value="TO COMMENCE" />
        <Text>TO COMMENCE</Text>
         </View>
      <View style = {{paddingHorizontal:5, flexDirection:'row', alignItems:'center'}}>
        <RadioButton value="ONGOING" />
        <Text>ONGOING</Text>
      </View>
    </RadioButton.Group>

    <Text style={{paddingHorizontal:12, marginBottom:10, fontSize:15, marginTop: 20, fontWeight:'600'}}>Task Type*:</Text>  
    <RadioButton.Group  onValueChange={newValue => setType(newValue)} value={type}>
      <View style = {{paddingHorizontal:5, flexDirection:'row', alignItems:'center'}}>
        <RadioButton value="plumbing" />
        <Text>Plumbing</Text>
         </View>
      <View style = {{paddingHorizontal:5, flexDirection:'row', alignItems:'center'}}>
        <RadioButton value="roofing" />
        <Text>Roofing</Text>
      </View>
      <View style = {{paddingHorizontal:5, flexDirection:'row', alignItems:'center'}}>
        <RadioButton value="electrical" />
        <Text>Electrical</Text>
      </View>
      <View style = {{paddingHorizontal:5, flexDirection:'row', alignItems:'center'}}>
        <RadioButton value="structural" />
        <Text>Structural</Text>
      </View>
      <View style = {{paddingHorizontal:5, flexDirection:'row', alignItems:'center'}}>
        <RadioButton value="admin" />
        <Text>Admin</Text>
      </View>
      <View style = {{paddingHorizontal:5, flexDirection:'row', alignItems:'center'}}>
        <RadioButton value="revenue" />
        <Text>Revenue Management</Text>
      </View>
    </RadioButton.Group>


    <Text style={{paddingHorizontal:12, marginBottom:10, fontSize:15, marginTop: 20, fontWeight:'600'}}>Task Recurrence*:</Text>  
    <RadioButton.Group onValueChange={newValue => setRecurrence(newValue)} value={recurrence}>
      <View style = {{paddingHorizontal:5, flexDirection:'row', alignItems:'center'}}>
        <RadioButton value="ONE-OFF" />
        <Text>One-off</Text>
         </View>
      <View style = {{paddingHorizontal:5, flexDirection:'row', alignItems:'center'}}>
        <RadioButton value="RECURRING" />
        <Text>Recurring</Text>
      </View>
    </RadioButton.Group>
  

      {/* <DropDownPicker
        placeholder="Task Type"
        items={[
          { label: 'Plumbing', value: 'PLUMBING' },
          { label: 'Electrical', value: 'ELECTRICAL' },
          { label: 'Roofing', value: 'ROOFING' },
        ]}
        value={type}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        itemStyle={styles.dropdownItem}
        dropDownStyle={styles.dropdown}
        setValue={setType}
        open={isTypeOpen}
        setOpen={toggleTypeDropdown}
      /> */}

      {/* Rest of the code remains the same */}

      <TextInput
        placeholder="Task Title*"
        value={title}
        onChangeText={handleTitleChange}
        style={styles.input}
      />

      <TextInput
        placeholder="Task Details*"
        value={subTitle}
        onChangeText={handleSubTitleChange}
        style={styles.input}
      />

  
    <View style={{alignItems:'center', marginTop: 10}}>
      <Text>Start Date/ Time: {startDate.toLocaleString()}</Text>
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
      <Text>Completion Date/ Time: {endDate.toLocaleString()}</Text>
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
       
        // return (<Text>{item.name?(item.name):(item.uri.split('/').pop())}</Text>)
    
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


      {/* <Button style={{}}title="Submit" onPress={handleSubmit} /> */}

            
      <Button style={{marginTop: 20, marginBottom: 10}} buttonColor='#805158' icon="airplane" mode="contained" onPress={handleSubmit}>
                        Submit
      </Button>
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
        Please fill in all required fields
      </Snackbar>
 
    </ScrollView>
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