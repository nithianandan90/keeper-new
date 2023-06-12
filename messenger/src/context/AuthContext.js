import {createContext, useState, useEffect, useContext} from 'react';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { getUser } from '../graphql/queries';
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
        
        const updatedUser = await API.graphql(graphqlOperation(updateUser, {input:{id:updateDbUser.id, username:userName, telephone: telephone, _version:updateDbUser._version}}))
        
    }

    //Functio to  changes


    const syncUser = async () => {
      
     
        const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
       
        setAuthUser(authUser);

        const userData = await API.graphql(graphqlOperation(getUser,{id: authUser.attributes.sub}));
        
        setDbUser(userData.data.getUser);

       
        if(userData.data.getUser){
          return;
        }
  
        const newUser = {
          id: authUser.attributes.sub,
          email: authUser.attributes.email,
          status: 'Hey im on chat'
        }
  
        
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