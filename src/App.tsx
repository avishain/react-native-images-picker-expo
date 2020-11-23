import * as MediaLibrary from 'expo-media-library';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Modal } from 'react-native';
import Albums from './components/Albums';
import Header from './components/Header';
import Images, { SelectedImageType } from './components/Images';

interface AppProps {
     onSelect: (images: string[]) => void;
     close: () => void;
     isOpen: boolean;
     onlyOneImage?: boolean;
}

const App = ({ onSelect, close, isOpen = false, onlyOneImage = false }: AppProps) => {

     const [selectedAlbum, setSelectedAlbum] = useState<MediaLibrary.Album | undefined>();
     const [selectedImages, setSelectedImages] = useState<SelectedImageType[] | undefined>([]);

     useEffect(() => {
          getUserPermission();
     }, []);
     useEffect(() => {
          if (isOpen) {
               setSelectedImages([]);
               setSelectedAlbum(undefined);
          }
     }, [isOpen])

     const getUserPermission = async () => {
          const permission = await MediaLibrary.getPermissionsAsync();
          if (permission.granted === false) {
               if (permission.canAskAgain) {
                    const askedPermission = await MediaLibrary.requestPermissionsAsync();
                    if (askedPermission.granted === false) {
                         Alert.alert('Error', 'Without permission browser can not work');
                         close();
                    };
               }
               else {
                    Alert.alert('Error', 'Without permission browser can not work');
                    close();
               }
          }
     }

     const done = () => {
          onSelect(selectedImages ? selectedImages.map(image => image.uri) : []);
          close();
     }
     const doneOneImage = (selectedImage: string) => {
          onSelect([selectedImage]);
          close();
     }
     
     return (
          <Modal style={{ flex: 1 }} visible={isOpen} >
               <StatusBar style='dark' backgroundColor='rgb(0,80,100)' />
               <Header {...{ close, done, setSelectedAlbum, selectedAlbum, setSelectedImages, selectedImages, onlyOneImage }} />
               {
                    selectedAlbum ?
                         <Images {...{ selectedAlbum, selectedImages, setSelectedImages, onlyOneImage, doneOneImage }} />
                         :
                         <Albums {...{ setSelectedAlbum }} />
               }
          </Modal>
     )
}

export default App;
