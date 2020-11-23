import * as MediaLibrary from 'expo-media-library';
export declare const width: number;
export declare type SelectedImageType = {
    id: string;
    uri: string;
};
interface ImagesProps {
    selectedAlbum: MediaLibrary.Album;
    selectedImages?: SelectedImageType[];
    setSelectedImages: (image?: SelectedImageType[]) => void;
    onlyOneImage: boolean;
    doneOneImage: (selectedImage: string) => void;
}
declare const Images: ({ selectedAlbum, selectedImages, setSelectedImages, onlyOneImage, doneOneImage }: ImagesProps) => JSX.Element;
export default Images;
