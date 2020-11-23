import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Pressable, Dimensions, Text } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { LinearGradient } from 'expo-linear-gradient';

export const { width } = Dimensions.get('window');

const ALBUM_SIZE = width / 2 - 2;

interface AlbumTileProps {
     item: MediaLibrary.Album;
     onSelect: () => void;
}

const AlbumTile = ({ item: album, onSelect }: AlbumTileProps) => {

     const [backgroundImage, setBackgroundImage] = useState<string | undefined>();

     useEffect(() => { setImage() }, []);

     const setImage = async () => {
          const images = await MediaLibrary.getAssetsAsync({ album, mediaType: 'photo' });
          if (images.assets.length > 0) {
               setBackgroundImage(images.assets[0].uri);
          }
     }

     return (
          <Pressable style={[styles.album]} onPress={onSelect}>
               {backgroundImage && <Image style={[StyleSheet.absoluteFillObject, { opacity: .75 }]} source={{ uri: backgroundImage }} />}
                    <LinearGradient
                         colors={['rgba(0,0,0,0)', 'rgba(0,0,0,.2)', 'rgba(0,0,0,.2)', 'rgba(0,0,0,0)']}
                         style={StyleSheet.absoluteFillObject}
                    />
               <Text style={styles.title}>{album.title}</Text>
               <Text style={styles.assetCount}>{album.assetCount} items</Text>
          </Pressable>
     )
}

const styles = StyleSheet.create({
     album: {
          height: ALBUM_SIZE,
          width: ALBUM_SIZE,
          padding: 3,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: 'rgb(210,210,210)',
          borderWidth: 2,
          backgroundColor: 'black'
     },
     title: {
          textAlign: 'center',
          color: 'white',
          textShadowColor: 'grey',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 4,
          fontWeight: 'bold'
     },
     assetCount: {
          textAlign: 'center',
          color: 'white',
          textShadowColor: 'grey',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 3,
     }
})

export default AlbumTile;
