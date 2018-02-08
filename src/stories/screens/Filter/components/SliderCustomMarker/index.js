import * as React from "react";
import {Header, Title, Content, Text, Button, Icon, Left, Right, Body, Thumbnail, Container} from "native-base";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
	Image,
	View,
    Dimensions,
	Modal,
    StyleSheet,
    TextInput,
    ScrollView,
    Slider
} from "react-native";
export interface Props {
	navigation: any;
}
export interface State {}
export interface Props {
    navigation: any;
    img: string;
    rate: ?number;
    comment: ?string;
    onSave: Function;
}

const {height, width} = Dimensions.get('window');

class SliderCustomMarker extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

	render() {
		return (
            <Image
                style={styles.image}
                source={require('../../../../../../assets/images/customMarker.png')}
                resizeMode='contain'
            />
		);
	}
}

const styles = StyleSheet.create({
    image: {
        height: 30,
        width: 30
    }
})

export default SliderCustomMarker;
