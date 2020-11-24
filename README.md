# react-native-images-picker-expo

![Supports Android and iOS](https://img.shields.io/badge/platforms-android%20|%20ios-blue.svg) &nbsp;&nbsp;
![MIT License](https://img.shields.io/npm/l/react-native-range-slider-expo?color=red)

### Images browser for React-native projects

#### Enables user to select from within his gallery's albums.
#### The images are automatically sorted by the time they were created in the device.
#### Also enables you to define a single image selection and that way to use this plugin all over your app and keep the app design consistant.

<br/><br/>
## Getting started
`npm i react-native-range-slider-expo`

<br/><br/>
## Usage
#### Examples - display


<div style="display:flex;flex-direction:row">
  <img src="https://res.cloudinary.com/dexts7jfo/image/upload/v1606157977/images-picker_tfjnun.gif" height="500" width="280" />
</div>
<br/>

#### Examples - code (reflects the short video above)

```javascript
import ImagesPicker from 'react-native-images-picker-expo';
```
```javascript
     const App = () => {
       const [isOpen, setIsOpen] = useState(false);
       const [selectedImages, setSelectedImages] = useState([]);

       const open = () => setIsOpen(true);
       const close = () => setIsOpen(false);

       const onSelect = images => setSelectedImages(images);

       return (
            <View style={styles.conatiner}>
                 <ImagesPicker isOpen={isOpen} onSelect={onSelect} close={close} />
                 <Pressable style={styles.itemContainer} onPress={open}>
                      <Text style={{ color: 'white' }}>open images picker</Text>
                 </Pressable>
                 {
                      selectedImages.map((uri, index) => (
                           <View style={{ marginVertical: 50 }} key={index}>
                                <Image
                                     source={{ uri }}
                                     style={{ height: 100, width: 150 }}
                                />
                           </View>
                      ))
                 }
            </View>
       )
}
```

<br/>

## API - RangeSlider (default import)
| Property | Type | Required | Default |
| :---     |:----:|  :-----: | :-----: | 
| onSelect | function | yes | - |
| close | function | yes | - |
| isOpen | boolean | yes | - |
| onlyOneImage | boolean | no | false |

<br/><br/>

## License
This project is licensed under the MIT License
