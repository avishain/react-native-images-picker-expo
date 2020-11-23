import * as MediaLibrary from 'expo-media-library';
interface AlbumsProps {
    setSelectedAlbum: (album: MediaLibrary.Album) => void;
}
declare const Albums: ({ setSelectedAlbum }: AlbumsProps) => JSX.Element;
export default Albums;
