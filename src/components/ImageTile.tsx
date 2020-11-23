import React, { memo, useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface ImageTileProps {
     uri: string;
     selectImage: () => void;
     isSelected: boolean;
}

const ImageTile = memo(({ uri, selectImage, isSelected }: ImageTileProps) => {
     const [opacity, setOpacity] = useState(0);
     const onImageSelect = () => {
          setOpacity(.6 - opacity);
          selectImage();
     }
     useEffect(() => {
          setOpacity(isSelected ? .6 : 0);
     }, [isSelected]);
     return (
          uri ?
               <Pressable
                    style={{ margin: 1 }}
                    onPress={onImageSelect}
               >
                    <Image
                         style={{ width: width / 4, height: width / 4 }}
                         source={{ uri }}
                    />
                    <View style={[StyleSheet.absoluteFillObject, { opacity, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }]}>
                         <Feather name="check" size={32} color="white" />
                    </View>
               </Pressable>
               :
               <React.Fragment />
     )
});

export default ImageTile;
