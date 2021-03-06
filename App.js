import React, {useState} from 'react';
// Componentes de react  native
import {Text, View, StyleSheet, Image, Button, Alert, TouchableOpacity, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; 
// import { WebView } from 'react-native-webview';
import * as Sharing from 'expo-sharing';

const App = () => {

  const [selectImage, setSelectedImage] = useState(null)

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera is required')
      return;
    }

    const pickerImg = await ImagePicker.launchImageLibraryAsync()
    
    if(pickerImg.cancelled === true){
      return;
    }

    if(Platform.OS === 'web'){
      
    }else{
      setSelectedImage({localUri: pickerImg.uri})
    }

  }


  const openShareModal = async () => {
    if(!(await Sharing.isAvailableAsync())){
      alert(`Sharing, is not available on your device`)
      return;
    }

    await Sharing.shareAsync(selectImage.localUri);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aprendiendo React Native Basico</Text>
      <TouchableOpacity 
        onPress = {openImagePickerAsync}
      >
        <Image 
        source={{uri: selectImage !== null 
                      ? selectImage.localUri
                      :'https://cdn.vox-cdn.com/thumbor/H3kPpG-J5Z3rMpc6h60zxyJAdoQ=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19396981/shutterstock_1413240503.jpg'}}
        style={styles.img} 
      />
      </TouchableOpacity>
      
      {/* // <WebView source={{ uri: 'URL DE LA PAGINA' }} /> */}

      {/* <Button 
        onPress= {()=> { Alert.alert('Hola me presionaron') }}
        title="Hola soy un boton" 
        color="#007AFF"
      /> */}

      {
        selectImage ?
        <TouchableOpacity
        // onPress= {()=> { Alert.alert('Hola me presionaron') }}
        onPress= {openShareModal}
        style={styles.btn}
        >
        <Text style={styles.btntext}>Share this Image!</Text>
        </TouchableOpacity>
        :
        <View/>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#832652'
  },
  title: { fontSize: 20, color: '#fff'},
  img: { height: 75, width: 100, borderRadius: 20, resizeMode: 'contain'},
  btn: { 
    backgroundColor: 'mediumseagreen',
    padding: 7,
    marginTop: 10
  }, 

  btntext: {
    color: '#fff',
    fontSize: 20
  }


})

export default App;