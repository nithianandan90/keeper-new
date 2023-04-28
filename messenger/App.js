import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Navigator from './src/navigation';
import {Amplify, Auth, API, graphqlOperation} from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports'; 
import { useEffect } from 'react';
import { getUser } from './src/graphql/queries';
import jsonFormat from 'json-format';
import {createUser} from './src/graphql/mutations';


Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  
  useEffect(()=>{

    const syncUser = async () => {
      
     
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
     
      const userData = await API.graphql(graphqlOperation(getUser,{id: authUser.attributes.sub}));

      console.log(authUser.attributes.sub);

      if(userData.data.getUser){
        console.log('user already exists in DB')
        return;
      }

      const newUser = {
        id: authUser.attributes.sub,
        name: authUser.attributes.email,
        status: 'Hey im on chat'
      }

      const newUserResponse = await API.graphql(
        graphqlOperation(createUser, {variables: {input: newUser}})
      )

     r
    }

    syncUser();

  },[])
  
  return (
    <View style={styles.container}>
      <Navigator />

      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
  },
});

export default withAuthenticator(App);
