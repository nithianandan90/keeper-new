import { Storage } from 'aws-amplify';
import { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';


const DEFAULT_IMAGE = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg";



const FacilityHeader = ({property}) =>{
   
    const [imageURI, setImageURI] = useState();

    const attachment = property.Attachments.items;  

    useEffect(()=>{
        getPropertyImage();
      
    },[])


    const getPropertyImage = async () =>{
        if(!attachment[0]){
            return
        }
      
        const result = await Storage.get(attachment[0].storageKey);
        setImageURI(result);
       }  



    return(
        <View style = {styles.page}>
             <Image source = {{uri: imageURI}} style = {styles.image} resizeMode= "cover" />
            
            <View style = {styles.container}>

                <Text style = {styles.title}>{property.title}</Text>
                <Text style = {styles.subtitle} >{property.streetAddress} | {property.postcode} | {property.city}  </Text>
                <Text style={styles.menuTitle}>Tasks</Text>
                
                {/* <Text style = {styles.title}>
                    {property.title}
                </Text>
                <Text style = {styles.subtitle}>{property.streetAddress} | {property.postcode} | {property.city}</Text>    
                <Text style={styles.menuTitle}>Tasks</Text> */}
            </View>
            
        </View>
    );
}



export default FacilityHeader;

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    iconContainer: {
        position: 'absolute',
        top: 40,
        left: 10,
        
    },
    image: {
        width: '100%',
        aspectRatio: 5/3
    },
    title: {
        fontSize: 35,
        marginVertical: 10,
     
    },
    subtitle: {
        color: 'grey',
        fontSize: 15
    },
    container: {
        margin: 10
    },
    menuTitle: {
        marginTop: 20,
        fontSize: 18,
        letterSpacing: 0.7
    },
    button:{
        
        backgroundColor: 'black',
        marginTop: 'auto',
        padding: 20,
        alignItems: 'center'
    },
    buttonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    }

})