import React from 'react'
import { StyleSheet, TouchableOpacity, View, SafeAreaView, Text, Image } from 'react-native';
import { useNavigation, useRoute  } from '@react-navigation/core';
import { Entypo, FontAwesome, Feather } from '@expo/vector-icons'; 
import { Camera, CameraType, FlashMode } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const ImagePreview = () => {
    const navigation = useNavigation();
    const route = useRoute(); 
    const { picture, setPicture } = route.params;
    const trashPicture = () => {
        navigation.navigate("CameraView", { picture: null });
    }
    const savePicture = async () => {
        try {
          // Create an asset out fo the picture
          const asset = await MediaLibrary.createAssetAsync(picture.uri)
          
          // Retrieve an existing album
          const album = await MediaLibrary.getAlbumAsync('Expo');
    
          if (album == null) {
            await MediaLibrary.createAlbumAsync('Expo', asset, false)
          } else {
            // Put the asset (picutre) in the album
            await MediaLibrary.addAssetsToAlbumAsync(asset, album.id, false);
          }
    
          trashPicture()
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <SafeAreaView  style={styles.container}>
    <Image source={{uri: picture.uri}} style={{flex: 1}}/>
    <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.generalButton}>
          <Feather name="trash-2" size={30} color="white" onPress={() => trashPicture()} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.generalButton}>
          <Entypo name="check" size={30} color="white"  onPress={() => savePicture()}/>
        </TouchableOpacity>

    </View>

  </SafeAreaView>
  )
}

export default ImagePreview

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent: 'center'
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
  });
  
  