import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Navigator from './src/navigation';
import {Amplify, Auth, API, graphqlOperation} from 'aws-amplify';
import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports'; 
import { useEffect } from 'react';
import { getUser } from './src/graphql/queries';
import jsonFormat from 'json-format';
import {createUser} from './src/graphql/mutations';
import AuthContextProvider from './src/context/AuthContext';


Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  
  useEffect(()=>{

    const syncUser = async () => {
      
     
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
     
      const userData = await API.graphql(graphqlOperation(getUser,{id: authUser.attributes.sub}));

      console.log(userData);

      if(userData.data.getUser){
        console.log('user already exists in DB')
        return;
      }

      const newUser = {
        id: authUser.attributes.sub,
        name: authUser.attributes.email,
        status: 'Hey im on chat'
      }

      console.log("new user", newUser);

      const newUserResponse = await API.graphql(
        graphqlOperation(createUser, {input: newUser})
      )

     
    }

    syncUser();

  },[])
  
  return (
    <AuthContextProvider>
    <View style={styles.container}>
      <Navigator />

      <StatusBar style="auto" />
    </View>
    </AuthContextProvider>
  );
}


const signUpConfig = {
  header: "Sign Up",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Email",
      key: "username",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    // {
    //   label: "Email",
    //   key: "email",
    //   required: true,
    //   displayOrder: 2,
    //   type: "string",
    // },
    // {
    //   label: "Username",
    //   key: "preferred_username",
    //   required: true,
    //   displayOrder: 3,
    //   type: "string",
    // },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
    },
  ],
};

const signInConfig = {
  header: "Sign in to your Account",
  hideAllDefaults: true,
  signInFields: [
    {
      label: "Email",
      key: "username",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    // {
    //   label: "Email",
    //   key: "email",
    //   required: true,
    //   displayOrder: 2,
    //   type: "string",
    // },
    // {
    //   label: "Username",
    //   key: "preferred_username",
    //   required: true,
    //   displayOrder: 3,
    //   type: "string",
    // },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
    },
  ],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
  },
});

const customStyles = {...AmplifyTheme, 
  button: {
		backgroundColor: '#4d79ff',
		alignItems: 'center',
		padding: 16,
	},
  sectionFooterLink: {
		fontSize: 14,
		color: 'black',
		alignItems: 'baseline',
		textAlign: 'center',
	},
  buttonDisabled: {
		backgroundColor: '#cccccc',
		alignItems: 'center',
		padding: 16,
	},

  sectionFooterLinkDisabled: {
		fontSize: 14,
		color: '#8c8c8c',
		alignItems: 'baseline',
		textAlign: 'center',
	},

}

export default withAuthenticator(App, {signUpConfig, theme: customStyles, usernameAttributes: 'email'});
