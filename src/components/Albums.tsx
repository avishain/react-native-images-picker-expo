import * as MediaLibrary from 'expo-media-library';
import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, FlatList } from 'react-native';
import { useStateIfMounted } from "use-state-if-mounted";
import AlbumTile, { width } from './AlbumTile';

interface AlbumsProps {
     setSelectedAlbum: (album: MediaLibrary.Album) => void;
}

const Albums = ({ setSelectedAlbum }: AlbumsProps) => {
     const [loading, setLoading] = useStateIfMounted(true);
     const [albums, setAlbums] = useStateIfMounted<MediaLibrary.Album[]>([]);

     useEffect(() => {
          setLibrary();
     }, []);


     const setLibrary = async () => {
          const premission = await MediaLibrary.requestPermissionsAsync();
          if (!premission.granted) {
               Alert.alert('Permission was not granted');
          }
          else {
               const albums = await MediaLibrary.getAlbumsAsync();
               setAlbums(albums.sort((a,b) => b.assetCount - a.assetCount));
               setLoading(false);
          }
     }

     return (
          loading ?
               <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color='gray' />
               </View>
               :
               <FlatList contentContainerStyle={styles.contentContainerStyle}
                    data={albums}
                    numColumns={2}
                    renderItem={({ item }) => {
                         const onSelect = () => setSelectedAlbum(item);
                         return <AlbumTile {...{ item, onSelect }} />
                    }}
                    getItemLayout={(data, index) => {
                         return { index, length: width / 2, offset: index * width / 2 }
                    }}
                    initialNumToRender={8}
                    keyExtractor={(item, index) => item.id}
               />
     )
}

const styles = StyleSheet.create({
     contentContainerStyle: {
          justifyContent: 'center',
          borderColor: 'rgb(210,210,210)',
          borderWidth: 2
     }
})

export default Albums;
