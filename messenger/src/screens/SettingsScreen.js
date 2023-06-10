import {  StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Auth} from 'aws-amplify';
import { Button } from 'react-native-paper';

const SettingsScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Button icon="exit-run" mode="contained" onPress={()=>Auth.signOut()}>Sign Out</Button>
        {/* <Button onPress={()=>Auth.signOut()} title="sign out"/> */}
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({})