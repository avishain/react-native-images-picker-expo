import * as MediaLibrary from 'expo-media-library';
export declare const width: number;
interface AlbumTileProps {
    item: MediaLibrary.Album;
    onSelect: () => void;
}
declare const AlbumTile: ({ item: album, onSelect }: AlbumTileProps) => JSX.Element;
export default AlbumTile;
