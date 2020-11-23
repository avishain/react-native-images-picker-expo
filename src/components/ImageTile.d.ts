import React from 'react';
interface ImageTileProps {
    uri: string;
    selectImage: () => void;
    isSelected: boolean;
}
declare const ImageTile: React.MemoExoticComponent<({ uri, selectImage, isSelected }: ImageTileProps) => JSX.Element>;
export default ImageTile;
