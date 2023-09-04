import React, {useContext, useState} from 'react'
import { Text, Pressable, View, StyleSheet } from 'react-native'
import { AuthContext } from './authentication/contexts/AuthContext'
import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export const Profile = () => {
  const {handleLogout, username,
    accessToken} = useContext(AuthContext);
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [deletePressed, setDeletePressed] = useState(false);
  const navigation = useNavigation();

  const updateName = async() => {
    const updateNames = {
      firstname: firstname,
      lastname: lastname
  };
    try {
      const response = await fetch(`https://chat-api-with-auth.up.railway.app/users`,{
          method: "Patch",
          headers: {
             'Content-Type': 'application/json',
              "Authorization": `Bearer ${accessToken}`
         },
         body: JSON.stringify(updateNames)
      
      })
      const deleteData = response.json();
      console.log(deleteData)
      alert("User Successfully Updated")
    } catch (error) {
      console.log(error)
    }}

const deleteUser = async () => {
  if (deletePressed) {
    try {
      const response = await fetch(`https://chat-api-with-auth.up.railway.app/users`,{
          method: "DELETE",
          headers: {
             'Content-Type': 'application/json',
              "Authorization": `Bearer ${accessToken}`
         }
      
      })
      const deleteData = response.json();
      console.log(deleteData)
      alert("User Deleted!")
      handleLogout();
    } catch (error) {
      console.log(error)
    }
  } else {
    setDeletePressed(true); 
  }
}

  


  return (
    <View style={styles.profileContainer}>
       <FontAwesome name="user" size={180} color="black" style={styles.profileIcon}/>
      <TextInput  style={styles.firstName} placeholder='First Name' value={firstname} onChangeText={setFirstname}/>
      <TextInput style={styles.lastName} placeholder="Last Name" value={lastname} onChangeText={setLastname} />

      <Pressable style={styles.updateNameBtn} onPress={() => updateName()}>
    <Text style={{fontSize: 24, fontWeight: "bold"}}>Update Name</Text>
    </Pressable>

    <Pressable style={styles.deleteBtn} onPress={() => deleteUser()}>
  <Text style={{fontSize: 24, fontWeight: "bold", color: "white"}}>
    {deletePressed ? "Delete User (press again to confirm):" : "Delete User:"} {username}
  </Text>
  {deletePressed && (
    <Pressable style={styles.confirmDeleteBtn} onPress={() => setDeletePressed(true)}>
      <Text style={{fontSize: 18, fontWeight: "bold"}}>Confirm?</Text>
    </Pressable> )}
    </Pressable>

    <Pressable style={styles.logoutBtn} onPress={() => handleLogout()}>
    <Text style={{fontSize: 24, fontWeight: "bold"}}>Logout</Text>
    </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  logoutBtn: {
    alignSelf: "center",
    marginTop: 20,
    borderColor: "black",
    borderWidth: 3,
    padding: 20,
    borderRadius: 50,
    backgroundColor: "lightblue"
    
  },
  profileContainer: {
    flex: 1,
    backgroundColor: "azure",
    justifyContent: "center"
  },
  profileIcon: {
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20
  },
  firstName: {
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 25,
    marginHorizontal: "10%",
    width: "80%",
    padding: 8
  },
  lastName: {
    borderColor: "black",
    borderWidth: 1,
    width: "80%",
    marginHorizontal: "10%",
    padding: 8
  }, updateNameBtn : {
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    width: "50%",
    marginHorizontal: "25%",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "palegreen"
  },
  deleteBtn: {
    borderColor: "black",
    fontColor: "white",
    borderWidth: 2,
    padding: 10,
    width: "50%",
    marginHorizontal: "25%",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "red"
  }

})
