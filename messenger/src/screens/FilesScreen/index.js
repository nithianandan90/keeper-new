import {Text, Pressable, View, FlatList, Button, TextInput} from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { Attachment } from '../../models';
import * as FileSystem from 'expo-file-system';
import {shareAsync} from 'expo-sharing';
import { startActivityAsync } from 'expo-intent-launcher';
import * as mime from 'react-native-mime-types';
import { ActivityIndicator } from 'react-native';
import { listAttachmentsByTask } from '../../graphql/queries';


const filesData = [
  { id: 1, name: 'file1.pdf', uri:'https://phl.hasil.gov.my/pdf/pdfam/PR_04_2020.pdf' },
  { id: 2, name: 'file2.docx', uri:'https://phl.hasil.gov.my/pdf/pdfam/PR_04_2020.pdf' },
  { id: 3, name: 'file3.jpg', uri:'https://phl.hasil.gov.my/pdf/pdfam/PR_04_2020.pdf' },
  { id: 4, name: 'file4.mp4', uri:'https://phl.hasil.gov.my/pdf/pdfam/PR_04_2020.pdf' },
  { id: 5, name: 'file5.txt', uri:'https://phl.hasil.gov.my/pdf/pdfam/PR_04_2020.pdf' },
];

const FilesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const task = route?.params?.task;
  // console.log('route', route?.params)

  const getFiles = async () =>{
    
    const results = await API.graphql(graphqlOperation(listAttachmentsByTask, {taskID: task.id, sortDirection: 'DESC'}))
    

    const attachments = results.data.listAttachmentsByTask.items; 

    const downloadedFiles = await Promise.all(
        attachments.map((attachment) =>
        
            {
            
                if(attachment.type==='DOCUMENT'){    
                    return Storage.get(attachment.storageKey).then((uri) => ({
                        id: attachment.id,
                        name: attachment.fileName?(attachment.fileName):'file 1', 
                        uri: uri,
                        storageKey: attachment.storageKey

                    }))
                }else{
                  return
                }
            }
      
        
       
       
        )
      );


    

    setFiles(downloadedFiles);        
    setFilteredFiles(downloadedFiles);      

}


useEffect(()=>{

  getFiles();



},[])


  const navigation = useNavigation();

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = files.filter(file => file?.name.toLowerCase().includes(text.toLowerCase()));
    setFilteredFiles(filtered);
  };

  

  
  const save = async (url, uri, fileName, mimetype, headers)=>{
    

    const type = mime.lookup(uri);

    
    if(Platform.OS==='android'){

    let content = await FileSystem.getContentUriAsync(uri)

    await startActivityAsync('android.intent.action.VIEW', {
        data: content,
        flags: 1,
        type: type
     });

    }else{
      shareAsync(uri);
 
    }
  }


  const downloadFile = async (url, fileName) => {
    

    setIsLoading(true);
    const result = await FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + fileName

    )
      
    setIsLoading(false);
    save(url, result.uri, fileName, result.headers["Content-Type"]);
    
  }



  const renderFileItem = ({ item }) => {
    
    
    if(!item){
      return
    }
    return <>
    <Pressable onPress={()=>{downloadFile(item?.uri, item?.storageKey)}}>    
      <View style={{ padding: 10 }}>
        <Text>{item?.name}</Text>
      </View>
    </Pressable>
  </>
  

};

if(isLoading){
  return <ActivityIndicator size={'large'} color={'#512da8'} />
}
  
  return (
    
    <View style={{ flex: 1 }}>
    
      <TextInput
        placeholder="Search files"
        value={searchQuery}
        onChangeText={handleSearch}
        style={{ padding: 10, backgroundColor: '#f2f2f2' }}
      />
      {files&&(   <FlatList
        data={filteredFiles}
        renderItem={renderFileItem}
        keyExtractor={(item) => item?.id}
      />)}
   
      {/* <Button title="Upload" onPress={handleUpload} /> */}
    </View>
  );
};

export default FilesScreen;