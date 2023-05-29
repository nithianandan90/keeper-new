
import React from 'react';
// Import Required Components
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  Platform,
} from 'react-native';

// Import RNFetchBlob for the file download
import RNFetchBlob from 'rn-fetch-blob';

const DownloadFile = () => {
  const REMOTE_IMAGE_PATH =
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80'
  const checkPermission = async () => {
    
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'DownloadFile needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    // Main function to download the image
    
    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = REMOTE_IMAGE_PATH;    
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs?.dirs?.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ?
             /[^.]+$/.exec(filename) : undefined;
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>
           Image Download 
        </Text>
      </View>
      <Image
        source={{
          uri: REMOTE_IMAGE_PATH,
        }}
        style={{
          width: '100%',
          height: 100,
          resizeMode: 'contain',
          margin: 5
        }}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={checkPermission}>
        <Text style={styles.text}>
          Download Image
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DownloadFile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop:30
  },
  button: {
    width: '70%',
    padding: 10,
    backgroundColor: '#00BFFF',
    margin: 10,
    height:50
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
  },
});
