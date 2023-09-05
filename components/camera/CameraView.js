import React, {useState, useEffect} from 'react'
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';


const CameraView = () => {

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMediaPermission, setHasMediaPermission] = useState(null);

    useEffect( async () => {
        const CameraPermissions = await Camera.requestCameraPermissionsAsync();
        console.log(CameraPermissions)
    }

    ) 

  return (
    <div>CameraView</div>
  )
}

export default CameraView