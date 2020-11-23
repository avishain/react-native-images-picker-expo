import React from 'react';
import * as MediaLibrary from 'expo-media-library';
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
declare const Header: ({ close, done, setSelectedAlbum, selectedAlbum, onlyOneImage, selectedImages }: HeaderProps) => JSX.Element;
export default Header;
