import React, {useState, useEffect, useRef} from 'react'
import { StyleSheet, TouchableOpacity, View, SafeAreaView, Text, Image } from 'react-native';
import { Entypo, FontAwesome, Feather } from '@expo/vector-icons'; 
import { Camera, CameraType, FlashMode } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/core';
import ImagePreview from './ImagePreview';
const CameraView = () => {

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMediaPermission, setHasMediaPermission] = useState(null);
    const navigation = useNavigation();
    const [picture, setPicture] = useState(null);
    const cameraRef = useRef(null);
    const [flash, setFlash] = useState(FlashMode.on);
    const [type, setType] = useState(CameraType.back)


  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  const toggleFlash = () => {
    setFlash(current => (current === FlashMode.off ? FlashMode.on : FlashMode.off));
  }

    useEffect(() => {
        (async () => {
          const CameraPermissions = await Camera.requestCameraPermissionsAsync();
          setHasCameraPermission(CameraPermissions.status == 'granted')
          const MediaPermissions = await MediaLibrary.requestPermissionsAsync();
          setHasMediaPermission(MediaPermissions.status == 'granted')
        })();
    });

    const takePicture = async () => {
        if (cameraRef.current) {
          try {
            const picture = await cameraRef.current.takePictureAsync()
            console.log(picture);
            setPicture(picture)
            navigation.navigate("ImagePreview", {picture: picture})
          } catch (error) {
            console.log(error);
          }
        }
      }

    if (hasCameraPermission === null || hasMediaPermission === null) {
        return (<View><Text>Waiting for permissions....</Text></View>);
      }
      if (hasCameraPermission === false || hasMediaPermission === false) {
        return (<View><Text>Permissions denied....</Text></View>);
      }
      return (
        <SafeAreaView  style={styles.container}>
          <Camera 
           style={styles.cameraContainer} 
            type={type} 
            flashMode={flash} 
            ref={cameraRef}
          >
            <View   style={styles.buttonsTopContainer}>
              <TouchableOpacity   style={styles.generalButton}  >
                <FontAwesome name="refresh" size={24} color="white" onPress={() => toggleCameraType()}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.generalButton}>
                <Entypo name="flash" size={24} color={flash === FlashMode.on ? "yellow" : "white"} onPress={() => toggleFlash()}/>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsBottomContainer} >
              <TouchableOpacity style={styles.cameraButton} onPress={() => takePicture()}>
                <Entypo name="camera" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </Camera>
        </SafeAreaView>
      );
}

export default CameraView

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent: 'center'
    },
    cameraContainer: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'space-between',
      paddingTop: 40,
    },
    buttonsTopContainer: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    buttonsBottomContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 20,
    },
  
    generalButton: {
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      width: 50,
      height: 50,
      marginRight: 5,
    },
    cameraButton: {
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'white',
      borderWidth: 3,
      borderRadius: 40,
      width: 80,
      height: 80,
    },
    text: {
      fontSize: 18,
      color: 'white',
      marginLeft: 20,
    }
  });