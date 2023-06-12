import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {User} from '../../models';
import { DataStore, API, graphqlOperation } from 'aws-amplify';
import { useAuthContext } from '../../context/AuthContext';
import { Button } from 'react-native-paper';
import { onUpdateUser } from '../../graphql/subscriptions';




const ProfileScreen = () => {
  const route = {params: {name: "Nithi", telephone: "0123441217", email: "n.maniam1990@gmail.com", profilePic: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"}}  
  
  

  const {dbUser, setDbUser, updateUserDetails, signOut} = useAuthContext();
  
//   console.log("user", dbUser);


  const [name, setName] = useState();
  const [telephone, setTelephone] = useState();
  const [email, setEmail] = useState();
  const [profilePic, setProfilePic] = useState(route.params.profilePic); 
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState();
  const [editedTelephone, setEditedTelephone] = useState();
  const [editedEmail, setEditedEmail] = useState();
  const [editedProfilePic, setEditedProfilePic] = useState();
  

  useEffect(()=>{

    if(dbUser){
    setName(dbUser.username);
    setTelephone(dbUser.telephone);
    setEmail(dbUser.email);    
    setEditedName(dbUser.username);
    setEditedTelephone(dbUser.telephone.replace('+60', ''));
    setEditedEmail(dbUser.email);
    setEditedProfilePic(profilePic);    
}

   
   
    // const subscription = DataStore.observe(User, dbUser?.id).subscribe(msg => {
    //     if(msg.opType==="UPDATE"){
    //         setDbUser(msg.element);
    //     }
    // })


    
    const subscription = API.graphql(graphqlOperation(onUpdateUser, {filter: {id: {eq: dbUser.id}}})).subscribe({
      next: ({value})=>{
        
        
        setDbUser(value.data.onUpdateUser)
        
      },
      error: (err)=>console.warn(err)
    })

    return ()=>subscription.unsubscribe();

  },[dbUser]);



    
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    


      // Your validation logic here
      // For example, you can use regular expressions
      const phoneRegex = /^-?\d+$/;
      


      
      if (!phoneRegex.test(editedTelephone)){
        Alert.alert('Please enter valid phone number')
        return
      }
  
     const newTelephone = '+60' + editedTelephone;
      
     
    
     

     updateUserDetails(dbUser, editedName, newTelephone);

    // const result = await DataStore.save(User.copyOf(dbUser, (updated)=>{
    //   updated.username=editedName;
    //   updated.telephone = editedTelephone;
    //   updated.email = editedEmail;

    // }))
    

    // console.log(result);
    // Here you can implement the logic to save the changes to the user details
    // For now, we'll just update the state and set editMode back to false
    setName(editedName);
    setTelephone(editedTelephone);
    setEmail(editedEmail);
    setProfilePic(editedProfilePic);
    setEditMode(false);
  };

  const handleProfilePicUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    const result= pickerResult.assets[0];
    
    if (pickerResult.canceled === true) {
      return;
    }

    setEditedProfilePic(result.uri);
  };

  if(!dbUser){
    return <ActivityIndicator size={'large'} color={'#512da8'} />
  }

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={editMode?handleProfilePicUpload:null}>
        <Image source={{ uri: editedProfilePic }} style={styles.image} />
      </TouchableOpacity> */}
      {editMode ? (
          
        <TextInput
          style={styles.input}
          placeholder='name'
          value={editedName}
          onChangeText={setEditedName}
        />
      ) : (
        <Text style={styles.name}>{name}</Text>
      )}
        
      <View >
      
      
      {editMode ? (
        <View style={{flexDirection:'row'}}>
        <Text style={{...styles.telephone, padding: 10}}>+60</Text>
        <TextInput
          style={{...styles.input, width: '79%'}}
          placeholder='tel'
          value={editedTelephone}
          onChangeText={setEditedTelephone}
        />
        </View>
      ) : (
        <View style={{flexDirection:'row'}}>
        
        <Text style={styles.telephone}>{telephone}</Text>
        </View>
      )}
      </View>
      {editMode ? (
      <Text style={styles.email}>{email}</Text>
      // <TextInput
        //   style={styles.input}
        //   value={editedEmail}
        //   onChangeText={setEditedEmail}
        // />
      ) : (
        <Text style={styles.email}>{email}</Text>
      )}
      {editMode ? (
       <Button icon="account-edit" mode="contained" onPress={handleSave} style={{marginBottom: 10}}>
     Save
      </Button>
      //  <TouchableOpacity style={styles.button} onPress={handleSave}>
      //     <Text style={styles.buttonText}>Save</Text>
      //   </TouchableOpacity>
      ) : (
        <>
        <Button icon="account-edit" mode="contained" onPress={handleEdit} style={{marginBottom: 10}}>
                                Edit
        </Button>
        <Button icon="exit-run" mode="contained" onPress={signOut}>
                              Signout
        </Button>
        {/* <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity> */}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  telephone: {
    fontSize: 18,
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
  },
 
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#0066cc',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;