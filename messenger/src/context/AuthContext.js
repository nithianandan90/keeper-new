import {createContext, useState, useEffect, useContext} from 'react';
import { User } from '../models';
import {Amplify, Auth, API, graphqlOperation} from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import { getUser } from '../graphql/queries';
import jsonFormat from 'json-format';
import {createUser, updateUser} from '../graphql/mutations';


const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {
    
    const [authUser, setAuthUser] = useState(null);
    const [dbUser, setDbUser]  = useState(null);
    const sub = authUser?.attributes?.sub;



    useEffect(()=>{
        

            syncUser();
       

    }, []);

    
    
    //Function to update user

    const updateUserDetails = async (updateDbUser, userName, telephone) =>{
        
        console.log(updateDbUser.id, userName, telephone);
        const updatedUser = await API.graphql(graphqlOperation(updateUser, {input:{id:updateDbUser.id, username:userName, telephone: telephone, _version:updateDbUser._version}}))
        console.log("updatedUser", updatedUser);

    }

    //Functio to  changes


    const syncUser = async () => {
      
     
        const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
       
        setAuthUser(authUser);

        const userData = await API.graphql(graphqlOperation(getUser,{id: authUser.attributes.sub}));
        
        setDbUser(userData.data.getUser);

       console.log("userdata", userData.data.getUser);
  
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


      const signOut = ()=>{
        Auth.signOut();
      }


    
         return (
        <AuthContext.Provider value = {{authUser, dbUser, sub, setDbUser, updateUserDetails, signOut}}>
            {children}
        </AuthContext.Provider>       
    )
}

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);    