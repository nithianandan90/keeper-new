import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import {List} from 'react-native-paper';
import { Foundation, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


 


const FacilitiesItem = ({property}) => {
  
  
  const navigation = useNavigation();
  const onPress=()=>{
    navigation.navigate('Property Details', {property});
    }
  
    const typeToIcon = {
        ['Commercial']:'building',
        ['Residential']:'house-user'
    }  


    return(
        <Pressable onPress={onPress} android_ripple={{radius:200}}>
        <List.Item
            title={property.title}
            description= {property.streetAddress}
            left={() => <List.Icon icon={({color})=><FontAwesome5 name={typeToIcon[property?.type]} size={24} color={color}/>} />}
            style={{paddingTop: 50, paddingLeft: 10, borderBottomColor: 'grey', borderBottomWidth:1}}
            
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
  
