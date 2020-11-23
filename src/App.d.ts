interface AppProps {
    onSelect: (images: string[]) => void;
    close: () => void;
    isOpen: boolean;
    onlyOneImage?: boolean;
}
declare const App: ({ onSelect, close, isOpen, onlyOneImage }: AppProps) => JSX.Element;
export default App;
