import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Text, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import ImageTile from './ImageTile';

export const { width } = Dimensions.get('window');

export type SelectedImageType = {
     id: string,
     uri: string
}

interface ImagesProps {
     selectedAlbum: MediaLibrary.Album;
     selectedImages?: SelectedImageType[];
     setSelectedImages: (image?: SelectedImageType[]) => void;
     onlyOneImage: boolean;
     doneOneImage: (selectedImage: string) => void;
}

const Images = ({ selectedAlbum, selectedImages, setSelectedImages, onlyOneImage, doneOneImage }: ImagesProps) => {

     const [photos, setPhotos] = useState<SelectedImageType[] | undefined>();
     const [after, setAfter] = useState<string | undefined>();
     const [hasNextPage, setHasNextPage] = useState(true);

     useEffect(() => {
          getCameraPhotos();
     }, []);

     const getCameraPhotos = () => {
          let options: MediaLibrary.AssetsOptions = { first: 50, album: selectedAlbum, sortBy: MediaLibrary.SortBy.creationTime };
          if (after) {
               options.after = after;
          }
          if (hasNextPage) {
               return MediaLibrary.getAssetsAsync(options)
                    .then(processPhotos)
                    .catch(e => console.log(e))
          }
     }

     const processPhotos = (r: MediaLibrary.PagedInfo<MediaLibrary.Asset>) => {
          if (after !== r.endCursor) {
               const images = r.assets.map((asset, i) => {
                    const { id, uri } = asset;
                    return { id, uri };
               });
               setPhotos(photos ? [...photos, ...images] : [...images]);
               setAfter(r.endCursor);
               setHasNextPage(r.hasNextPage);
          }
     }

     const onImageTap = ({ id, uri }: SelectedImageType) => {
          if (onlyOneImage) {
               doneOneImage(uri);
          }
          else {
               if (selectedImages) {
                    const alreadyChecked = selectedImages.map(image => image.id).includes(id);
                    if (alreadyChecked) {
                         const updated = selectedImages.filter(image => image.id !== id);
                         setSelectedImages(updated);
                    }
                    else {
                         const updated = [...selectedImages, { uri, id }];
                         setSelectedImages(updated);
                    }
               }
               else {
                    setSelectedImages([{ uri, id }]);
               }
          }
     }

     return (
          photos ?
               <FlatList
                    data={photos}
                    numColumns={4}
                    renderItem={({ item: { id, uri } }) => {
                         const isSelected = selectedImages ? selectedImages.some(image => image.id === id) : false;
                         const selectImage = () => onImageTap({ id, uri });
                         return <ImageTile {...{ uri, selectImage, isSelected }} />
                    }}
                    keyExtractor={(_, index) => index.toString()}
                    onEndReached={() => getCameraPhotos()}
                    onEndReachedThreshold={0.5}
                    ListEmptyComponent={<View style={{ paddingTop: 50, justifyContent: 'center', alignItems: 'center' }}><Text>No Images in album</Text></View>}
                    initialNumToRender={24}
                    getItemLayout={(data: SelectedImageType[] | null | undefined, index: number) => {
                         let length = width / 4;
                         return { length, offset: length * index, index };
                    }}
               />
               :
               <View style={{ paddingTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color='black' />
               </View>

     );
}

export default Images;
