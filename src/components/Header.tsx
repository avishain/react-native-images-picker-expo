import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SelectedImageType } from './Images';

interface HeaderProps {
     close: () => void;
     done: () => void;
     setSelectedAlbum: React.Dispatch<React.SetStateAction<MediaLibrary.Album | undefined>>;
     selectedAlbum: MediaLibrary.Album | undefined;
     setSelectedImages: React.Dispatch<React.SetStateAction<SelectedImageType[] | undefined>>;
     selectedImages: SelectedImageType[] | undefined;
     onlyOneImage: boolean;
}

const Header = ({ close, done, setSelectedAlbum, selectedAlbum, onlyOneImage, selectedImages }: HeaderProps) => {

     const isInsideAlbum = selectedAlbum != null;
     const back = () => setSelectedAlbum(undefined);

     return (
          <View style={[styles.container, { paddingTop: 0 }]}>
               <Pressable >
                    {isInsideAlbum ?
                         <Pressable onPress={back}>
                              <Feather name="arrow-left" size={24} color="black" />
                         </Pressable>
                         :
                         <Pressable onPress={close}>
                              <Feather name="x" size={24} color="black" />
                         </Pressable>
                    }
               </Pressable>
               {onlyOneImage === false &&
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                         <Ionicons name="md-images" size={24} color="black" />
                         <Text style={{ paddingHorizontal: 12, fontSize: 20 }}>{selectedImages ? selectedImages.length : 0}</Text>
                    </View>
               }
               {onlyOneImage === false ?
                    <Pressable onPress={done}>
                         <Feather name="check-circle" size={27} color="black" />
                    </Pressable>
                    : <React.Fragment />
               }
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          width: '100%',
          height: 80,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 23,
          borderBottomColor: 'rgb(210,210,210)',
          borderBottomWidth: 4
     }
})

export default Header;
